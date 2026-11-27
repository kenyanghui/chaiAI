import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const modules = [
  {
    no: '01',
    manualId: 'm1',
    weekend: '12 月 19 日开营 · 第 1 个周末',
    name: '数字员工',
    headline: '先让 AI 上岗，替你处理工作与生活里的重复事',
    intro: '把前两期数字员工工作坊的方法拆到自己手里：从 WorkBuddy 本机操作，到腾讯云上的 Hermes / OpenClaw 常驻助理。不是学会聊天，而是让 AI 接住一项真实任务。',
    lessons: [
      {
        tool: 'WorkBuddy + 云电脑',
        title: '拆AI工作坊，让 AI 操作培训更丝滑',
        desc: '把一个你每周都要重复做的任务交给 AI：说清楚背景、步骤和验收标准，让它在你的云电脑里按指令执行。',
        points: ['云电脑与 WorkBuddy 环境准备', '把模糊需求写成能执行的任务指令', '资料整理、文档生成、信息汇总现场带练', '权限、密码与人工确认的安全边界'],
      },
      {
        tool: '腾讯云 + Hermes / OpenClaw',
        title: 'AI拆书家，指挥你的数字军团',
        desc: '沿用第三期「安、装、跑、阵地」的实操路径，在云服务器上装好个人 AI 智能体，配上自己的模型，让手机也能随时交办任务。',
        points: ['安：腾讯云轻量服务器安家，SSH 与防火墙', '装：Hermes / OpenClaw 落地，接入自己的模型', '跑：首聊冒烟、会话恢复与状态检查', '阵地：消息平台接入、常驻值守与任务分工'],
      },
    ],
    deliverables: ['一个能在云电脑里做事的 WorkBuddy 数字员工', '一个云端常驻、可从手机交办的 AI 助理', '一套个人任务指令卡与安全检查清单', '一项真实任务从交办到验收的完整记录'],
    applications: ['工作：会议纪要、周报、资料归档、信息搜集', '学习：课程资料整理、读书笔记、复习提纲', '生活：清单管理、方案比较、家庭资料归类'],
    resources: [{ name: '原第三期「云服务器构建数字助理」跟做手册', href: '/workshop/m3-1/guide.html' }],
  },
  {
    no: '02',
    manualId: 'm2',
    weekend: '12 月 26 日 · 第 2 个周末',
    name: '内容工厂',
    headline: '把读过的、想过的、做过的，变成随时能调用的个人资产',
    intro: '完整接上第一期的 ima 建库、第四期的 Obsidian 上下文库，再用 RIA 把经典、指南、技能和专家经验拆成自己的行动。重点不是做自媒体，而是让你的知识与经验真正为你所用。',
    lessons: [
      {
        tool: '知识库 ima / Copilot',
        title: '小蛮腰分舵 ima 知识号，让知识不再散乱',
        desc: '从自己的 3–5 份真实资料开始，建库、分类、导入、打标签，再用提问把资料重新找回来。',
        points: ['建一个记得住名字、找得到东西的知识库', '按使用场景建立 2–3 个分类并导入真实资料', '单篇速览、按标签跨文件问答、定向提问', '让 AI 用熟悉的素材起草方案、文章或学习笔记'],
      },
      {
        tool: '拆AI核心方法 · R 爬虫 / I 蒸馏 / A 应用',
        title: '拆经典 / 拆指南 / 拆技能 / 拆专家，让 AI 助力拆为己用',
        desc: '不是把内容交给 AI 总结就结束，而是经过采集、提炼、关联和应用，把别人的经验转成自己的方法。',
        points: ['R 爬虫：找到并采集值得拆解的原始材料', 'I 蒸馏：提取核心概念、关键步骤与适用边界', '关联：连接自己的问题、经验和已有知识', 'A 应用：生成一张能马上执行的拆页或指令卡'],
      },
      {
        tool: '笔记 Obsidian / Copilot',
        title: 'AI拆书家外脑，让 AI 比你更懂你',
        desc: '复用第四期的三层上下文库：痕迹、本体、规则。让每天散落的记录沉淀下来，成为 AI 理解你的长期上下文。',
        points: ['00-痕迹：日记、周报、聊天记录与会议纪要', '10-本体：我是谁、我想成为谁、此刻在忙什么', '20-规则：提炼自己的价值观与行动模式', 'Copilot Vault QA：日记 → 归一 → AI 调用 → 回流'],
      },
    ],
    deliverables: ['一个导入真实资料的个人 AI 知识库', '一张完整走通 RIA 的个人拆页或指令卡', '一套「痕迹 / 本体 / 规则」三层 Obsidian 上下文库', '一份让知识库持续生长的 30 天养成计划'],
    applications: ['工作：项目资料、会议决策、方法沉淀与复用', '学习：拆书、拆课、拆论文，形成自己的理解', '生活：经验记录、兴趣研究、家庭知识与个人复盘'],
    resources: [
      { name: '原第一期「个人 AI 知识库」跟做手册', href: '/workshop/classic/first/guide.html' },
      { name: '原第四期「Obsidian 个人上下文库」跟做手册', href: '/workshop/software/obsidian/guide.html' },
    ],
  },
  {
    no: '03',
    manualId: 'm3',
    weekend: '1 月 2 日 · 第 3 个周末',
    name: '自动运营',
    headline: '把反复做的流程接起来，让内容、网站与社群持续运转',
    intro: '把前几次工作坊已经跑通的自动化方法搬到自己的项目：无论你是专业人士、内容创作者、自由职业者，还是社群组织者，都可以选一个真实场景，让 AI 接手重复步骤，人保留判断与确认。',
    lessons: [
      {
        tool: '内容自动化工作流',
        title: '微信公众号：分舵公众号',
        desc: '沿用第一期的内容流水线：从素材库到初稿，再到质检和公众号草稿箱，最后由本人检查发布。',
        points: ['从自己的知识库调取素材', '生成符合个人风格的初稿', '检查事实、表达与敏感信息', '输出草稿或发布前检查清单'],
      },
      {
        tool: '短视频运营自动化工作流',
        title: '拆书家一键转发',
        desc: '把已有文章、拆页或课程内容重新拆成短视频选题与脚本，减少重复改写和分发操作。',
        points: ['选题与素材整理', '口播稿、分镜与发布文案', '内容复用与一键转发流程', '发布结果回收与下一轮优化'],
      },
      {
        tool: '建站 / 课件 / 邮箱 / 问卷 / 评测',
        title: '拆AI网站，分舵运营基地',
        desc: '复用第二期「拆本站」的方法，用自然语言改出一个自己的网站，并把课程、服务和反馈入口接起来。',
        points: ['个人网站：介绍、作品与内容展示', '课件与活动页：把经验变成可分享的课程', '邮箱、问卷与评测：收集需求、报名和反馈', '同一素材复用到网站与其他内容出口'],
      },
      {
        tool: '网站服务流程工作台',
        title: '拆认证 · AI拆书家认证，三级拆书家走出去',
        desc: '以服务流程为例，把咨询、报名、资料、交付和回访串成一张清楚的工作台，而不是散落在聊天记录里。',
        points: ['梳理用户从了解到交付的完整路径', '把每一步的责任、输入与输出说清楚', '能自动化的交给 AI，需要判断的留给人'],
      },
      {
        tool: '社群自动运营工作流',
        title: 'AI共拆小应用 + 微信群运营机器人',
        desc: '用拆搭子网页、拆约小程序和微信群机器人，减少邀约、提醒、答疑与回访里的重复劳动。',
        points: ['AI共拆：活动发布、需求匹配与搭子邀约', '群内提醒、活动接龙、常见问题与回访', '把一次活动沉淀成下次可复用的流程'],
      },
    ],
    deliverables: ['至少一条围绕自己真实项目跑通的自动化主流程', '内容、网站、社群三类工作流的个人复用图纸', '一张标注人工确认节点的服务流程图', '一份接下来 30 天可持续执行的应用计划'],
    applications: ['工作：客户服务、项目交付、个人品牌与团队协作', '学习：课程发布、作业反馈、共学组织与资料分发', '生活：兴趣社群、活动组织、报名提醒与经验分享'],
    resources: [
      { name: '原第二期「用 WorkBuddy 拥有你的同款网站」手册', href: '/workshop/m2-1/guide.html' },
      { name: '「知识库 → 公众号草稿箱」完整流程', href: '/workshop/classic/first/guide.html' },
    ],
  },
  {
    no: '04',
    manualId: 'm4',
    weekend: '1 月 3 日 · 第 4 个周末',
    name: '综合共创',
    headline: '降龙第十八掌：把前三次成果合成自己的完整系统',
    intro: '最后一个周末不再堆新工具，而是从你的工作与生活出发，选一个最值得解决的问题，把数字员工、知识库和自动化工作流组合起来，完成一次真实交付。',
    lessons: [
      {
        tool: '第一式 · 选题',
        title: '从自己的真问题出发',
        desc: '不为展示技术而做项目。选择一个高频、耗时、可验收的问题，明确使用者、输入、输出和完成标准。',
        points: ['个人工作提效、学习系统或生活管理均可选题', '把大想法缩成一个周末能交付的小闭环', '确定项目验收标准与个人隐私边界'],
      },
      {
        tool: '第二式 · 共创',
        title: '把前三个周末的成果接成闭环',
        desc: '现场拆解、结对排障、讲师巡场，把已有的数字员工、知识资产与流程组件组合成你的个人 AI 系统。',
        points: ['让数字员工接到真实任务', '让知识库提供可信的个人上下文', '让自动化流程减少重复操作', '保留人工审核，完成一次端到端测试'],
      },
      {
        tool: '第三式 · 路演',
        title: '降龙第十八掌，现场验收',
        desc: '用真实输入演示，不讲概念。说清楚它解决什么问题、怎样运转、哪里需要人，以及下一个 30 天如何继续用。',
        points: ['项目现场演示与同伴反馈', '交付操作说明、指令卡和备用方案', '制定 30 天迭代计划，让成果真正留在日常里'],
      },
    ],
    deliverables: ['一个解决自己真实问题的 AI 应用作品', '一条从输入到结果完整跑通的个人工作流', '一份可复用的操作说明与指令卡', '一次现场路演和一份 30 天迭代计划'],
    applications: ['工作：做出自己的项目助手、研究助手或服务流程', '学习：做出个人学习外脑、拆书系统或课程助手', '生活：做出家庭知识库、兴趣项目或生活管理助手'],
    resources: [],
  },
]

const preparation = [
  { title: '一台自己的电脑', desc: 'Windows / Mac 均可。手机可用于查看资料和远程交办任务，主要实操建议带电脑。' },
  { title: '3–5 份真实材料', desc: '工作文档、学习笔记、拆页、会议纪要或个人记录都可以，真实材料比练习样例更有价值。' },
  { title: '一个想改善的问题', desc: '不用先懂技术，带着工作、学习或生活里反复耗时的一件事来。' },
  { title: '自己的账号与凭据', desc: '按各模块手册提前准备。API Key、密码等只保存在自己手里，不发群、不交给他人。' },
]

const faqs = [
  { q: '是连续四天上课吗？', a: '不是。训练营分四个周末交付，每个周末集中学习一个整天。周间把成果用于真实场景，下一个周末再带着使用中的问题继续拆解。' },
  { q: '不是分舵运营者，也适合参加吗？', a: '适合。分舵只是部分案例来源，课程主线是「拆为己用」。你可以把方法用于本职工作、自由职业、学习研究、内容创作、兴趣社群或家庭生活。' },
  { q: '零基础、不会编程可以参加吗？', a: '可以。沿用往期工作坊「说人话、照着做、看检查点」的方式，关键操作有指令卡和排障表。愿意动手、愿意带真实问题来，比会编程更重要。' },
  { q: '线上参与能完成同样的实操吗？', a: '可以在线跟做。建议准备电脑、稳定网络和课程所需账号，按当堂检查点提交成果；具体线上参与方式以拆约小程序当期活动说明为准。' },
  { q: '四个周末必须按顺序参加吗？', a: '建议四期联报并按顺序完成，因为后面的模块会复用前面的知识库、数字员工和工作流。如确有安排冲突，报名前请在拆约小程序查看当期说明或联系讲师确认。' },
  { q: '软件、云服务器和模型费用包含吗？', a: '不同工具可能有各自的服务费用，云服务器、模型 API 等按个人选择开通，由参与者自行管理。页面不预先标价格，具体课程费用与相关说明以拆约小程序报名页为准。' },
  { q: '我没有公众号、网站或社群，会不会跟不上？', a: '不会。第三周末提供不同入口，没有公众号可以输出到备忘录或文档，没有网站可以先做个人展示页，没有社群也可以把自动化用于自己的内容、项目或服务流程。' },
  { q: '具体在哪四个周末？地点和费用是多少？', a: '12 月 19 日（周六）开营；12·19 一模块、12·26 二模块、2027 年 1·2 三模块、1·3 四模块，四个整天。线下地点、费用与剩余席位，以拆约小程序当期活动页为准。' },
]

function SectionHeading({ eyebrow, title, desc }) {
  return (
    <div className="max-w-3xl mb-10">
      <div className="text-[12px] tracking-[0.2em] uppercase font-semibold text-[#0071e3] mb-3">{eyebrow}</div>
      <h2 className="text-[30px] sm:text-[38px] font-bold tracking-tight leading-tight">{title}</h2>
      {desc && <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-[#6e6e73]">{desc}</p>}
    </div>
  )
}

function SignupCard({ eager = false }) {
  return (
    <div className="bg-white text-[#1d1d1f] rounded-[28px] p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,.18)] text-center">
      <div className="text-[12px] tracking-[0.18em] uppercase font-semibold text-[#0071e3]">官方报名入口</div>
      <h3 className="text-[25px] font-bold mt-2">微信扫码 · 拆约报名</h3>
      <p className="text-[14px] text-[#6e6e73] mt-2">进入「拆约」小程序，查看日期、费用与席位</p>
      <div className="mt-6 mx-auto w-fit rounded-[22px] border border-black/[.08] p-3 bg-white">
        <img
          src="/images/aiyue-miniapp-qr.jpeg"
          alt="微信扫码进入拆约小程序报名拆AI训练营"
          className="w-[220px] h-[220px] sm:w-[248px] sm:h-[248px] object-contain rounded-[14px]"
          loading={eager ? 'eager' : 'lazy'}
        />
      </div>
      <div className="mt-5 inline-flex items-center rounded-full bg-[#f5f5f7] px-4 py-2 text-[13px] font-semibold text-[#1d1d1f]">
        12·19 开营 · 四期联报
      </div>
      <p className="text-[12px] leading-relaxed text-[#86868b] mt-4">线下限 12 席 · 线上可参与<br />打开微信扫一扫，长按图片也可识别小程序码</p>
    </div>
  )
}

function CommunityCard({ compact = false }) {
  return (
    <div className={`bg-white text-[#1d1d1f] rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,.14)] text-center ${compact ? 'p-5' : 'p-6 sm:p-8'}`}>
      <div className="text-[12px] tracking-[0.14em] uppercase font-semibold text-[#0071e3]">报名交流 · 企业微信群</div>
      <h3 className={`${compact ? 'text-[20px]' : 'text-[25px]'} font-bold mt-2`}>一起拆，更有伴</h3>
      <p className="text-[13px] text-[#6e6e73] mt-2">心光AI FDE群 · 拆AI讨论</p>
      <div className={`${compact ? 'mt-4' : 'mt-6'} mx-auto w-fit rounded-[22px] border border-black/[.08] p-3 bg-white`}>
        <img
          src="/images/wecom-group-qr.png"
          alt="企业微信扫码进入拆AI交流群"
          className={`${compact ? 'w-[144px] h-[144px]' : 'w-[220px] h-[220px] sm:w-[248px] sm:h-[248px]'} object-contain rounded-[14px]`}
          loading={compact ? 'eager' : 'lazy'}
        />
      </div>
      <p className="text-[12px] leading-relaxed text-[#86868b] mt-4">企业微信扫码进群<br />报名咨询、课程准备、作业交流，都可以进来聊</p>
    </div>
  )
}

function ModuleSection({ module, index }) {
  const dark = index % 2 === 1
  return (
    <section id={`module-${module.no}`} className={`px-4 py-16 sm:py-20 ${dark ? 'bg-[#f5f5f7]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="w-11 h-11 rounded-2xl bg-[#1d1d1f] text-white flex items-center justify-center text-[14px] font-bold">{module.no}</span>
            <span className="px-3 py-1.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[12px] font-semibold">{module.weekend} · 1 个整天</span>
            <span className="text-[13px] font-semibold text-[#6e6e73]">{module.name}</span>
          </div>
          <h2 className="text-[30px] sm:text-[40px] leading-tight font-bold tracking-tight max-w-4xl">{module.headline}</h2>
          <p className="mt-5 max-w-4xl text-[15px] sm:text-[16px] leading-relaxed text-[#6e6e73]">{module.intro}</p>
          <Link to={`/workshops/camp/${module.manualId}`} className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-[#0071e3] text-white text-[13px] font-bold hover:bg-[#0077ed] transition-colors">
            打开本模块自学手册 <span>→</span>
          </Link>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {module.lessons.map((lesson) => (
            <div key={lesson.title} className={`rounded-[24px] p-6 sm:p-7 border border-black/[.06] ${dark ? 'bg-white' : 'bg-[#f5f5f7]'}`}>
              <div className="text-[12px] font-semibold text-[#0071e3]">{lesson.tool}</div>
              <h3 className="text-[20px] font-bold leading-snug mt-2">{lesson.title}</h3>
              <p className="text-[14px] leading-relaxed text-[#6e6e73] mt-3">{lesson.desc}</p>
              <ul className="mt-5 space-y-2.5">
                {lesson.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[13px] leading-relaxed text-[#424245]">
                    <span className="text-[#0071e3] font-bold shrink-0">✓</span><span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[24px] bg-[#1d1d1f] text-white p-6 sm:p-7">
            <h3 className="text-[18px] font-bold">当堂交付，不只听懂</h3>
            <ul className="mt-5 space-y-3">
              {module.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-[13px] leading-relaxed text-white/75"><span className="text-[#64d2ff] shrink-0">✓</span><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <div className={`rounded-[24px] p-6 sm:p-7 border border-black/[.06] ${dark ? 'bg-white' : 'bg-[#f5f5f7]'}`}>
            <h3 className="text-[18px] font-bold">拆为己用，落到你的日常</h3>
            <ul className="mt-5 space-y-3">
              {module.applications.map((item) => (
                <li key={item} className="text-[13px] leading-relaxed text-[#424245] border-b border-black/[.06] last:border-0 pb-3 last:pb-0">{item}</li>
              ))}
            </ul>
            {module.resources.length > 0 && (
              <div className="mt-5 pt-4 border-t border-black/[.08]">
                <div className="text-[11px] font-semibold tracking-wide text-[#86868b] mb-3">往期内容预习 / 复习</div>
                {module.resources.map((resource) => (
                  <a key={resource.href + resource.name} href={resource.href} target="_blank" rel="noreferrer" className="block text-[12px] leading-relaxed text-[#0071e3] hover:underline mb-2 last:mb-0">{resource.name} →</a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function TrainingCamp() {
  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      <nav className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <Link to="/workshops" className="text-[13px] text-[#6e6e73] hover:text-[#0071e3]">← 返回拆工坊</Link>
        <a href="#signup" className="text-[13px] font-semibold text-[#0071e3]">扫码报名 →</a>
      </nav>

      <header className="bg-[#f5f5f7] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-16 sm:pt-16 sm:pb-20 grid gap-12 lg:grid-cols-[1fr_390px] items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[12px] font-semibold tracking-wide">
              12·19 开营 · 四个整天 · 四期联报
            </div>
            <h1 className="mt-6 text-[42px] sm:text-[62px] font-bold tracking-[-0.035em] leading-[1.08]">
              拆AI训练营<br /><span className="text-[#0071e3]">把 AI 拆为己用</span>
            </h1>
            <p className="mt-6 text-[19px] sm:text-[24px] font-semibold leading-snug max-w-2xl">用四个周末，做出自己的工作、学习与生活 AI 系统。</p>
            <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-[#6e6e73] max-w-2xl">
              每周一个整天，从数字员工、内容工厂、自动运营到综合共创。不是只听四场课，也不是只学分舵运营；是把前几次工作坊已经验证的方法，逐项拆到你自己的真实场景里。
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {['四个周末，不连续赶课', '每周 1 个整天', '线下限 12 席', '线上可参与'].map((item) => (
                <span key={item} className="px-3.5 py-2 rounded-full bg-white border border-black/[.06] text-[12px] font-medium text-[#424245]">{item}</span>
              ))}
            </div>
            <div className="mt-8 rounded-[20px] bg-white border border-black/[.08] shadow-[0_10px_40px_rgba(0,0,0,.05)] p-4 sm:p-5">
              <div className="flex items-baseline justify-between mb-3">
                <div className="text-[12px] tracking-[0.18em] uppercase font-bold text-[#0071e3]">课表 · 四个整天</div>
                <div className="text-[11px] text-[#86868b]">12 月 19 日开营 · 2027 年 1 月 3 日收官</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { d: '12.19', w: '周六', m: '一模块 · 数字员工' },
                  { d: '12.26', w: '周六', m: '二模块 · 内容工厂' },
                  { d: '1.02', w: '周六', m: '三模块 · 自动运营' },
                  { d: '1.03', w: '周日', m: '四模块 · 综合共创' },
                ].map((s) => (
                  <a key={s.d} href={`#module-${s.d === '12.19' ? '01' : s.d === '12.26' ? '02' : s.d === '1.02' ? '03' : '04'}`} className="rounded-[14px] bg-[#f5f5f7] px-3.5 py-3 hover:bg-[#0071e3]/[.06] transition-colors">
                    <div className="text-[20px] font-bold tracking-tight text-[#1d1d1f]">{s.d}<span className="ml-1.5 text-[11px] font-semibold text-[#86868b]">{s.w}</span></div>
                    <div className="mt-1 text-[12px] font-semibold text-[#424245] leading-snug">{s.m}</div>
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#signup" className="px-6 py-3.5 rounded-full bg-[#0071e3] text-white text-[14px] font-semibold hover:bg-[#0077ed]">拆约小程序扫码报名</a>
              <a href="#curriculum" className="px-6 py-3.5 rounded-full bg-white border border-black/[.08] text-[14px] font-semibold hover:border-[#0071e3]">查看完整课纲</a>
            </div>
          </motion.div>
          <motion.div id="signup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="scroll-mt-6">
            <SignupCard eager />
            <div className="mt-4"><CommunityCard compact /></div>
          </motion.div>
        </div>
      </header>

      <section className="px-4 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Learn by doing" title="不是学更多工具，而是把自己的事做成" desc="四次课程都从真实任务出发。你带来的资料、问题和生活经验，就是课堂要拆解的对象。" />
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { no: '工作', title: '把重复劳动交给 AI', desc: '资料搜集、会议纪要、文档起草、周报、项目流程与客户服务，让时间回到需要判断和创造的部分。', items: ['个人数字员工', '项目知识与经验库', '可复用的工作流程'] },
              { no: '学习', title: '把知识变成自己的能力', desc: '不只让 AI 总结一本书、一门课，而是通过 RIA 拆出理解、关联经验，再形成可以执行的行动。', items: ['个人学习外脑', '拆书与拆课方法', '长期生长的知识库'] },
              { no: '生活', title: '把经验与热爱留下来', desc: '整理家庭资料、研究兴趣、组织活动、记录生活，让 AI 帮你减少琐碎，让个人经验可以查找和复用。', items: ['生活资料管理', '兴趣项目助手', '活动与社群自动化'] },
            ].map((item) => (
              <div key={item.no} className="rounded-[24px] bg-[#f5f5f7] p-7">
                <div className="text-[12px] font-semibold text-[#0071e3]">{item.no}</div>
                <h3 className="text-[21px] font-bold mt-2">{item.title}</h3>
                <p className="text-[14px] leading-relaxed text-[#6e6e73] mt-3">{item.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.items.map((tag) => <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-white text-[#424245]">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="curriculum" className="bg-[#1d1d1f] text-white px-4 py-16 sm:py-20 scroll-mt-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-10">
            <div className="text-[12px] tracking-[0.2em] uppercase font-semibold text-[#64d2ff] mb-3">Four weekends</div>
            <h2 className="text-[30px] sm:text-[38px] font-bold tracking-tight">四个周末，每周完成一个关键系统</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/60">不是连续四天填鸭。每周集中交付一个整天，周间在真实工作与生活里边用边改，下一周继续叠加。</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module) => (
              <a key={module.no} href={`#module-${module.no}`} className="rounded-[22px] border border-white/10 bg-white/[.04] p-6 hover:bg-white/[.08] transition-colors">
                <div className="text-[12px] text-[#64d2ff] font-semibold">{module.weekend}</div>
                <div className="text-[34px] font-bold mt-5 text-white/25">{module.no}</div>
                <h3 className="text-[21px] font-bold mt-2">{module.name}</h3>
                <p className="text-[13px] leading-relaxed text-white/55 mt-3">{module.headline}</p>
                <div className="text-[12px] text-[#64d2ff] mt-5">查看本周末课纲 →</div>
              </a>
            ))}
          </div>
          <div className="mt-8 grid sm:grid-cols-4 gap-4 text-center">
            {['上午：拆方法、看示范', '下午：做系统、跑任务', '当堂：交成果、做验收', '周间：用一周、带问题回来'].map((step, i) => (
              <div key={step} className="rounded-2xl bg-white/[.06] px-4 py-4 text-[12px] text-white/70"><span className="text-[#64d2ff] font-bold mr-2">0{i + 1}</span>{step}</div>
            ))}
          </div>
        </div>
      </section>

      {modules.map((module, index) => <ModuleSection key={module.no} module={module} index={index} />)}

      <section className="px-4 py-16 sm:py-20 bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="What you take away" title="四个周末之后，带走一套能继续用的系统" desc="每一项都有看得见的成果和检查点，不以「听完了」作为完成标准。" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { no: '01', title: '两个数字员工', desc: '一个处理云电脑里的具体任务，一个在云端常驻、随时接收你的指令。' },
              { no: '02', title: '两类个人知识资产', desc: 'ima 知识库与 Obsidian 上下文库，让资料、经验和规则都能被 AI 调用。' },
              { no: '03', title: '一套自动化图纸', desc: '至少跑通一条真实流程，并带走内容、网站、社群三类流程的复用方法。' },
              { no: '04', title: '一个完整 AI 作品', desc: '围绕自己的工作、学习或生活问题，完成路演、说明和 30 天迭代计划。' },
            ].map((item) => (
              <div key={item.no} className="bg-white rounded-[24px] p-6 border border-black/[.05]">
                <div className="text-[12px] font-bold text-[#0071e3]">{item.no}</div>
                <h3 className="text-[19px] font-bold mt-3">{item.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#6e6e73] mt-3">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[24px] bg-white p-6 sm:p-8 border border-black/[.05]">
            <h3 className="text-[19px] font-bold">往期工作坊资料也继续开放</h3>
            <p className="text-[13px] text-[#6e6e73] mt-2 leading-relaxed">报名前可先看手册判断节奏；开营后可按步骤复习。手册里有详细操作、检查点和排障表。</p>
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { name: '第一期 · 个人 AI 知识库', href: '/workshop/classic/first/guide.html' },
                { name: '第二期 · 个人同款网站', href: '/workshop/m2-1/guide.html' },
                { name: '第三期 · 7×24 数字员工', href: '/workshop/m3-1/guide.html' },
                { name: '第四期 · Obsidian 外脑', href: '/workshop/software/obsidian/guide.html' },
              ].map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="rounded-2xl bg-[#f5f5f7] p-4 text-[13px] font-semibold text-[#424245] hover:text-[#0071e3]">{item.name}<span className="block text-[11px] font-normal text-[#0071e3] mt-2">打开原手册 →</span></a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading eyebrow="Before camp" title="开营前，准备这四样就够" desc="不要求先学编程，也不需要提前买齐所有工具。具体账号清单会随各周末课前通知说明。" />
            <div className="space-y-4">
              {preparation.map((item, i) => (
                <div key={item.title} className="flex gap-4 rounded-2xl bg-[#f5f5f7] p-5">
                  <span className="w-8 h-8 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center text-[12px] font-bold shrink-0">{i + 1}</span>
                  <div><h3 className="text-[16px] font-bold">{item.title}</h3><p className="text-[13px] leading-relaxed text-[#6e6e73] mt-1.5">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[12px] tracking-[0.2em] uppercase font-semibold text-[#0071e3] mb-3">Who is it for</div>
            <h2 className="text-[30px] sm:text-[38px] font-bold tracking-tight">适合想把 AI 真正用起来的人</h2>
            <div className="mt-8 rounded-[24px] border border-black/[.07] p-6 sm:p-7">
              <ul className="space-y-4">
                {[
                  '想用 AI 提升本职工作效率，但不知道从哪里开始的职场人',
                  '想沉淀个人方法、作品与服务的专业人士、顾问、教练和自由职业者',
                  '想拆书、拆课、建立学习外脑的学习者与内容创作者',
                  '想减少活动、社群和团队协作里重复劳动的组织者',
                  '玩过 AI 对话，却还没有做出一个能长期使用成果的人',
                ].map((item) => <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-[#424245]"><span className="text-[#0071e3] font-bold">✓</span><span>{item}</span></li>)}
              </ul>
            </div>
            <div className="mt-5 rounded-[24px] bg-[#fff8e6] p-6 text-[13px] leading-relaxed text-[#6e5423]">
              如果你只想听概念、不愿现场动手，或者期待 AI 在无人检查的情况下替你做所有决定，这个训练营不适合。我们坚持「AI 做重复步骤，人做判断与最终确认」。
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20 bg-[#f5f5f7]">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="FAQ" title="报名前，你可能还想问" />
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl bg-white border border-black/[.05] px-6 py-5 open:shadow-sm">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-[15px] font-semibold">
                  <span>{faq.q}</span><span className="text-[#0071e3] text-[20px] font-normal group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[13px] sm:text-[14px] leading-relaxed text-[#6e6e73]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1d1d1f] text-white px-4 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1fr_340px_340px] items-center">
          <div>
            <div className="text-[12px] tracking-[0.2em] uppercase font-semibold text-[#64d2ff]">December cohort</div>
            <h2 className="text-[34px] sm:text-[46px] font-bold tracking-tight leading-tight mt-4">四个周末，把 AI 真正拆进你的工作与生活。</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/60 max-w-xl">12 月 19 日开营，四期联报（12·19 / 12·26 / 1·2 / 1·3）。线下限 12 席，线上可参与。微信扫码进入拆约小程序查看地点、费用与报名状态。</p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {['第 1 个周末 · 数字员工', '第 2 个周末 · 内容工厂', '第 3 个周末 · 自动运营', '第 4 个周末 · 综合共创'].map((item) => <span key={item} className="px-3 py-1.5 rounded-full bg-white/[.08] text-[12px] text-white/70">{item}</span>)}
            </div>
            <p className="mt-8 text-[12px] text-white/40">报名后如需确认个人场景与设备准备，可微信联系 ikoning365。</p>
          </div>
          <SignupCard />
          <CommunityCard />
        </div>
      </section>

      <footer className="bg-[#1d1d1f] border-t border-white/10 px-4 py-7">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[12px] text-white/45">
          <span>小蛮腰 · 拆AI训练营 · 拆为己用</span>
          <Link to="/workshops" className="text-[#64d2ff] hover:underline">返回拆工坊，查看全部工作坊 →</Link>
        </div>
      </footer>
    </div>
  )
}
