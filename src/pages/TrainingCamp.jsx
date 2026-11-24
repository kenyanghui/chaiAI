import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const modules = [
  {
    no: '01',
    day: '第 1 天',
    name: '数字员工',
    headline: '先让 AI 上岗，再组建你的数字军团',
    outcome: '从单个 AI 助手到云端协作，让数字员工真正接管可重复的工作。',
    groups: [
      {
        items: [
          { tool: 'WorkBuddy + 云电脑', title: '拆AI工作坊，让 AI 操作培训更丝滑' },
          { tool: '腾讯云 + Hermes / OpenClaw', title: 'AI拆书家，指挥你的数字军团' },
        ],
      },
    ],
  },
  {
    no: '02',
    day: '第 2 天',
    name: '内容工厂',
    headline: '把散落的经验，变成持续生产的内容资产',
    outcome: '打通知识库、RIA 方法与个人外脑，让知识可沉淀、可调用、可复用。',
    groups: [
      {
        items: [
          { tool: '知识库 ima / Copilot', title: '小蛮腰分舵 ima 知识号，让知识不再散乱' },
          { tool: '拆AI核心方法 · R 爬虫 / I 蒸馏 / A 应用', title: '拆经典 / 拆指南 / 拆技能 / 拆专家，让 AI 助力拆为己用' },
          { tool: '笔记 Obsidian / Copilot', title: 'AI拆书家外脑，让 AI 比你更懂你' },
        ],
      },
    ],
  },
  {
    no: '03',
    day: '第 3 天',
    name: '自动运营',
    headline: '把内容、网站和社群，接成自动运转的系统',
    outcome: '围绕分舵真实运营场景，搭建三条互相衔接的自动化工作流。',
    groups: [
      {
        name: '内容自动化工作流',
        items: [
          { tool: '微信公众号自动化工作流', title: '分舵公众号' },
          { tool: '短视频运营自动化工作流', title: '拆书家一键转发' },
        ],
      },
      {
        name: '网站自动运营工作流',
        items: [
          { tool: '建站 / 课件 / 邮箱 / 问卷 / 评测', title: '拆AI网站，分舵运营基地' },
          { tool: '网站服务流程工作台', title: '拆认证 · AI拆书家认证，三级拆书家走出去' },
        ],
      },
      {
        name: '社群自动运营工作流',
        items: [
          { tool: 'AI共拆小应用', title: '拆搭子网页 + 拆约小程序，AI 让邀约不再难' },
          { tool: '微信群运营机器人', title: '企业微信群机器人，没有 AI 味的 AI' },
        ],
      },
    ],
  },
  {
    no: '04',
    day: '第 4 天',
    name: '综合共创',
    headline: '降龙第十八掌',
    outcome: '把前三天的数字员工、内容工厂与自动运营连成一体，共创一套能带回分舵继续运转的成果。',
    groups: [
      {
        items: [
          { tool: '综合共创 · 成果串联', title: '从单点工具到完整系统，完成你的分舵 AI 运营闭环' },
          { tool: '现场演练 · 共创路演', title: '带着真实问题来，带着可演示、可复用的方案走' },
        ],
      },
    ],
  },
]

const facts = [
  { value: '4 个模块', label: '每个模块一个整天' },
  { value: '12 席', label: '线下小班，满席即止' },
  { value: '线上可参与', label: '异地也能同步共创' },
  { value: '四期联报', label: '完整走完四天闭环' },
]

function WechatButton({ dark = false }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText('ikoning365')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button type="button" onClick={copy} className={dark ? 'btn-primary' : 'btn-secondary'}>
      {copied ? '已复制微信号' : '咨询四期联报 →'}
    </button>
  )
}

export default function TrainingCamp() {
  return (
    <div className="hero-wash">
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="eyebrow mb-4">12 月开营 · 拆书帮广州小蛮腰分舵</div>
          <h1 className="headline text-[42px] md:text-[62px] mb-5">
            拆AI<span className="gradient-text">训练营</span>
          </h1>
          <p className="text-[20px] md:text-[25px] font-semibold text-[#1d1d1f] tracking-tight mb-4">
            四天，把分舵运营交给数字员工
          </p>
          <p className="text-[16px] md:text-[17px] leading-relaxed text-[#6e6e73] max-w-3xl mx-auto mb-8">
            数字员工、内容工厂、自动运营、综合共创——不是四门零散工具课，
            而是一条从 AI 上岗到系统落地的完整路径。每个模块一个整天，现场做、当场连、最终带走。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="#curriculum" className="btn-primary">查看四天课表 ↓</a>
            <WechatButton />
          </div>
          <div className="mt-4 text-[12.5px] text-[#86868b]">具体开营日期与联报费用，添加微信 ikoning365 确认</div>
        </div>
      </section>

      <section className="px-4 pb-14">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3">
          {facts.map((fact) => (
            <div key={fact.value} className="apple-card p-5 md:p-6 text-center">
              <div className="text-[21px] md:text-[24px] font-bold text-[#1d1d1f] tracking-tight mb-1">{fact.value}</div>
              <div className="text-[12.5px] md:text-[13.5px] text-[#6e6e73]">{fact.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="curriculum" className="px-4 pb-16 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="eyebrow mb-3">四天课程地图</div>
            <h2 className="headline text-[30px] md:text-[38px] mb-3">从会用 AI，到会运营一套 AI 系统</h2>
            <p className="text-[15px] text-[#6e6e73]">每天解决一层问题，第四天把前面所有成果串起来。</p>
          </div>

          <div className="space-y-5">
            {modules.map((module, index) => (
              <motion.article
                key={module.no}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="apple-card overflow-hidden"
              >
                <div className="p-6 md:p-8 border-b border-black/[.06] bg-white/70">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[#0071e3] to-[#00c7be] text-white flex items-center justify-center text-[19px] md:text-[22px] font-bold shadow-lg">
                      {module.no}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[12px] font-semibold text-[#0071e3] tracking-widest mb-1.5">{module.day} · 模块{['一', '二', '三', '四'][index]}</div>
                      <h3 className="text-[25px] md:text-[31px] font-bold text-[#1d1d1f] tracking-tight mb-2">{module.name}</h3>
                      <div className="text-[16px] md:text-[18px] font-semibold text-[#1d1d1f] mb-2">{module.headline}</div>
                      <p className="text-[14px] md:text-[15px] leading-relaxed text-[#6e6e73]">{module.outcome}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-8 space-y-5">
                  {module.groups.map((group, groupIndex) => (
                    <div key={group.name || groupIndex}>
                      {group.name && (
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[13px] font-bold text-[#1d1d1f]">{group.name}</span>
                          <span className="h-px flex-1 bg-black/[.07]" />
                        </div>
                      )}
                      <div className={`grid gap-3 ${group.items.length > 1 ? 'md:grid-cols-2' : ''}`}>
                        {group.items.map((item) => (
                          <div key={item.tool} className="rounded-2xl bg-[#f5f5f7] border border-transparent hover:border-[#0071e3]/20 transition-colors p-5">
                            <div className="text-[12px] md:text-[13px] font-semibold text-[#0071e3] leading-relaxed mb-2">{item.tool}</div>
                            <div className="text-[14.5px] md:text-[15.5px] font-semibold text-[#1d1d1f] leading-relaxed">{item.title}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
          <div className="apple-card p-7 md:p-8">
            <div className="eyebrow mb-3">适合谁</div>
            <h2 className="text-[24px] font-bold text-[#1d1d1f] tracking-tight mb-5">想把 AI 真正用进分舵的人</h2>
            <ul className="space-y-3 text-[14.5px] leading-relaxed text-[#6e6e73]">
              <li className="flex gap-3"><span className="text-[#0071e3]">01</span><span>分舵运营者与拆书家，希望减少内容、活动、社群里的重复劳动</span></li>
              <li className="flex gap-3"><span className="text-[#0071e3]">02</span><span>已经参加过单期工作坊，想把零散成果连接成完整系统</span></li>
              <li className="flex gap-3"><span className="text-[#0071e3]">03</span><span>准备打造个人知识资产与数字团队，愿意连续四天动手共创</span></li>
            </ul>
          </div>
          <div className="apple-card p-7 md:p-8">
            <div className="eyebrow mb-3">参营方式</div>
            <h2 className="text-[24px] font-bold text-[#1d1d1f] tracking-tight mb-5">线下深练，线上同频</h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-[#f5f5f7] p-4">
                <div className="text-[14px] font-bold text-[#1d1d1f] mb-1">线下 · 仅限 12 席</div>
                <div className="text-[13.5px] leading-relaxed text-[#6e6e73]">小班现场演练，适合希望深度实操、面对面共创的伙伴。</div>
              </div>
              <div className="rounded-xl bg-[#f5f5f7] p-4">
                <div className="text-[14px] font-bold text-[#1d1d1f] mb-1">线上 · 同步参与</div>
                <div className="text-[13.5px] leading-relaxed text-[#6e6e73]">异地可参营；为保证系统完整性，统一四期联报，不拆单模块报名。</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto rounded-[28px] bg-[#1d1d1f] text-white px-6 py-10 md:px-12 md:py-12 text-center shadow-2xl">
          <div className="text-[12px] font-semibold tracking-widest text-white/55 mb-3">12 月开营 · 四期联报</div>
          <h2 className="text-[28px] md:text-[38px] font-bold tracking-tight mb-4">把四天，变成分舵长期运转的底气</h2>
          <p className="text-[15px] md:text-[16px] leading-relaxed text-white/65 max-w-2xl mx-auto mb-7">
            线下仅 12 席，线上也可参与。报名、确认排期与联报费用，请联系杨辉老师。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <WechatButton dark />
            <Link to="/workshops" className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-[14px] font-semibold text-white/85 hover:bg-white/10 transition-colors">返回拆AI工作坊</Link>
          </div>
          <div className="mt-5 text-[13px] text-white/50">微信号：ikoning365</div>
        </div>
      </section>
    </div>
  )
}
