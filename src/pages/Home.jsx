import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import workshops, { nextOpen, doneList, voteThemes } from '../data/workshops'

const pains = [
  { q: '收藏了一百篇干货，要用时一篇都找不到', a: '知识没有库，就等于没有。工作坊现场，先把它装进去。' },
  { q: '公众号定了周更，三个月只发了两篇', a: '靠意志力的更新必断。让工作流替你写，你只管按发布。' },
  { q: 'AI 工具收藏了一排，一个都没用起来', a: '工具不在多，在拆。拆透一个，胜过收藏十个。' },
  { q: '看了很多 AI 课程，还是做不出自己的东西', a: '因为课里拆的是别人的案例。这里，拆你自己的。' },
]

const chaifa = [
  { k: '拆什么', d: '拆 AI 软件，拆 AI 本身——只拆 workbuddy 连接器里真实存在的：ima、微信读书、腾讯会议、企查查、飞猪……每一个都是当场拆开、当场接上的真软件。', icon: 'M4 7c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3zm0 5c0 1.66 3.58 3 8 3s8-1.34 8-3m-16 5c0 1.66 3.58 3 8 3s8-1.34 8-3' },
  { k: '怎么拆', d: '沿用拆书帮 RIA 方法论：R 找到软件里对你有用的片段，I 用自己的话重述它，A 规划出你的下一步行动。', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { k: '拆为己用', d: '不是学完就散，是带走你自己的知识库、工作流、阵地和复盘看板。', icon: 'M16 7l-4 4-4-4m8 6l-4 4-4-4' },
]

// 八大模块全景（与导航同序：拆成长→拆经典→拆指南→拆搭子→拆软件→拆技能→拆专家→共拆AI；数字=站内真实资产）
const modules = [
  { k: '拆成长', emoji: '🧭', d: '三级九拆过级路线，33 个官方技能点逐项拆解', stat: '33 个', statLabel: '技能点 · TF1-1~TF3-3', href: '/learning-path', tile: 'bg-indigo-500/10', num: 'text-indigo-600' },
  { k: '拆经典', emoji: '📖', d: '2255 本致用经典热拆库，1713 本已有拆页', stat: '1713 本', statLabel: '已有拆页 · 全库 2255 本', href: '/hot', tile: 'bg-rose-500/10', num: 'text-rose-600' },
  { k: '拆指南', emoji: '📚', d: 'RIA 便签法全库共拆，六大兴趣模块连读', stat: '2255 本', statLabel: '19262 页拆页全库', href: 'https://www.aibay.asia/chailive/', tile: 'bg-teal-500/10', num: 'text-teal-600' },
  { k: '拆搭子', emoji: '🤝', d: '5473 位拆书家名录，按城市/标签匹配搭子', stat: '5473 人', statLabel: '83 分舵 · 7 种合作模式', href: '/chaibuddy', tile: 'bg-amber-500/10', num: 'text-amber-600' },
  { k: '拆软件', emoji: '🖥️', d: '工作坊当场拆开真 AI 软件，接回你的产线', stat: '11 期', statLabel: '真实软件 · 场场有产出', href: '/workshops', tile: 'bg-sky-500/10', num: 'text-sky-600' },
  { k: '拆技能', emoji: '⚡', d: '每个技能拆成便签+信息图+可下载 Skill', stat: '210 个', statLabel: '技能拆解 · 全部可下载', href: '/skills', tile: 'bg-violet-500/10', num: 'text-violet-600' },
  { k: '拆专家', emoji: '🧠', d: '思想家蒸馏成可召唤的领域 AI 专家团', stat: '8 套', statLabel: '思想体系 · 6 个专家团', href: '/skill-fusion', tile: 'bg-fuchsia-500/10', num: 'text-fuchsia-600' },
  { k: '共拆AI', emoji: '🚀', d: '六条合作线全部开放，带着你的领域加入', stat: '6 条线', statLabel: '开源共建 · 挑一条进', href: '/coai', tile: 'bg-emerald-500/10', num: 'text-emerald-600' },
]


// 六大模块课表（2026-11 改版；与 /workshop/ 目录页同源，live=已上线）
const sixModules = [
  {
    no: '模块一', k: 'AI 创作', live: 3,
    sub: '自动化内容流水线：从素材到发布，从阅读数据再流回选题——让内容自己转圈。',
    lects: [
      { no: '1.1', t: '微信公众号内容流水线', href: 'classic/first/', live: true },
      { no: '1.2', t: '运营数据回流', href: 'm1-2/', live: false },
      { no: '1.3', t: '拆软件 · Obsidian', href: 'software/obsidian/', live: true },
      { no: '1.4', t: '短视频自动创作与发布', href: 'm1-4/', live: true },
    ],
  },
  {
    no: '模块二', k: 'AI 建站', live: 2,
    sub: '数字资产自动运营：给自己的名字和作品安个家，再让家自己会接客。',
    lects: [
      { no: '2.1', t: '给自己的数字资产安个家', href: 'm2-1/', live: true },
      { no: '2.2', t: 'AI 驱动的活动运营', href: '03/', live: true },
      { no: '2.3', t: '腾讯云配置与域名上线', href: 'm2-3/', live: false },
    ],
  },
  {
    no: '模块三', k: 'AI 装备', live: 0,
    sub: '云服务器，7×24 数字员工军火库：让自动化不依赖你开不开机。',
    lects: [
      { no: '3.1', t: '云服务器构建数字助理', href: 'm3-1/', live: false },
      { no: '3.2', t: '7×24 值守自动化', href: 'm3-2/', live: false },
    ],
  },
  {
    no: '模块四', k: 'AI 手机', live: 1,
    sub: '掌握你的数字员工：AI 工作台 APP，把产线装进口袋。',
    lects: [
      { no: '4.1', t: '让 AI 帮我打电话', href: 'm4-1/', live: false },
      { no: '4.2', t: '用手机做新媒体获客', href: 'm4-2/', live: false },
      { no: '4.3', t: '用手机做 AI 搜索 SEO', href: 'm4-3/', live: false },
      { no: '4.4', t: '定制自己的技能工作流', href: 'm4-4/', live: false },
      { no: '4.5', t: '定制我的 AI 工作台与手机', href: 'm4-5/', live: true },
    ],
  },
  {
    no: '模块五', k: 'AI 编程', live: 1,
    sub: '创造自己的 AI 世界：玄龙 Loong 体系，从用工具到造工具。',
    lects: [
      { no: '5.1', t: '构建高效 AI 编程系统', href: 'm5-1/', live: true },
      { no: '5.2', t: '自进化的 AI 编程体系', href: 'm5-2/', live: false },
      { no: '5.3', t: '上矩阵：多智能体协作', href: 'm5-3/', live: false },
    ],
  },
  {
    no: '模块六', k: 'AI 投资', live: 3,
    sub: '建立个人投资系统：盯盘、投研、量化、复盘，四讲各管一段。',
    lects: [
      { no: '6.1', t: 'AI 盯盘', href: 'm6-1/', live: true },
      { no: '6.2', t: 'AI 投研', href: 'm6-2/', live: true },
      { no: '6.3', t: 'AI 量化', href: 'm6-3/', live: true },
      { no: '6.4', t: 'AI 复盘', href: 'm6-4/', live: false },
    ],
  },
]

export default function Home() {
  const nx = nextOpen()
  const done = doneList()
  // spotlight 焦点：优先下一场报名中的；全交付完则落最新已交付场（材料回看）；再退首场
  const first = nx || done[done.length - 1] || workshops[0]

  return (
    <div className="hero-wash">
      {/* ==================== Hero ==================== */}
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="eyebrow mb-4">拆书帮广州小蛮腰分舵 AI拆书工作坊阵地</div>
            <h1 className="headline text-[44px] md:text-[64px] mb-6">
              别再学 AI 了，<br />
              <span className="gradient-text">把它拆开，为己所用。</span>
            </h1>
            <p className="text-[17px] md:text-[19px] leading-relaxed text-[#6e6e73] max-w-2xl mx-auto mb-9">
              这里不教你收藏工具。每一期工作坊，我们当场拆开一个真实在跑的 AI 软件，
              用拆书帮的 RIA 方法论拆为己用——3 小时，带走一件你亲手做出来的东西。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={first.link} className="btn-primary">
                {nx ? '报名工作坊 →' : '回看课程材料 →'}
              </a>
              <a href="/workshop/" className="btn-secondary">
                六大模块完整课表 →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== 学习者痛点 ==================== */}
      <section className="py-20 px-4 bg-white border-y border-black/[.05]">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3 text-center">从你出发</div>
          <h2 className="headline text-[30px] md:text-[38px] text-center mb-12">这些卡点，是不是很熟悉？</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pains.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="apple-card p-6"
              >
                <div className="text-[16px] font-semibold text-[#1d1d1f] mb-2.5">“{p.q}”</div>
                <div className="text-[14px] leading-relaxed text-[#6e6e73]">{p.a}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 拆法 RIA 重释 ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3 text-center">我们的拆法</div>
          <h2 className="headline text-[30px] md:text-[38px] text-center mb-4">拆的是 AI，拆为己用</h2>
          <p className="text-center text-[#6e6e73] text-[15px] mb-12 max-w-2xl mx-auto">
            把 AI 软件拆成你的生产力。
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {chaifa.map((c, i) => (
              <motion.div
                key={c.k}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="apple-card p-7 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-[#0071e3]/[.08] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#0071e3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                  </svg>
                </div>
                <div className="text-[18px] font-bold text-[#1d1d1f] mb-2.5">{c.k}</div>
                <div className="text-[13.5px] leading-relaxed text-[#6e6e73]">{c.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 八大模块全景 ==================== */}
      <section className="py-24 px-4 bg-[#f5f5f7] border-y border-black/[.05]">
        <div className="max-w-6xl mx-auto">
          <div className="eyebrow mb-3 text-center">站点全景 · 一图看懂</div>
          <h2 className="headline text-[30px] md:text-[40px] text-center mb-4">
            八个模块，一条<span className="gradient-text">「拆」的进阶线</span>
          </h2>
          <p className="text-center text-[#6e6e73] text-[15px] mb-14 max-w-2xl mx-auto">
            从三级九拆的过级路，到全库共拆、找到搭子、拆开真软件、长出技能、召唤专家——最后加入共建。
            每一站都有真实数字在跑，不摆概念。
          </p>
          <div className="relative">
            <div className="hidden lg:block absolute top-[46px] left-[12%] right-[12%] h-[2px] rounded-full bg-gradient-to-r from-indigo-400/50 via-teal-400/50 to-fuchsia-400/50" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {modules.map((m, i) => (
                <motion.div
                  key={m.k}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                >
                  <a href={m.href} className="group block h-full apple-card p-5 !shadow-sm">
                    <div className="flex lg:justify-center mb-4">
                      <div className={`relative w-12 h-12 rounded-2xl ${m.tile} flex items-center justify-center text-2xl`}>
                        {m.emoji}
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-black/10 text-[9px] font-bold text-[#86868b] flex items-center justify-center shadow-sm">{i + 1}</span>
                      </div>
                    </div>
                    <div className="text-[17px] font-black text-[#1d1d1f] mb-1 lg:text-center">{m.k}</div>
                    <div className="text-[11.5px] leading-snug text-[#6e6e73] mb-4 lg:text-center">{m.d}</div>
                    <div className="lg:text-center">
                      <div className={`text-[22px] font-black leading-none ${m.num}`}>{m.stat}</div>
                      <div className="text-[10px] text-[#86868b] mt-1.5 tracking-wide">{m.statLabel}</div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-10 text-center">
            <a href="/coai" className="text-[13px] font-semibold text-[#0071e3] hover:text-[#1d1d1f] transition-colors">
              六条合作线怎么选 → 看共拆AI 专页
            </a>
          </div>
        </div>
      </section>

      {/* ==================== 六大模块课表 ==================== */}
      <section className="py-24 px-4 bg-[#f5f5f7] border-y border-black/[.05]">
        <div className="max-w-6xl mx-auto">
          <div className="eyebrow mb-3 text-center">课程体系 · 全景课表</div>
          <h2 className="headline text-[30px] md:text-[40px] text-center mb-4">
            六大模块，<span className="gradient-text">21 讲把 AI 用起来</span>
          </h2>
          <p className="text-center text-[#6e6e73] text-[15px] mb-14 max-w-2xl mx-auto">
            创作、建站、装备、手机、编程、投资。每一讲都走「开通 → 连接 → 自动化」三步，
            3 小时现场做出来、带得走、用得上——不摆概念，只认交付。
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sixModules.map((m, i) => (
              <motion.div
                key={m.no}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="apple-card p-6 flex flex-col"
              >
                <div className="flex items-baseline justify-between mb-1.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] font-bold text-[#0071e3] tracking-wide">{m.no}</span>
                    <h3 className="text-[18px] font-bold text-[#1d1d1f]">{m.k}</h3>
                  </div>
                  <span className="text-[11px] text-[#86868b] font-semibold">{m.live > 0 ? m.live + ' 讲已上线' : '打磨中'}</span>
                </div>
                <p className="text-[12.5px] text-[#6e6e73] leading-relaxed mb-4">{m.sub}</p>
                <div className="flex flex-col gap-1 mt-auto">
                  {m.lects.map(l => (
                    <a
                      key={l.no}
                      href={'/workshop/' + l.href}
                      className="group flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 hover:bg-black/[.04] transition-colors"
                    >
                      <span className="text-[13px] text-[#1d1d1f] truncate">
                        <span className="text-[#86868b] font-semibold mr-1.5">{l.no}</span>
                        {l.t}
                      </span>
                      {l.live
                        ? <span className="shrink-0 text-[10.5px] font-bold text-emerald-600">已上线</span>
                        : <span className="shrink-0 text-[10.5px] font-semibold text-[#86868b]">即将上线</span>}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/workshop/" className="btn-primary">进入完整课表 →</a>
            <Link to="/workshops" className="btn-secondary">{voteThemes.length} 个候选主题 · 点「我支持」定排期 →</Link>
          </div>
        </div>
      </section>

      {/* ==================== 三个带走 ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3 text-center">验收标准</div>
          <h2 className="headline text-[30px] md:text-[38px] text-center mb-12">每期只认一个标准：你带走了什么</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ['做出来', '不是听完，是当场做出来。每期 3 小时，一半时间你在动手，讲师和助教巡场兜底。'],
              ['带得走', '产出全部落在你自己的账号里：你的知识库、你的工作流、你的网站、你的看板。'],
              ['用得上', '每期配 30 天行动计划和复盘卡。第 2 期开课时，先验收上一期你用得怎么样。'],
            ].map(([t, d], i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className="text-[34px] font-bold gradient-text mb-3">0{i + 1}</div>
                <div className="text-[18px] font-bold text-[#1d1d1f] mb-2">{t}</div>
                <div className="text-[13.5px] leading-relaxed text-[#6e6e73]">{d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-20 px-4 bg-white border-t border-black/[.05]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="headline text-[28px] md:text-[36px] mb-4">先上知识库，开课前就把方法装进口袋。</h2>
          <p className="text-[#6e6e73] text-[15px] leading-relaxed mb-6">
            这里是【小蛮腰AI拆书帮】的线上知识库：六期工作坊的全部课件与材料、25 本经典共拆电子书、TF1–TF3 拆书法全套指导，还有广州小蛮腰、北京宇宙中心两个分舵 500+ 期活动的真实拆书实录。AI 帮你把书拆成能用的能力——扫码订阅，随时搜、随时问。
          </p>
          <div className="flex flex-col items-center gap-3">
            <img src="/images/ima-knowledge-qr.png" alt="【小蛮腰AI拆书帮】知识库二维码" className="w-[200px] rounded-2xl border border-black/[.06] shadow-[0_8px_28px_rgba(0,0,0,.10)]" />
            <p className="text-[14px] text-[#6e6e73] font-semibold">微信或 ima 扫码，订阅【小蛮腰AI拆书帮】知识库</p>
            <a href={nx ? first.link : '/workshops'} className="text-[13px] text-[#0071e3] hover:underline">{nx ? `了解第 ${parseInt(first.no, 10)} 期课程 →` : '看全部课程与材料回看 →'}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
