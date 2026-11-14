# 密钥安全三原则

> 你的腾讯云密钥 = 你云上全部资产的钥匙。
> 这一页 5 分钟能读完，读完后 30 天阵地期不用再想它。

## 原则一：密钥永不入仓、永不进对话正文

**只放两个位置，脚本自己会找：**

```bash
# 位置 A：环境变量（临时用）
export TENCENTCLOUD_SECRET_ID="AKIDxxxxxxxx"
export TENCENTCLOUD_SECRET_KEY="xxxxxxxx"

# 位置 B：凭据文件（推荐，长期用）
mkdir -p ~/.tencentcloud && cat > ~/.tencentcloud/credentials <<'EOF'
[default]
secret_id = 你的SecretId
secret_key = 你的SecretKey
EOF
chmod 600 ~/.tencentcloud/credentials   # 只许自己读写
```

**永远不要做的三件事：**

| 不要 | 为什么 |
| --- | --- |
| 把密钥写进 sites.json / 任何仓里的文件 | 仓会被 clone、会被截图、会被同步到网盘 |
| 把密钥粘进对话框、让 AI 记住 | 对话记录会被存档；密钥一旦入文，视同泄露 |
| 用命令行参数传密钥（`--secret-id XXX`） | 命令会进 shell 历史，历史文件是明文的 |

## 原则二：只用子账号密钥，权限最小

主账号密钥 = 全家桶钥匙（扣费、删机器、改 DNS 全都能干）。
日常自查只需要「看」，不需要「动」。

**开权限步骤（控制台 5 分钟）：**

```text
① 访问管理 CAM → 用户 → 新建子用户（编程访问，不控台登录）
② 附加策略（只读就够日常）：
     QcloudLighthouseReadOnlyAccess   ← 轻量服务器只读
     QcloudDNSReadOnlyAccess          ← DNSPod 只读（查解析用）
③ 要用「开端口」功能，再加：
     QcloudLighthouseFullAccess（仅轻量服务器）
④ 拿子用户的 SecretId/SecretKey 填进凭据文件
```

> 判断标准：**这把钥匙丢了，最多损失什么？** 子账号只读 = 什么都丢不了。

## 原则三：泄露应急，先禁用再排查

怀疑密钥泄露（截图发群里了 / 粘错地方了 / 凭据文件被同步上云了）：

```text
① 控制台 → 访问管理 → API 密钥管理 → 禁用该密钥     （30 秒，先断电）
② 查账单 / 操作记录，确认有没有异常扣费和陌生操作
③ 没事 → 换新密钥；有事 → 提工单 + 改密码 + 逐项检查资源
```

**顺序不能反。** 先排查再禁用 = 给攻击者留窗口。

## 常见坑

| 坑 | 现象 | 一句话解法 |
| --- | --- | --- |
| Id 和 Key 填反 | AuthFailure.SecretIdNotFound | Id 以 `AKID` 开头，Key 更长 |
| 凭据文件带 BOM/中文引号 | 解析失败 | 用上面 heredoc 原样写，别用富文本编辑器 |
| 主账号密钥用惯了不想换 | — | 想想「丢了损失什么」那句话，去开个子账号 |
| 环境变量设了但新终端不生效 | 找不到密钥 | 换位置 B（凭据文件），一劳永逸 |
| 电脑共用 | 别人也能跑你的脚本 | 凭据文件 chmod 600 + 系统多账户隔离 |
