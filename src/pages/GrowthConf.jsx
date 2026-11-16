import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// 拆书帮 2026 广州场 · 成长大会《一年耕耘，一起丰收》
// 配色：墨黑 + 暖橙 + 一点木棉红（避免大红大金年会感；不点燃，接住）
const CONF_DATE = new Date('2026-12-12T09:00:00+08:00')

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
})

const facts = [
  { k: '时间', v: '2026年12月12日（周六）9:00 - 17:00' },
  { k: '地点', v: '广州市天河区天慧路10、12、14号\n粤港澳大湾区（广东）创新创业孵化基地' },
  { k: '主办', v: '拆书帮广州小蛮腰分舵' },
  { k: '协办', v: '国际人工智能产业联盟\n粤港澳大湾区（广东）创新创业孵化基地' },
  { k: '规模', v: '到场 50 人 · 报名限 65 人' },
  { k: '形式', v: '体验式大会：70% 参与 + 30% 讲授' },
]

const audiences = [
  { t: '老伙伴', d: '这一年还在场的你，值得被看见。' },
  { t: '从没参加过的新人', d: '不需要先懂拆书帮——只要"这一年过得不太明白"就够了。' },
  { t: '离开过的回归者', d: '你需要的只是一个不尴尬的理由。年末，恰好是最容易给理由的时候。' },
  { t: '外地专程者', d: '一落地就有归属：能量签到就接上你，结对圆桌不让你落单。' },
]

const storyline = [
  { n: '①', t: '体验', q: '拆书到底是什么感觉', a: '开场 18 分钟全员拆书' },
  { n: '②', t: '认知', q: '我为什么要留在这个组织', a: '三个故事 + 回归者讲述' },
  { n: '③', t: '示范', q: '高手高在哪', a: '成长地图 + 主题分享' },
  { n: '④', t: '盘点', q: '这一年我攒下了什么', a: '还没熟的果子 + 年度盘点工作坊' },
  { n: '⑤', t: '承诺', q: '明年我要做什么', a: '跨年契约 + 明年见' },
]

const mainAgenda = [
  ['08:30-09:00', '能量签到', '写能量值（1-10）贴墙；抽同频卡；投「还没熟的果子」；贴回家墙'],
  ['09:00-09:10', '开场：你走过来了', '不说宏大叙事，先说「这一年你走完了，先给自己一点掌声」'],
  ['09:10-09:28', '【体验】全员现场拆书', '三级拆书家带全场做一次完整 RIA，新人当场就会'],
  ['09:28-09:50', '【认知】拆书帮是什么 + 回归者讲述', '3 个普通人故事（各 5′）+ 1 位「离开又回来」的伙伴（7′）'],
  ['09:50-10:35', '【示范】从 1-1 到 3-3：成长地图', '过级手册、技能卡、真实过级录像片段'],
  ['10:35-10:55', '茶歇 + 分舵市集 + 师徒结对墙', '集章换徽章；卡在某级的人现场挂牌找师父'],
  ['10:55-11:40', '【分享】拆书 × 真实人生', '外地嘉宾：只讲案例，不讲理念'],
  ['11:40-12:05', '【盘点】还没熟的果子', '从签到箱抽 3-5 件「还在长的事」，一起拆出条能结果的路'],
  ['12:05-13:20', '午餐 + 自由连接', '发「拼桌地图」按兴趣分组；本地伙伴带外地吃广州味道'],
  ['13:20-13:50', '能量唤醒', '身体动起来 + 上午「我看见了…」反馈 + 充电站开放说明'],
  ['13:50-15:10', '【平行工作坊 3 选 1】', '①年度盘点：把 2026 收进粮仓 ②拆书实战：一段文字到一场课 ③拆书 × 副业/个人品牌'],
  ['15:10-15:25', '茶歇', '—'],
  ['15:25-16:15', '开放空间/世界咖啡 · 共创', '4 个议题，产出建议并现场认领负责人'],
  ['16:15-16:45', '颁奖：表彰坚持与回归', '年度坚持奖 / 年度回归奖 / 年度托举奖 / 幕后奖 / 最长路途 / 最佳新人'],
  ['16:45-17:00', '跨年契约 + 明年见', '写「2027 第一件事」投时间胶囊；把徽章别给身边一个人'],
]

const memories = [
  '开场 12 分钟就被拆了一次——不是听人讲拆书，是自己拆了一次',
  '有人当众说「我离开过，我又回来了」——全场唯一能同时打动老人、新人、流失者的环节',
  '还没熟的果子——你还在长的那件事，被全场一起想办法',
  '颁奖词是别人观察到的你——不是「恭喜获奖」，而是「我注意到你今天…」',
  '徽章不是发的，是别给别人的——收尾的能量传递',
  '广州的胃——午餐的本地味道，本地伙伴带路',
]

const topics = [
  '如何让大湾区拆书帮更有能量',
  '新人如何在 30 天内启动第一次过级',
  '如何让离开的人愿意回来',
  '拆书帮能为职场人 / 家长解决什么真问题',
]

export default function GrowthConf() {
  const days = Math.max(0, Math.ceil((CONF_DATE.getTime() - Date.now()) / 86400000))

  return (
    <div className="hero-wash">
      {/* ==================== Hero ==================== */}
      <section className="pt-36 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="eyebrow mb-4">拆书帮 2026 广州场 · 成长大会</div>
            <h1 className="headline text-[40px] md:text-[58px] mb-5">
              《一年耕耘，<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500">一起丰收</span>》
            </h1>
            <p className="text-[17px] md:text-[19px] leading-relaxed text-[#6e6e73] max-w-2xl mx-auto mb-4">
              这一年，你读过的书、带过的场、熬过和发光的日子，都算数——年末了，我们聚在一起，交流、学习、彼此赋能。
            </p>
            <p className="text-[14px] text-[#86868b] mb-8">
              12 月 12 日，距 2027 只剩 19 天。这不是年会，是一年的收成到了可以清点的时候。
            </p>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-orange-500/20 mb-9">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[14px] font-bold text-orange-600">
                {days > 0 ? `距大会还有 ${days} 天` : '今天，大会见'}
              </span>
              <span className="text-[13px] text-[#86868b]">12 月 12 日（周六）· 广州天河</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#agenda" className="btn-primary !bg-gradient-to-r !from-amber-500 !via-orange-500 !to-rose-500 !shadow-[0_8px_24px_rgba(249,115,22,.35)]">
                看完整议程 ↓
              </a>
              <Link to="/" className="btn-secondary">返回主页</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== 关键信息 ==================== */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
          {facts.map((f, i) => (
            <motion.div key={f.k} {...fadeUp(i * 0.06)} className="apple-card p-6">
              <div className="text-[12px] font-semibold text-orange-600 mb-2 tracking-wide">{f.k}</div>
              <div className="text-[15px] leading-relaxed text-[#1d1d1f] font-medium whitespace-pre-line">{f.v}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==================== 为什么叫「丰收」 ==================== */}
      <section className="py-20 px-4 bg-white border-y border-black/[.05]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="eyebrow mb-3">主题由来</div>
          <h2 className="headline text-[28px] md:text-[36px] mb-6">这一年，果实比想象中多</h2>
          <p className="text-[15px] md:text-[16px] leading-[1.9] text-[#6e6e73] text-left md:text-center">
            拆书帮的一年，是耕耘的一年：每一次共读、每一次过级、每一场带场，都是春天播下的种子。
            到了年末，它们悄悄结成了果子——也许是一项新技能、一群同频的人、一个更稳的自己。
            <b className="text-[#1d1d1f]">丰收不是一个人抱着果子，是把各自的果子摆到同一张桌子上</b>：交流让果子交换，学习让种子更新，赋能让彼此明年长得更旺。
          </p>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.9] text-[#6e6e73] text-left md:text-center">
            年末不是「熬到头了」，是<b className="text-[#1d1d1f]">一年的收成到了可以清点的时候</b>。
            所以大会的底色是丰盛的：不是来看你还差什么，是来看你这一年攒下了什么。
            我们共振的是丰盛，不是匮乏；年末的人不需要被点燃，需要被接住。
          </p>
        </div>
      </section>

      {/* ==================== 四类人群 ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3 text-center">为谁来</div>
          <h2 className="headline text-[28px] md:text-[36px] text-center mb-12">四种人，总有一种是你</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {audiences.map((a, i) => (
              <motion.div key={a.t} {...fadeUp(i * 0.07)} className="apple-card p-7">
                <div className="text-[18px] font-bold text-[#1d1d1f] mb-2.5">{a.t}</div>
                <div className="text-[14px] leading-relaxed text-[#6e6e73]">{a.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 五段式主线 ==================== */}
      <section className="py-20 px-4 bg-[#f5f5f7] border-y border-black/[.05]">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3 text-center">内容主线</div>
          <h2 className="headline text-[28px] md:text-[36px] text-center mb-4">体验 → 认知 → 示范 → 盘点 → 承诺</h2>
          <p className="text-center text-[#6e6e73] text-[15px] mb-12 max-w-2xl mx-auto">
            能量不是被喊出来的，是被看见之后自然长出来的。
          </p>
          <div className="grid md:grid-cols-5 gap-3">
            {storyline.map((s, i) => (
              <motion.div key={s.n} {...fadeUp(i * 0.07)} className="apple-card p-5 text-center h-full">
                <div className="text-[26px] font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-rose-500 mb-2">{s.n}</div>
                <div className="text-[17px] font-bold text-[#1d1d1f] mb-1.5">{s.t}</div>
                <div className="text-[12px] text-[#86868b] mb-2">{s.q}</div>
                <div className="text-[12.5px] leading-snug text-[#6e6e73]">{s.a}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 完整议程 ==================== */}
      <section id="agenda" className="py-20 px-4 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="eyebrow mb-3 text-center">完整议程</div>
          <h2 className="headline text-[28px] md:text-[36px] text-center mb-14">一天，从「回家」到「出发」</h2>

          <motion.div {...fadeUp()}>
            <div className="flex items-baseline gap-3 mb-5">
              <h3 className="text-[22px] font-bold text-[#1d1d1f]">12月12日（周六）· 成长大会</h3>
              <span className="text-[13px] text-[#86868b]">9:00 - 17:00</span>
            </div>
            <div className="apple-card overflow-hidden">
              {mainAgenda.map(([time, name, detail], i) => (
                <div key={time} className={`grid md:grid-cols-[130px_1fr_1.6fr] gap-x-4 gap-y-1 px-6 py-4 ${i % 2 === 0 ? 'bg-black/[.015]' : ''} ${i !== mainAgenda.length - 1 ? 'border-b border-black/[.04]' : ''}`}>
                  <div className="text-[13px] font-semibold text-orange-600 tabular-nums">{time}</div>
                  <div className="text-[14.5px] font-bold text-[#1d1d1f]">{name}</div>
                  <div className="text-[13.5px] leading-relaxed text-[#6e6e73]">{detail}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== 六个记忆点 ==================== */}
      <section className="py-20 px-4 bg-white border-y border-black/[.05]">
        <div className="max-w-4xl mx-auto">
          <div className="eyebrow mb-3 text-center">六个记忆点</div>
          <h2 className="headline text-[28px] md:text-[36px] text-center mb-12">你会记住的瞬间</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {memories.map((m, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)} className="apple-card p-6 flex gap-4">
                <div className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/15 to-rose-500/15 flex items-center justify-center text-[15px] font-black text-orange-600">{i + 1}</div>
                <div className="text-[14px] leading-relaxed text-[#3a3a3c] pt-1.5">{m}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 共创议题 ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="eyebrow mb-3">开放空间 · 共创</div>
          <h2 className="headline text-[26px] md:text-[32px] mb-10">四个议题，等你来认领</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-left">
            {topics.map((t, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)} className="apple-card p-5 flex items-center gap-3">
                <span className="text-[18px] font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-rose-500">{['①', '②', '③', '④'][i]}</span>
                <span className="text-[14.5px] font-medium text-[#1d1d1f] leading-snug">{t}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-20 px-4 bg-white border-t border-black/[.05]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="headline text-[26px] md:text-[34px] mb-4">报名通道即将开启</h2>
          <p className="text-[#6e6e73] text-[15px] leading-relaxed mb-8">
            到场限 50 人（报名 65 人封顶）。扫码订阅【小蛮腰AI拆书帮】知识库，
            报名通道开启第一时间通知你；也可在知识库里随时问大会的任何问题。
          </p>
          <div className="flex flex-col items-center gap-3">
            <img src="/images/ima-knowledge-qr.png" alt="【小蛮腰AI拆书帮】知识库二维码" className="w-[200px] rounded-2xl border border-black/[.06] shadow-[0_8px_28px_rgba(0,0,0,.10)]" />
            <p className="text-[14px] text-[#6e6e73] font-semibold">微信或 ima 扫码，订阅知识库接收报名通知</p>
            <p className="text-[12.5px] text-[#86868b] mt-1">
              主办：拆书帮广州小蛮腰分舵 ｜ 协办：国际人工智能产业联盟 · 粤港澳大湾区（广东）创新创业孵化基地
            </p>
            <Link to="/" className="text-[13px] text-[#0071e3] hover:underline mt-2">← 返回主页</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
