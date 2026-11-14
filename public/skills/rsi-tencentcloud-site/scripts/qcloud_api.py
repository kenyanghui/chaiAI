#!/usr/bin/env python3
# 腾讯云轻量服务器只读自查脚本（rsi-tencentcloud-site 技能附属）
# 仅依赖 Python 3 标准库。TC3-HMAC-SHA256 签名，离线可跑。
# 红线：密钥只从环境变量/凭据文件读；唯一的写操作是 firewall-open（需 --yes）。

import argparse
import base64
import datetime
import hashlib
import hmac
import http.client
import ipaddress
import json
import os
import ssl
import sys
import urllib.parse

SERVICE = "lighthouse"
HOST = "lighthouse.tencentcloudapi.com"
VERSION = "2020-03-24"
HERE = os.path.dirname(os.path.abspath(__file__))
SITES_FILE = os.path.join(HERE, "..", "sites.json")


# ---------- 密钥（永不打印，永不入参） ----------

def load_credentials():
    sid = os.environ.get("TENCENTCLOUD_SECRET_ID", "")
    skey = os.environ.get("TENCENTCLOUD_SECRET_KEY", "")
    if sid and skey:
        return sid.strip(), skey.strip()
    path = os.environ.get("TENCENTCLOUD_CREDENTIALS_FILE",
                          os.path.expanduser("~/.tencentcloud/credentials"))
    try:
        with open(path, encoding="utf-8-sig") as f:
            section = None
            for raw in f:
                line = raw.strip()
                if line.startswith("[") and line.endswith("]"):
                    section = line[1:-1]
                    continue
                if section == "default" and "=" in line:
                    k, _, v = line.partition("=")
                    k, v = k.strip().lower(), v.strip().strip('"').strip("'")
                    if k == "secret_id" and not sid:
                        sid = v
                    elif k == "secret_key" and not skey:
                        skey = v
    except OSError:
        pass
    if sid and skey:
        return sid, skey
    sys.exit("找不到密钥。两种放法任选其一：\n"
             "  ① export TENCENTCLOUD_SECRET_ID=... TENCENTCLOUD_SECRET_KEY=...\n"
             "  ② ~/.tencentcloud/credentials（见 pipeline/KEY-SAFETY.md）\n"
             "密钥不要写在命令行参数里。")


def mask(s):
    return s[:6] + "****" + s[-4:] if len(s) > 12 else "****"


# ---------- TC3 签名（腾讯云官方算法，标准库实现） ----------

def sig(key, msg):
    return hmac.new(key, msg.encode("utf-8"), hashlib.sha256).digest()


def call_api(action, payload, region, sid, skey):
    ts = datetime.datetime.now(datetime.timezone.utc)
    date = ts.strftime("%Y-%m-%d")
    body = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    cred_scope = f"{date}/{SERVICE}/tc3_request"
    cstring = "\n".join([
        "POST", "/", "",
        f"content-type:application/json;charset=utf-8",
        f"host:{HOST}",
        f"x-tc-action:{action.lower()}",
        "",
        "content-type;host;x-tc-action",
        hashlib.sha256(body.encode("utf-8")).hexdigest(),
    ])
    sstring = "\n".join([
        "TC3-HMAC-SHA256", ts.strftime("%Y-%m-%dT%H:%M:%SZ"), cred_scope,
        hashlib.sha256(cstring.encode("utf-8")).hexdigest(),
    ])
    secret = ("TC3" + skey).encode("utf-8")
    auth = ("TC3-HMAC-SHA256 Credential={sid}/{scope}, SignedHeaders=content-type;host;x-tc-action, "
            "Signature={sig}").format(
        sid=sid, scope=cred_scope,
        sig=hashlib.sha256(
            sig(sig(sig(sig(secret, date), SERVICE), "tc3_request"), sstring)
        ).hexdigest())
    conn = http.client.HTTPSConnection(HOST, timeout=15,
                                       context=ssl.create_default_context())
    conn.request("POST", "/", body, {
        "Authorization": auth,
        "Content-Type": "application/json; charset=utf-8",
        "Host": HOST, "X-TC-Action": action, "X-TC-Version": VERSION,
        "X-TC-Timestamp": str(int(ts.timestamp())),
        "X-TC-Region": region,
    })
    resp = conn.getresponse()
    data = json.loads(resp.read().decode("utf-8"))
    conn.close()
    if "Error" in (data.get("Response") or {}):
        e = data["Response"]["Error"]
        sys.exit(f"API 错误 [{e.get('Code')}] {e.get('Message')}")
    return data["Response"]


# ---------- 子命令 ----------

def cmd_instances(args, sid, skey, sites):
    r = call_api("DescribeInstances", {"Offset": 0, "Limit": 100}, args.region, sid, skey)
    rows = r.get("InstanceSet", [])
    if not rows:
        print(f"地域 {args.region} 下没有实例。买在广州？export TENCENTCLOUD_REGION=ap-guangzhou")
        return
    today = datetime.date.today()
    print(f"{'实例名':<16} {'公网IP':<15} {'状态':<6} {'到期':<12} 剩余")
    for i in rows:
        expire = datetime.datetime.fromisoformat(
            i.get("ExpiredTime", "1970-01-01T00:00:00+08:00")).date()
        left = (expire - today).days
        flag = "⚠️ 快到期!" if left <= 14 else ""
        print(f"{i.get('InstanceName',''):<16} {i.get('PublicAddresses',[ '-'])[0]:<15} "
              f"{'运行' if i.get('Isolated') == 0 else '已隔离':<6} {str(expire):<12} {left} 天 {flag}")


def probe(host, port, timeout=6):
    """HTTP 连通探测：先按端口猜协议（443→https，其余→http），失败换协议再试。"""
    for conn_cls, note in ((http.client.HTTPSConnection if port == 443
                            else http.client.HTTPConnection, ""),
                           (http.client.HTTPConnection if port == 443
                            else http.client.HTTPSConnection, "（换协议重试）")):
        try:
            c = conn_cls(host, port, timeout=timeout)
            c.request("GET", "/")
            c.getresponse()
            c.close()
            return True, f"{host}:{port}", note
        except OSError:
            continue
    return False, f"{host}:{port}", "连不上"


def cmd_sites(args, sid, skey, sites):
    rows = sites.get("sites", [])
    if not rows:
        sys.exit("sites.json 还没有站。先「把新站记上」——对照文件里的示例行加一行。")
    print(f"{'站名':<24} {'目标':<26} {'结果':<4} 备注")
    ok_n = bad_n = 0
    for s in rows:
        host = s.get("domain") or s.get("ip")
        if not host:
            print(f"{s.get('name','?'):<24} {'（没填域名和IP）':<26} ✗    表不完整")
            bad_n += 1
            continue
        target = f"{host}:{s.get('port', 443)}"
        ok, hit, note = probe(host, int(s.get("port", 443)))
        mark = "✓" if ok else "✗"
        print(f"{s.get('name','?'):<24} {target:<26} {mark:<4} {note}")
        ok_n, bad_n = ok_n + ok, bad_n + (not ok)
    print(f"\n{ok_n} 通 / {bad_n} 不通", end="")
    print(" —— 有不通的：先「端口开了吗」查防火墙，再 instances 看实例状态" if bad_n else "")


def cmd_firewall(args, sid, skey, sites):
    inst = _find_instance(args, sites)
    r = call_api("DescribeFirewallRules", {"InstanceId": inst}, args.region, sid, skey)
    rows = r.get("FirewallRuleSet", [])
    print(f"实例 {inst} 防火墙规则（{len(rows)} 条）：")
    for i in rows:
        print(f"  {i.get('Protocol',''):<6} {str(i.get('Port','')):<12} "
              f"{i.get('CidrBlock',''):<18} {i.get('Action','')}  {i.get('Remark','')}")
    want = {int(s["port"]) for s in sites.get("sites", []) if s.get("port")}
    have = set()
    for i in rows:
        for p in str(i.get("Port", "")).split(","):
            if p.strip().isdigit():
                have.add(int(p.strip()))
            elif "," in str(i.get("Port", "")):
                pass
    # 简化的区间解析
    have.clear()
    for i in rows:
        for part in str(i.get("Port", "")).split(","):
            part = part.strip()
            if part.isdigit():
                have.add(int(part))
            elif "-" in part:
                a, _, b = part.partition("-")
                if a.strip().isdigit() and b.strip().isdigit():
                    have.update(range(int(a), int(b) + 1))
    missing = sorted(want - have)
    if missing:
        print(f"\nsites.json 期望但未放行的端口：{missing}")
        print("放行：python3 qcloud_api.py firewall-open -p 端口 --yes")
    else:
        print("\n表内期望端口均已放行。")


def _find_instance(args, sites):
    if args.instance:
        return args.instance
    for s in sites.get("sites", []):
        if s.get("instance"):
            print(f"（取 sites.json 第一个实例 {s['instance']}，可用 -i 指定）")
            return s["instance"]
    sys.exit("没找到实例 ID。用 -i lhins-xxxx 指定，或先在 sites.json 里填 instance 字段。")


def cmd_firewall_open(args, sid, skey, sites):
    if not args.yes:
        print(f"将要放行：TCP {args.port} 0.0.0.0/0（实例 {_find_instance(args, sites)}）")
        print("确认无误后加 --yes 执行。本技能唯一的写操作。")
        return
    inst = _find_instance(args, sites)
    existing = call_api("DescribeFirewallRules", {"InstanceId": inst}, args.region, sid, skey)
    rules = []
    for i in existing.get("FirewallRuleSet", []):
        rules.append({
            "Protocol": i.get("Protocol"), "Port": str(i.get("Port")),
            "CidrBlock": i.get("CidrBlock", ""), "Action": i.get("Action", "ACCEPT"),
            "FirewallRuleDescription": i.get("Remark", "") or "imported",
        })
    rules.append({
        "Protocol": "TCP", "Port": str(args.port), "CidrBlock": "0.0.0.0/0",
        "Action": "ACCEPT", "FirewallRuleDescription": "opened by rsi-tencentcloud-site",
    })
    call_api("ModifyFirewallRules", {"InstanceId": inst, "FirewallRules": rules},
             args.region, sid, skey)
    print(f"已放行 TCP {args.port}。去 sites.json 给对应站补上端口，然后「我的站都通吗」复测。")


def main():
    ap = argparse.ArgumentParser(description="腾讯云子站点管家（只读为主，开端口需 --yes）")
    sub = ap.add_subparsers(dest="cmd", required=True)
    common = argparse.ArgumentParser(add_help=False)
    common.add_argument("-r", "--region", default=os.environ.get(
        "TENCENTCLOUD_REGION", "ap-guangzhou"))
    common.add_argument("-i", "--instance", help="实例 ID（默认取 sites.json 第一个）")

    p = sub.add_parser("instances", parents=[common], help="查实例：IP/状态/到期")
    p = sub.add_parser("sites", parents=[common], help="列出 sites.json 的站")
    p = sub.add_parser("sites-check", parents=[common], help="全站连通自查")
    p = sub.add_parser("firewall", parents=[common], help="查防火墙规则并与表比对")
    p = sub.add_parser("firewall-open", parents=[common], help="放行端口（需 --yes）")
    p.add_argument("-p", "--port", type=int, required=True, help="要放行的 TCP 端口")
    p.add_argument("--yes", action="store_true", help="人工闸门：确认执行")

    args = ap.parse_args()
    sid, skey = load_credentials()
    sys.stderr.write(f"密钥来源校验 OK（{mask(sid)}）\n")
    sites = {}
    if os.path.exists(SITES_FILE):
        try:
            with open(SITES_FILE, encoding="utf-8") as f:
                sites = json.load(f)
        except (OSError, ValueError) as e:
            sys.exit(f"sites.json 解析失败：{e}\n对照文件内示例行修改。")

    if args.cmd == "instances":
        cmd_instances(args, sid, skey, sites)
    elif args.cmd == "sites":
        cmd_sites(args, sid, skey, sites)
    elif args.cmd == "sites-check":
        args.check = True
        cmd_sites(args, sid, skey, sites)
    elif args.cmd == "firewall":
        cmd_firewall(args, sid, skey, sites)
    elif args.cmd == "firewall-open":
        cmd_firewall_open(args, sid, skey, sites)


if __name__ == "__main__":
    main()
