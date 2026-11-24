const campModule = {
  id: 'm1',
  no: '01',
  weekend: '第 1 个周末',
  name: '数字员工',
  headline: '先让 AI 上岗，替你处理工作与生活里的重复事',
  totalMinutes: 280,
  splitHint: '建议分 4 次做完，每次 60–90 分钟',
  outcomes: [
    '一张交办出去的指令卡：一项你每周重复做的任务，已写成 AI 能执行的三段式指令，并跑通了第一轮',
    '一台自己的云服务器：腾讯云轻量服务器开机即用，SSH 直达，防火墙只放行 22',
    '一个装在服务器上的 hermes 数字助理：模型配好、首聊冒烟通过、会话能恢复、doctor 全绿',
    '一条消息平台通路：hermes gateway 把 Telegram/企业微信群接上，手机发消息、服务器上的助理回，重启也在岗',
  ],
  prep: {
    intro: '本模块先在聊天框里学会「交办」，再把数字助理真正安到云服务器上 7×24 值守。开工前逐行自查，缺什么补什么。',
    rows: [
      { need: '一个聊天 AI 账号（WorkBuddy 或任意你顺手的）', confirm: '浏览器打开 www.workbuddy.cn 能登录、对话框能收发', fallback: '没有：手机号注册一个（免费）；用任意已有聊天 AI 也行，第 1 节不挑工具' },
      { need: '腾讯云账号', confirm: '浏览器能打开 console.cloud.tencent.com 并登录', fallback: '没有：手机号注册一个，实名认证用身份证几分钟过' },
      { need: '一张模型 API key', confirm: '任选一家大模型厂商，拿到你自己的 API key（一串密文）', fallback: '没有：去厂商官网开通并生成，只存不发群；国内可用 Z.AI（GLM）、DeepSeek、阿里 DashScope、Kimi 等' },
      { need: 'SSH 终端', confirm: 'Windows 用系统自带 PowerShell；Mac 用自带「终端」', fallback: '都不用额外装，系统自带' },
      { need: '一个消息平台账号', confirm: 'Telegram 账号，或企业微信群（二选一，第 4 节接 gateway 用）', fallback: '提前想好助理接到哪个平台；用 Telegram 先找 @BotFather 建一个 bot，拿到你自己的 Bot token' },
      { need: '想好一项每周重复做的小任务', confirm: '能一句话说出「这事我每周都得亲手做一遍」', fallback: '没想好：先写「每周周报汇总」「每周账单整理」这类通用款跑通，回头换你自己的' },
    ],
    fallbackNote: '没服务器预算或没准备任务也别停：先借用任意聊天 AI 完成第 1 节，第 2 节再来补服务器。服务器规格与价格以当期购买页为准。API key、Bot token、服务器密码这类凭据一律用「你自己的 XX」指代，别把真值截图发群。',
  },
  sections: [
    {
      label: '第 1 节',
      title: '交办：把一件事写成 AI 能执行的指令',
      goal: '挑一项你每周重复做的任务，用「背景/步骤/验收标准」三段式写成指令，发给 AI 并跑通第一轮——先在聊天框里当一回老板',
      minutes: 60,
      preflight: [
        '一个能收发消息的聊天 AI 在手（WorkBuddy 打开 www.workbuddy.cn，或任意你顺手的）。',
        '想好要交办的任务：每周至少重复一次、步骤说得清、结果你能核（如周报汇总、资料整理、每周待办盘点）。',
      ],
      steps: [
        {
          title: '挑任务：找到那件「每周都得亲手做」的事',
          action: '在手机备忘录里写下 1–3 件你每周重复做的任务，从中挑一件步骤最清楚、结果最好核对的。判断口径：这件事你说得出「输入是什么、产出是什么」，AI 就能接。',
          tip: '第一次交办别挑最难的，挑最烦的——重复度高但不出错代价小的事最适合练手。',
          checkpoint: '看到才算做对：备忘录里有一行「我要交办的事 = ____」，且你能一句话说出它的输入和产出。',
          fixes: [
            '想不出任务 → 先从这些通用款里挑一个跑通：每周周报汇总 / 每周账单整理 / 每周待办盘点，回头再换成你自己的。',
            '任务太大说不清 → 拆小：只交办其中一段（如「把散落的几段素材合并成周报初稿」），跑通再扩。',
          ],
        },
        {
          title: '写指令：三段式——背景 / 步骤 / 验收标准',
          action: '按三段式把任务写成一段完整的话：①背景：我是谁、这事每周都要做、为什么；②步骤：分几步做、每步注意什么；③验收标准：做到什么样算合格（格式、长度、必含内容）。整段写进备忘录，一次写完再发。',
          tip: '说人话，完整句子。复杂度最后收口成一句话：全部写好后问自己「一个新来的实习生只看这段话，能不能不动嘴问我就做对」——能，就合格。',
          checkpoint: '看到才算做对：备忘录里躺着一段三段齐全的话——有背景、有编号步骤、有一条以上能核对的验收标准。',
          fixes: [
            '写出来干巴巴 → 背景里补上「给谁看的、什么时候用」，AI 的产出会立刻对味。',
            '验收标准写不出 → 问自己「我拿到结果后第一眼检查什么」，那就是标准。',
          ],
        },
        {
          title: '发出去：把写好的话发给 AI',
          action: '复制整段指令，粘贴进对话框，发送。剩下的就是它的事——你不用懂它中间怎么想。首轮产出不满意就当素材：把不满意的地方写成一句补充要求再发。',
          tip: '中途无论出什么错，统一动作：把报错或跑偏的原话发回去，说「请修好后继续」。',
          checkpoint: '看到才算做对：AI 给出了一份能对上验收标准的产出（第一版糙没关系，能核就算通）。',
          fixes: [
            '产出完全跑偏 → 多半是背景缺失：把「给谁看、什么时候用」补进背景段重发整段指令。',
            'AI 做到一半停了 → 发「继续」；再停就把剩下的事拆成一句新指令分次发。',
            '格式不对 → 只说格式：「按如下格式重排：____」，别让它重做内容。',
          ],
        },
        {
          title: '把指令存成卡：你的第一张交办卡',
          action: '把跑通的三段式指令（连同你后来补的修改要求）整理成一张卡，存进手机备忘录：任务名 + 三段式全文 + 备注（哪里容易跑偏、补过什么要求）。以后每周直接发这张卡。',
          tip: '这张卡就是你的数字员工岗位说明书——第 4 节以后它会被发给服务器上的 hermes，人不在电脑前助理照样照卡办事。',
          checkpoint: '看到才算做对：备忘录里有一张填好空的指令卡，卡片发出去就能用，不用再现场想词。',
          fixes: [
            '指令卡丢了 → 回本手册的 promptCards 重新套模板填一遍，五分钟的事。',
          ],
        },
        {
          title: '立规矩：人工确认闸门',
          action: '在指令卡末尾加一条：「以下动作必须先问我、经我确认才执行：对外发送、删除、付款、改密码。」从此牢记：发送、删除这类危险动作永远你负责，机器不负责——AI 负责干活，你负责扣扳机。',
          checkpoint: '看到才算做对：指令卡上有这条确认闸门，且你能说出「哪类动作必须你点头」。',
          fixes: [
            'AI 没问就自作主张 → 重发时把闸门那条单独成段并加粗语气：「未经我确认，禁止执行任何发送/删除类操作」。',
          ],
        },
      ],
      troubleTable: [
        { symptom: 'AI 产出空泛套话', cause: '背景和验收标准缺失', fix: '回三段式补齐背景段和验收标准，整段重发' },
        { symptom: 'AI 做到一半停了', cause: '长任务分段或当日额度', fix: '发「继续」；再停就拆成更小的指令分次发' },
        { symptom: '每次结果都不一样', cause: '指令里留了自由发挥空间', fix: '把格式、长度、必含项写成硬性验收标准重发' },
        { symptom: 'AI 把不该做的事做了', cause: '没立人工闸门', fix: '补上确认闸门条款重发；已造成影响的立即人工善后' },
      ],
    },
    {
      label: '第 2 节',
      title: '安：云服务器安家',
      goal: '在腾讯云轻量应用服务器上开出一台自己的机器，并用 SSH 从自己电脑登进去，立好安全规矩、领到 API 密钥',
      minutes: 60,
      preflight: [
        '腾讯云账号已登录；浏览器能打开 console.cloud.tencent.com/lighthouse，且已实名。',
        '手边有支付方式（具体价格以当期购买页为准）。',
      ],
      steps: [
        {
          title: '开机：买一台轻量应用服务器（0–5′）',
          action: '浏览器打开 console.cloud.tencent.com/lighthouse → 点「新建」→ 地域选离你近的（如广州/上海）→ 镜像选系统类 · Ubuntu 22.04（课程统一口径，排障最快）→ 规格选入门档即可（价格以当期购买页为准）→ 支付。',
          tip: '已有多台服务器：任挑一台 Ubuntu 的用，不用新买。想用其他系统可以，但排障时请对照 Ubuntu 口径自己换包名。',
          checkpoint: '看到才算做对：付款后 1–2 分钟，实例列表里这台机器状态为「运行中」。',
          fixes: [
            '提示「库存不足」→ 换个地域再点新建；实名认证没过的先过认证。',
            '一直「创建中」→ 等 2–3 分钟刷新；超过 10 分钟换地域新建一台，旧的单删掉退钱。',
          ],
        },
        {
          title: '记门牌：抄下公网 IP（5–8′）',
          action: '在实例详情页记下两样：你自己的服务器公网 IP、你自己的登录密码（在「重置密码」处先设一个，勾自动重启）。',
          tip: '把 IP 抄在手册上，交作业可写；密码只私存手机加密备忘录或密码管理器，不发群不截图。',
          checkpoint: '看到才算做对：公网 IP 已抄在页面记录栏，重置密码后实例重启完成。',
          fixes: [
            '重置密码后登不上 → 确认勾了自动重启；没勾就手动重启实例，等 1–2 分钟。',
          ],
        },
        {
          title: '连通：从自己电脑 SSH 登录（12–25′）',
          action: '打开 SSH 终端（Windows PowerShell / Mac 终端），复制粘贴：ssh root@你自己的服务器公网 IP → 第一次连会问 are you sure，输 yes 回车 → 再输你自己的服务器密码（输入时屏幕不显示，正常）→ 看到 root@… 这样的提示符就是登进来了。顺手跑 whoami / pwd / uptime 三条命令认识机器。把这条 ssh 命令记进手机备忘录，课后还要天天用。',
          tip: 'Windows 提示「不是内部或外部命令」：去「设置→应用→可选功能」装 OpenSSH 客户端。',
          checkpoint: '看到才算做对：终端里出现 root 开头的提示符，pwd 回车显示 /root，uptime 抄下一行。',
          fixes: [
            'ssh 超时连不上 → 回控制台看防火墙是否放行 22 端口（默认放行）；本地网络拦 22 就手机开热点再试。',
            'Permission denied → 密码输错或重置后没重启：回控制台「重置密码」→ 勾自动重启 → 等 1 分钟再连。',
            '本地实在连不上 → 控制台点「远程登录」（网页版终端）先进去干活，课后再修本地，交付不受影响。',
          ],
        },
        {
          title: '守门：补丁一轮 + 两条安全规矩（25–35′）',
          action: 'SSH 里跑：apt update && apt upgrade -y，打一轮系统补丁（几分钟，等它跑完）。然后立两条规矩：规矩一：控制台防火墙只保留 22（SSH），其余端口一律不开——hermes 的 gateway 是往外连消息平台，不需要对公网开新端口，也不开任何危险端口。规矩二：服务器密码只记在自己手机备忘录或密码管理器里，不发群、不写进任何文档；输错三次被锁就回控制台重置。',
          checkpoint: '看到才算做对：apt upgrade 无报错结束；防火墙页里没看到多余的放行端口。',
          fixes: [
            '补丁装到一半断网 → 重新 ssh 登录再跑一遍 apt update && apt upgrade -y，会自动续上。',
            '防火墙看到多余端口 → 逐条删除放行规则，只留 22。',
          ],
        },
        {
          title: '领钥匙：腾讯云 API 密钥一对（35–45′）',
          action: '路径：登录腾讯云控制台 → 右上角头像 → 访问管理（CAM）→ API 密钥管理（直达：https://console.cloud.tencent.com/cam/capi）→ 点「新建密钥」，得到 SecretId + SecretKey——SecretKey 只显示一次，立即保存进你自己的手机备忘录或密码管理器。建议用子账号密钥而非主账号：CAM → 用户 → 新建子用户 → 按需绑定策略（如 QcloudCVMFullAccess），再为该子用户创建 API 密钥。这对密钥是程序操作你云资源的身份证：以后自动化工作流开关服务器、查账单，都靠它——只存不发群，泄露了回这页禁用重建。',
          checkpoint: '看到才算做对：API 密钥管理页里能看到你的 SecretId（一串字母数字）；SecretKey 已存进你自己的备忘录。',
          fixes: [
            '找不到「访问管理」入口 → 右上角头像点开即有；或直接开直达链接 console.cloud.tencent.com/cam/capi。',
            'SecretKey 关页找不回 → 没法再看，直接新建一对，旧的禁用；新密钥记得立即保存。',
            '提示要实名/安全验证 → 按页面提示过一遍再来。',
          ],
        },
      ],
      troubleTable: [
        { symptom: '实例一直「创建中」', cause: '地域库存紧张', fix: '等 2–3 分钟刷新；超过 10 分钟换地域新建，旧的单删掉退钱' },
        { symptom: 'ssh 连接超时', cause: '本地网络或防火墙拦了 22 端口', fix: '控制台点「远程登录」网页终端先进去干活，课后再修本地 ssh' },
        { symptom: 'ssh 提示 Permission denied', cause: '密码输错，或重置密码后没重启实例', fix: '回控制台「重置密码」→ 勾选自动重启 → 等 1 分钟再连' },
        { symptom: '网页终端能进、本地 ssh 不能进', cause: '本地网络运营商拦 22', fix: '手机开热点再试一次；还不行就日常用网页终端，交付不受影响' },
        { symptom: 'SecretKey 找不到了', cause: '只显示一次，关页就看不到了', fix: '回 API 密钥管理页新建一对，旧的可禁用；新密钥立即保存' },
      ],
    },
    {
      label: '第 3 节',
      title: '装：Hermes 落地与首聊',
      goal: '在服务器上装好 hermes，setup 初始化、选对模型、首聊冒烟四条全过、会话能恢复、doctor 全绿——助理正式有脑子',
      minutes: 90,
      preflight: [
        '已 SSH 登录服务器；手边有你自己的模型 API key（第 1 节开工前领的那张）。',
        '选型口径先记牢：模型上下文必须 ≥64K，不达标的模型 hermes 启动会直接拒。',
      ],
      steps: [
        {
          title: '装 hermes（0–10′）',
          action: 'SSH 终端里执行：\ncurl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash\n装完执行 source ~/.bashrc，让当前终端认得 hermes 命令。安装目录在 ~/.hermes，配置和技能以后都住这里。装完输 hermes 有响应即装好。',
          checkpoint: '看到才算做对：终端输 hermes 有响应（出版本号或进入界面都算）。',
          fixes: [
            'hermes command not found → 先 source ~/.bashrc；还不行退出 ssh 重登一次再试。',
            'install.sh 卡住不动 → Ctrl+C 后重跑一遍安装脚本，一般第二次就过；连着两次就换个时段再装，服务器本身不用动。',
          ],
        },
        {
          title: '初始化：hermes setup 三选一（10–25′）',
          action: '执行 hermes setup 进入初始化向导，三种模式：Quick Setup（Nous Portal OAuth 网页一键登）、Full Setup（自带各家 key）、Blank Slate（最小化）——有自己 API key 的选 Full Setup。只想最快跑通：hermes setup --portal 一条命令走网页登录。向导让你填 key 时，粘贴你自己的 API key（终端不回显，正常）。国内 provider 对照：Z.AI（GLM，环境变量 GLM_API_KEY/ZAI_API_KEY）、DeepSeek（DEEPSEEK_API_KEY）、阿里 DashScope（DASHSCOPE_API_KEY）、Kimi（KIMI_API_KEY）。',
          tip: '想换模式不用怕：setup 可以重复跑，换模式重走一遍即可。',
          checkpoint: '看到才算做对：setup 向导走完没有报错退出。',
          fixes: [
            '向导中途退出 → 直接重跑 hermes setup，向导可重复进；怀疑环境坏掉先跑 hermes doctor 体检。',
            '填 key 后验证不过 → 去厂商控制台核对 key 前后别带空格、账户有余额；改完重跑 hermes setup。',
          ],
        },
        {
          title: '选模型：hermes model + 双文件落盘（25–40′）',
          action: '执行 hermes model 进交互向导，按提示选 provider 和模型（国内可用 Z.AI/DeepSeek/DashScope/Kimi）；或命令行直接设：hermes config set model <模型名>。hermes 的配置分两个文件：密钥进 ~/.hermes/.env、非密钥进 ~/.hermes/config.yaml。铁律：手改文件前先备份——cd ~/.hermes && cp .env .env.bak-日期 && cp config.yaml config.yaml.bak-日期；改完把 key 文件权限收到 600：chmod 600 ~/.hermes/.env。硬杠再念一遍：模型上下文须 ≥64K，不达标启动直接被拒。',
          tip: '不惯用命令行改配置：nano ~/.hermes/config.yaml 也能改，但密钥一律写 .env 不写 yaml。',
          checkpoint: '看到才算做对：ls ~/.hermes/ 里能看到 .env 和 config.yaml；ls -l ~/.hermes/.env 权限是 -rw-------。',
          fixes: [
            'config set 报错 → 多半是命令格式问题，对照 hermes config set <键> <值> 的写法重敲。',
            '改坏文件 → cd ~/.hermes && cp .env.bak-日期 .env && cp config.yaml.bak-日期 config.yaml 复原，再来一遍。',
          ],
        },
        {
          title: '首聊冒烟：四条全过（40–60′）',
          action: 'SSH 终端执行 hermes（或 hermes --tui 换图形界面款）。成功的标准四条：横幅显示你选的模型、发「回复两个字：正常」能收到「正常」、让它查个东西能调工具、连问几句多轮不断。再问一句业务话试试（比如「用一句话总结今天的日期」），确认不是只会说正常。把首聊截图存好，这就是交付 ② 的第一张凭证。',
          tip: '返回慢：首次调用模型有冷启动，等 10–20 秒；第二次起就快了。',
          checkpoint: '看到才算做对：横幅显示模型名；发「回复两个字：正常」收到「正常」；四条全部达成，截图已存。',
          fixes: [
            '空回复/乱码 → 多半是 provider 或 model 选错，退出后重跑 hermes model 换一款再试。',
            '启动直接被拒、提示上下文 → 换长上下文模型：重跑 hermes model 选一款 ≥64K 的，再启动验证。',
            '对话中报 401/key 类错误 → 核对 ~/.hermes/.env 里的 key 是否完整，改完 chmod 600 ~/.hermes/.env 再试。',
          ],
        },
        {
          title: '会话恢复：hermes --continue（60–75′）',
          action: '退出 hermes（按向导提示退出或 Ctrl+C），SSH 里再执行：hermes --continue——它会把上一次的会话接着聊，数字助理的记性就靠这个。日常习惯：断线重连后先 --continue，再继续交办任务。顺手 hermes skills browse 看一眼技能市集（技能都在 ~/.hermes/skills/），想给它加本事课后再来挑。',
          checkpoint: '看到才算做对：hermes --continue 后它还记得上一句你说了什么。',
          fixes: [
            '找不到会话 → profile 换了或上次没正常保存：hermes sessions list 列出历史会话，找到对的再进；平时退出让它正常保存别硬断。',
          ],
        },
        {
          title: '体检：hermes doctor 全绿（75–90′）',
          action: '执行 hermes doctor，让它把环境、配置、模型连通挨个查一遍。全绿即健康；有黄项/红项按它给的提示逐条修，修完再跑一次直到全绿。记牢恢复工具链顺序：doctor → model → setup → sessions list → --continue → gateway status，出问题按这个链条捋，基本全能自救。把 doctor 全绿截图存相册，这是你服务器的体检报告。',
          checkpoint: '看到才算做对：hermes doctor 全绿无红项，截图已存。',
          fixes: [
            'doctor 报模型连不通 → 回 hermes model 重选，或核对 ~/.hermes/.env 里 key 是否完整。',
            'doctor 修不动的项 → 截图发微信群，讲师远程带看。',
          ],
        },
      ],
      troubleTable: [
        { symptom: 'install.sh 卡住不动', cause: '服务器访问外网慢', fix: 'Ctrl+C 中断重跑一次；连着两次就换个时段再装' },
        { symptom: 'hermes command not found', cause: '装完没 source，或当前终端没刷新', fix: 'source ~/.bashrc；还不行退出 ssh 重登一次' },
        { symptom: 'setup 填 key 后验证不过', cause: 'API key 复制不完整或没充值', fix: '去厂商控制台核对 key 前后别带空格、账户有余额，重跑 hermes setup' },
        { symptom: '启动被拒、提示上下文不够', cause: '所选模型上下文 <64K', fix: '换长上下文模型：重跑 hermes model 选一款 ≥64K 的再启动验证' },
        { symptom: '首聊空回复或回乱码', cause: 'provider 或 model 选错', fix: '重跑 hermes model 换正确的 provider/模型组合，再 hermes 验证' },
        { symptom: '--continue 找不到会话', cause: 'profile 换了或上次没保存', fix: 'hermes sessions list 找到目标会话；平时正常退出别硬断' },
      ],
    },
    {
      label: '第 4 节',
      title: '阵地：消息通路与常驻值守',
      goal: '用 hermes gateway 把 Telegram/企业微信群等接上，手机发消息、服务器上的助理回；重启验证常驻，备份配置，助理 7×24 在岗',
      minutes: 70,
      preflight: [
        '首聊冒烟已通过；hermes doctor 全绿。',
        '手边有消息平台账号和你自己的 Bot token（用 Telegram 先在 @BotFather 建一个 bot 拿 token）。',
      ],
      steps: [
        {
          title: '配通路：hermes gateway setup',
          action: 'SSH 终端执行：hermes gateway setup 进交互向导 → 选你要接的平台：Telegram/Discord/Slack/WhatsApp/Signal/Email/Teams 都支持；国内场景常用 Telegram，企业微信群可在课后接兼容通路 → 向导让你填平台凭据（如 Telegram 的 Bot token）时，一律填你自己的 Bot token，别用别人的、别发群 → 配完执行 hermes gateway status 查状态。',
          tip: '数字助理的真相：云服务器上跑着 hermes gateway 常驻接消息平台——人不在电脑前，助理在服务器上替你值守。',
          checkpoint: '看到才算做对：hermes gateway status 显示你的平台已连接。',
          fixes: [
            'gateway 起了但收不到消息 → token/allowlist 不全：重跑 hermes gateway setup 补全，再 hermes gateway status 核对。',
            '向导里 token 填了没反应 → Bot token 复制不全或已被重置：回平台重新生成你自己的 Bot token，整段复制重填。',
          ],
        },
        {
          title: '点名：手机发一条，助理回一条',
          action: '手机上打开你的消息平台，给助理（你的 bot）发：回复两个字：正常 → 几秒内收到「正常」，这条通路就是活的：手机→平台→服务器上的 hermes→模型→回话。再发一句业务话（比如「帮我记一条待办：明早九点复盘」），确认能多轮。两张截图合影存好：①hermes gateway status 已连接 ②手机上收到「正常」。',
          tip: '回复慢：首次链路有冷启动；连续发几条观察是否稳定。',
          checkpoint: '看到才算做对：手机发「回复两个字：正常」秒级收到「正常」；两张截图已存。',
          fixes: [
            '手机没收到回复 → 按顺序查：hermes gateway status 是否连接 → 重跑 hermes gateway setup 核对 token/allowlist → hermes doctor 体检。',
            '平台回复空内容 → 模型侧问题，不是 gateway：服务器上跑 hermes 首聊验证；空回复/乱码就重跑 hermes model 换模型。',
          ],
        },
        {
          title: '交办上岗：把第 1 节的指令卡发给它',
          action: '在消息平台里把第 1 节那张三段式指令卡原样发给助理（或 SSH 里 hermes --continue 接着聊时发）。确认它在通路这头也能按卡办事、按验收标准交活、遇到发送/删除类动作先来问你。',
          checkpoint: '看到才算做对：通过手机消息交办的活有了回话，产出对得上验收标准。',
          fixes: [
            '通路里办事不如终端里灵 → 把任务拆小分条发；关键任务仍走 SSH 里 hermes --continue 办，通路日常做轻活。',
          ],
        },
        {
          title: '值守：重启服务器验证常驻',
          action: '控制台点重启 → 再 ssh 进来跑 hermes gateway status，通路还在就是真的常驻 → 手机再发一条「回复两个字：正常」点名确认。把恢复工具链贴在服务器备忘里：doctor → model → setup → sessions list → --continue → gateway status。每月一次小体检：hermes doctor 全绿 + gateway status 在线 + .env 权限还是 600。',
          checkpoint: '看到才算做对：重启服务器后 hermes gateway status 仍显示连接；手机发消息仍有回。',
          fixes: [
            '重启后 gateway 没起 → ssh 进来手动起一次 gateway，再跑 gateway status 确认；具体起法以向导提示为准。',
            '重启后失联 → hermes doctor 逐项排查 → gateway setup 核对配置 → 还不行带截图来微信群问。',
          ],
        },
        {
          title: '留底：备份 .env 和 config.yaml',
          action: 'SSH 里执行：cd ~/.hermes && cp .env .env.bak-日期 && cp config.yaml config.yaml.bak-日期，再确认 ls -l ~/.hermes/.env 权限仍是 -rw-------。改配置后助理起不来时的救命咒语也在这一步：cp .env.bak-日期 .env && cp config.yaml.bak-日期 config.yaml 复原，hermes doctor 体检后再来。',
          checkpoint: '看到才算做对：ls ~/.hermes/ 里两个文件各有至少一个 .bak-日期 备份；.env 权限 600。',
          fixes: [
            '改配置后助理起不来 → 用备份复原那两条 cp 命令救回，hermes doctor 体检后再改。',
          ],
        },
      ],
      troubleTable: [
        { symptom: 'gateway 起了、手机收不到消息', cause: 'token/allowlist 不全', fix: '重跑 hermes gateway setup 补全凭据与 allowlist，再 hermes gateway status 核对' },
        { symptom: '向导里 token 填了没反应', cause: 'Bot token 复制不全或已被重置', fix: '回平台重新生成你自己的 Bot token，整段复制重填；token 别发群' },
        { symptom: '重启服务器后助理失联', cause: 'gateway 没随机器恢复', fix: 'ssh 进来跑 hermes gateway status 确认；需要时手动起一次并用 hermes doctor 体检' },
        { symptom: '平台回复空内容', cause: '模型侧问题，不是 gateway', fix: '服务器上跑 hermes 首聊验证；空回复/乱码就重跑 hermes model 换模型' },
      ],
    },
  ],
  selfCheck: [
    {
      name: '交付 ① 云服务器',
      items: [
        '控制台实例状态「运行中」，我自己的服务器公网 IP 抄在手册上',
        'ssh root@你自己的IP 一次登入成功，无需翻笔记',
        '防火墙只放行 22（SSH），没有多余的开放端口——hermes gateway 往外连消息平台，不需要对公网开新端口',
      ],
    },
    {
      name: '交付 ② hermes 数字助理在服务器上',
      items: [
        '~/.hermes/ 里有 .env 和 config.yaml，且各有至少一个 .bak-日期 备份；.env 权限 600（-rw-------）',
        'hermes 首聊成功：横幅显示模型、发「回复两个字：正常」收到「正常」、能调工具、多轮不断',
        'hermes --continue 能捡回上一次会话；hermes doctor 全绿无红项',
      ],
    },
    {
      name: '交付 ③ 消息平台通路',
      items: [
        'hermes gateway status 显示你接的平台已连接（Telegram/企业微信群等任一）',
        '手机给助理发「回复两个字：正常」，秒级收到「正常」；重启服务器后通路仍在、助理有回',
      ],
    },
  ],
  security: '安全底线（一票否决）：服务器密码、API key、Bot token 只存在你自己的备忘录/密码管理器，从没发群、没进截图。腾讯云 API 密钥一对（CAM → API 密钥管理）：SecretId 可查、SecretKey 已私存——程序操作云资源的身份证，泄露立即回 cam/capi 禁用重建。另：发送、删除、付款这类危险动作永远你负责，机器不负责——AI 干活，你扣扳机。',
  plan30: {
    intro: '从「跑起来」到「天天在岗」：每周一个动作 + 自查，30 天不用就会忘。每周一小步，周末 5 分钟自查没掉队。',
    rows: [
      { week: '第 1 周 · 验活', task: '每天手机给助理发一句话验活；服务器上跑一次 hermes 首聊冒烟', standard: '一周 7 天手机端都有回，其中至少一天是交办真实小任务' },
      { week: '第 2 周 · 调教像你', task: '把对话调得像你：多轮交代背景、用 hermes --continue 接着聊；hermes skills browse 挑一个技能装上', standard: '助理连续多轮记住上下文；新技能真的被用上一次' },
      { week: '第 3 周 · 第二通路', task: '加第二条通路或换更顺手的平台，重走一遍 hermes gateway setup', standard: 'hermes gateway status 里多一条在线通路，换平台不怵' },
      { week: '第 4 周 · 全面体检', task: 'hermes doctor 全绿、gateway status 在线、备份 .env 和 config.yaml、重启服务器验证常驻', standard: '体检完三张截图（doctor/状态/手机对话）留档，助理满月在岗' },
    ],
    daily: '每日一分钟点名（照抄即用）：手机给助理发「回复两个字：正常」→ 见「正常」即点名完成。隔几天 ssh 登服务器跑一遍 hermes gateway status 确认通路在线，再 hermes doctor 扫一眼环境健康。打卡口径：30 格打卡表（1–30），做到一天画一格勾。',
  },
  promptCards: [
    {
      title: '三段式任务交办卡',
      usage: '第 1 节写指令、以及以后每周交办重复任务时，套这个模板填空',
      prompt: '【背景】我是____，这件事我每周都要做一次，用途是____，给____看。\n【步骤】请按以下步骤做：1.____；2.____；3.____。注意：____。\n【验收标准】做到以下标准才算合格：格式为____；长度约____；必须包含____。\n【人工闸门】以下动作必须先问我、经我确认才执行：对外发送、删除、付款、改密码。做完先给我看结果，我确认后再算交付。',
    },
    {
      title: '修错兜底',
      usage: 'AI 报错、跑偏、做到一半停了——任何时候发这句',
      prompt: '这是报错/跑偏的原话：____。请修好后继续。',
    },
    {
      title: '每日点名',
      usage: '每天一分钟验活：手机发给助理，见「正常」即点名完成',
      prompt: '回复两个字：正常',
    },
    {
      title: '改前备份',
      usage: '动 ~/.hermes/.env 或 config.yaml 之前，先在 SSH 里跑（日期换成当天）',
      prompt: 'cd ~/.hermes && cp .env .env.bak-日期 && cp config.yaml config.yaml.bak-日期 && chmod 600 ~/.hermes/.env',
    },
    {
      title: '月度体检',
      usage: '每月一次（或出问题时），按顺序在 SSH 里逐条跑，全绿即健康',
      prompt: 'hermes doctor\nhermes gateway status\nls -l ~/.hermes/.env',
    },
  ],
  nextModule: {
    name: '内容工厂',
    note: '数字员工已在岗，下一模块让它开动内容产线：从素材到文章初稿，一条指令进、一篇内容出。',
  },
}

export default campModule
