import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import levels, { mentorship } from '../data/learningPath'

const officialSkillCount = levels.slice(0, 3).reduce((n, l) => n + l.skills.length, 0)

const levelIcons = [
  <svg key="tf1" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20" /><path d="M8 7h6" /><path d="M8 11h8" /><path d="M8 15h5" /></svg>,
  <svg key="tf2" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 6v12" /><path d="M17.196 9a6 6 0 100 6" /><circle cx="12" cy="12" r="10" /></svg>,
  <svg key="tf3" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
  <svg key="ai" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a4 4 0 014 4c0 2-2 4-4 6-2-2-4-4-4-6a4 4 0 014-4z" /><path d="M12 16c-3 0-6 2-6 4h12c0-2-3-4-6-4z" /></svg>,
]

export default function LearningPath() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden pb-8">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-neon-purple/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-neon-blue/10 rounded-full blur-[128px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/25 text-indigo-700 text-sm font-semibold">
              拆书帮 · 三级九拆 + S 级 · AIIA 联合认证
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              <span className="gradient-text">拆书家成长之路</span>
            </h1>
            <p className="text-lg text-[#6e6e73] max-w-2xl mx-auto leading-relaxed">
              从零基础到三级拆书家，再到 AI 拆书家：三级九拆 {officialSkillCount} 个官方技能点逐项对照观察家记录表拆解，
              第四级经国际人工智能产业联盟（AIIA）联合能力认证，认证后可在 gba-base 及关联基地开课授业。
              按你的节奏，走自己的拆书成长之路。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Level Map — 前三级 */}
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {levels.slice(0, 3).map((level, i) => {
          return (
            <motion.section
              key={level.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`glass rounded-2xl p-6 md:p-8 border ${level.border} group hover:border-black/20 transition-all`}>
                {/* Level Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl ${level.bg} border ${level.border} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <span className={`bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                      {levelIcons[i]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className={`text-2xl font-bold bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                        Level {i + 1}: {level.title}
                      </h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${level.bg} ${level.text} border ${level.border}`}>
                        {level.range}
                      </span>
                    </div>
                    <p className="text-[#6e6e73]">{level.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-[#6e6e73] mb-6 leading-relaxed">{level.desc}</p>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-[#6e6e73] uppercase tracking-wider mb-3">
                    过级技能点 · {level.skills.length} 项
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {level.skills.map((skill, j) => (
                      <div
                        key={j}
                        className="flex items-start gap-2 p-2.5 rounded-lg bg-dark-card/50 border border-dark-border"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${level.color} mt-2 shrink-0`} />
                        <span className="text-sm text-[#6e6e73]">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Value */}
                <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/[.06] p-4">
                  <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                    这一级能带走什么
                  </h3>
                  <div className="space-y-1.5">
                    {level.value.map((v, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-[#48484a]">
                        <svg className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {v}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-[#6e6e73] uppercase tracking-wider mb-3">学习成果</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {level.outcomes.map((outcome, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-[#6e6e73]">
                        <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA：在线自评 */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`/tf-assess/#${level.id}`}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${level.color} text-white text-sm font-bold hover:shadow-lg transition-all`}
                  >
                    在线自评 · {level.range.split(' ')[0]}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Arrow between levels */}
              <div className="flex justify-center py-3">
                <svg className="w-6 h-6 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </motion.section>
          )
        })}

        {/* 师承录：师父带着走三级，出师共创 AI */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative rounded-2xl p-6 md:p-8 border-2 border-[#c9a24b]/40 bg-gradient-to-br from-[#c9a24b]/[.08] via-white to-[#8f6b1d]/[.06] overflow-hidden group hover:border-[#c9a24b]/60 transition-all">
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#c9a24b]/15 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#8f6b1d]/10 rounded-full blur-[80px]" />

            <div className="relative z-10">
              {/* Header：师父卡（对齐师承录海报） */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-[#c9a24b]/15 border-2 border-[#c9a24b]/40 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-110 transition-transform">
                  <img src={mentorship.mentor.avatar} alt={mentorship.mentor.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#8f6b1d] to-[#c9a24b] bg-clip-text text-transparent">
                      {mentorship.title}
                    </h2>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#c9a24b]/15 text-[#8f6b1d] border border-[#c9a24b]/30 font-semibold">
                      {mentorship.badge}
                    </span>
                  </div>
                  <p className="text-[#48484a]">{mentorship.subtitle}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-sm font-bold text-[#1d1d1f]">{mentorship.mentor.name}</span>
                    <span className="text-xs text-[#6e6e73]">{mentorship.mentor.alias} · {mentorship.mentor.tags.join(' / ')}</span>
                  </div>
                </div>
              </div>

              {/* 宣言 + 金句 */}
              <div className="rounded-xl border border-[#c9a24b]/30 bg-[#c9a24b]/[.05] p-5 mb-6 text-center">
                <p className="text-xs font-bold text-[#8f6b1d] tracking-[.3em] mb-3">{mentorship.manifesto.heading}</p>
                <p className="text-base md:text-lg text-[#1d1d1f] leading-relaxed font-serif">
                  {mentorship.manifesto.lines[0]}<br />{mentorship.manifesto.lines[1]}
                </p>
                <p className="mt-3 text-sm text-[#6e6e73]">{mentorship.mentor.quote} <span className="text-[#8f6b1d]">{mentorship.mentor.keywords}</span></p>
                <a href="/拆书帮师承录_v20261117.html" target="_blank" rel="noreferrer"
                  className="inline-block mt-4 px-5 py-2 rounded-full border-2 border-[#c9a24b]/50 text-sm font-bold text-[#8f6b1d] hover:bg-[#c9a24b]/10 transition-colors">
                  查看完整师承录大图 →
                </a>
              </div>

              {/* 师徒路线 stepper：L1 → L2 → L3 → S */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-[#6e6e73] uppercase tracking-wider mb-3">师徒路线 · 三级出师，共创 AI</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {mentorship.route.map((r, j) => (
                    <div key={j} className={`relative rounded-xl border p-4 ${j === 3 ? 'border-violet-500/40 bg-violet-500/[.06]' : 'border-[#c9a24b]/30 bg-white'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${j === 3 ? 'bg-violet-500/15 text-violet-700' : 'bg-[#c9a24b]/15 text-[#8f6b1d]'}`}>{r.station}</span>
                        <div>
                          <p className="text-sm font-bold text-[#1d1d1f] leading-tight">{r.name}</p>
                          <p className="text-[11px] text-[#6e6e73]">{r.tag}</p>
                        </div>
                      </div>
                      <p className="text-[12px] text-[#6e6e73] leading-relaxed">{r.desc}</p>
                      {j < 3 && (
                        <span className="hidden lg:flex absolute top-1/2 -right-[13px] -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-[#c9a24b]/30 items-center justify-center text-[#8f6b1d] text-xs">→</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-center text-sm text-[#48484a]">{mentorship.closing}</p>
              </div>

              {/* 三样支持 + 边界约定 */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <div className="rounded-xl border border-[#c9a24b]/25 bg-white p-4">
                  <h3 className="text-sm font-bold text-[#8f6b1d] mb-2">我能提供的三样支持</h3>
                  <div className="space-y-1.5">
                    {mentorship.support.map((s, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-[#48484a]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a24b] mt-2 shrink-0" />
                        <span><b className="text-[#1d1d1f]">{s.title}</b>｜{s.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-[#c9a24b]/25 bg-white p-4">
                  <h3 className="text-sm font-bold text-[#8f6b1d] mb-2">我的边界与约定</h3>
                  <div className="space-y-1.5">
                    {mentorship.boundary.map((b, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-[#48484a]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8f6b1d] mt-2 shrink-0" />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 不承诺 */}
              <div className="mb-6 text-center text-sm text-[#48484a] leading-relaxed">
                {mentorship.noPromise}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 items-center">
                <a
                  href={mentorship.mentor.poster}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8f6b1d] to-[#c9a24b] text-white text-sm font-bold hover:shadow-lg hover:shadow-[#c9a24b]/25 transition-all"
                >
                  {mentorship.cta.poster}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <span className="text-xs text-[#6e6e73]">{mentorship.mentor.footer} · {mentorship.cta.posterSub}</span>
              </div>
            </div>
          </div>

          {/* Arrow to S 级 */}
          <div className="flex justify-center py-3">
            <svg className="w-6 h-6 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.section>

        {/* S 级：AI 拆书家 */}
        {(() => {
          const ai = levels[3]
          return (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl p-6 md:p-8 border-2 border-violet-500/40 bg-gradient-to-br from-violet-500/[.08] via-white to-purple-500/[.06] overflow-hidden group hover:border-violet-500/60 transition-all">
                {/* Glow */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-500/10 rounded-full blur-[100px]" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-[80px]" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-violet-500/15 border-2 border-violet-500/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-black text-violet-700">S</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="text-2xl font-bold text-violet-700">
                          S 级: {ai.title}
                        </h2>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-700 border border-violet-500/30 font-semibold">
                          {ai.range}
                        </span>
                      </div>
                      <p className="text-[#48484a]">{ai.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-[#48484a] mb-6 leading-relaxed">{ai.desc}</p>

                  {/* Pipeline */}
                  <div className="rounded-xl border border-violet-500/30 bg-violet-500/[.06] p-5 mb-6">
                    <h3 className="text-sm font-bold text-[#1d1d1f] mb-4">用 RIA 拆 AI · 三步走</h3>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {ai.pipeline.map((step, j) => (
                        <div key={j} className="text-center">
                          <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                            <span className="text-white text-xs font-bold">{j + 1}</span>
                          </div>
                          <p className="text-xs font-bold text-[#1d1d1f] mb-1">{step.name}</p>
                          <p className="text-[12px] text-[#6e6e73] leading-relaxed">{step.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Five outputs flow */}
                    <div className="mt-5 pt-4 border-t border-violet-500/20">
                      <p className="text-xs font-bold text-[#6e6e73] mb-3">I 匹配场景中跑通的五个产出例子，经 A 反思定制、持续进化：</p>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {ai.outputs.map((o, j) => (
                          <span key={j} className="inline-flex items-center gap-2">
                            <span title={o.desc} className="px-3 py-1.5 rounded-full border border-cyan-500/30 bg-white text-xs font-medium text-[#1d1d1f]">{o.name}</span>
                            {j < ai.outputs.length - 1 && <span className="text-[#6e6e73] text-xs">→</span>}
                          </span>
                        ))}
                        <span className="text-[#6e6e73] text-xs">⤴ 反馈迭代</span>
                      </div>
                    </div>
                  </div>

                  {/* Value */}
                  <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/[.06] p-4">
                    <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                      这一级能带走什么
                    </h3>
                    <div className="space-y-1.5">
                      {ai.value.map((v, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm text-[#48484a]">
                          <svg className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {v}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-[#6e6e73] uppercase tracking-wider mb-3">学习成果</h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {ai.outcomes.map((outcome, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm text-[#48484a]">
                          <svg className="w-5 h-5 mt-0.5 shrink-0 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {outcome}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AIIA × 拆AI 联合认证 */}
                  {ai.certification && (() => {
                    const cert = ai.certification
                    return (
                      <div className="mb-6 relative overflow-hidden rounded-xl border-2 border-[#c9a24b]/40 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] p-5 md:p-7">
                        {/* 星辉底纹 */}
                        <div className="absolute inset-0 opacity-[.35] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 18% 22%, rgba(201,162,75,.28) 0, transparent 42%), radial-gradient(circle at 82% 78%, rgba(122,90,248,.22) 0, transparent 46%), radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,.5) 50%, transparent), radial-gradient(1px 1px at 68% 28%, rgba(255,255,255,.4) 50%, transparent), radial-gradient(1.5px 1.5px at 52% 82%, rgba(255,255,255,.35) 50%, transparent), radial-gradient(1px 1px at 84% 52%, rgba(255,255,255,.45) 50%, transparent)' }} />
                        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#c9a24b]/15 rounded-full blur-[90px]" />

                        <div className="relative z-10">
                          {/* 认证抬头 */}
                          <div className="text-center mb-6">
                            <span className="inline-block mb-3 px-4 py-1 rounded-full bg-[#c9a24b]/15 border border-[#c9a24b]/40 text-[#e5c97e] text-xs font-bold tracking-[.2em]">
                              {cert.badge}
                            </span>
                            <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                              {cert.title}
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed max-w-xl mx-auto">
                              {cert.intro}
                            </p>
                            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs">
                              <a href={cert.orgUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#e5c97e] hover:text-white transition-colors font-semibold">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><path d="M15 3h6v6" /><path d="M10 14L21 3" /></svg>
                                {cert.org}（{cert.orgShort}）
                              </a>
                              <span className="text-[#c9a24b]/60">✕</span>
                              <span className="text-white/80 font-semibold">小蛮腰·拆AI</span>
                              <span className="text-white/40">· {cert.claim}</span>
                            </div>
                          </div>

                          {/* 四维考核 */}
                          <div className="mb-6">
                            <h4 className="text-xs font-bold text-[#e5c97e] uppercase tracking-[.25em] text-center mb-4">四维能力模型 · 联合考核</h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {cert.dimensions.map((d, j) => (
                                <div key={j} className="rounded-lg border border-white/10 bg-white/[.04] hover:border-[#c9a24b]/40 transition-colors p-4">
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm font-bold text-white flex items-center gap-2">
                                      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#c9a24b] to-[#8f6b1d] flex items-center justify-center text-[10px] font-black text-[#1a1a2e]">{j + 1}</span>
                                      {d.name}
                                    </span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#c9a24b]/30 text-[#e5c97e]/80">{d.weight}</span>
                                  </div>
                                  <p className="text-[12px] text-white/55 leading-relaxed mb-1.5">{d.desc}</p>
                                  <p className="text-[10px] text-[#7a5af8]/80 font-mono">{d.ref}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 认证五步 */}
                          <div className="mb-6 rounded-lg border border-white/10 bg-white/[.03] p-4">
                            <h4 className="text-xs font-bold text-[#e5c97e] uppercase tracking-[.25em] text-center mb-4">认证之路 · 五步一证</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                              {cert.steps.map((s, j) => (
                                <div key={j} className="text-center relative">
                                  <div className="w-9 h-9 mx-auto mb-2 rounded-full bg-[#c9a24b]/10 border border-[#c9a24b]/40 flex items-center justify-center text-sm">{s.icon}</div>
                                  <p className="text-[11px] font-bold text-white/90 mb-0.5">{s.name}</p>
                                  <p className="text-[10px] text-white/45 leading-snug">{s.desc}</p>
                                  {j < cert.steps.length - 1 && <span className="hidden sm:block absolute top-[18px] -right-[7px] text-[#c9a24b]/50 text-xs">›</span>}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 认证价值 */}
                          <div className="mb-6">
                            <h4 className="text-xs font-bold text-[#e5c97e] uppercase tracking-[.25em] text-center mb-4">这张证书的分量</h4>
                            <div className="space-y-2 max-w-2xl mx-auto">
                              {cert.value.map((v, j) => (
                                <div key={j} className="flex items-start gap-2.5 text-[13px] text-white/70 leading-relaxed">
                                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#c9a24b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15a7 7 0 100-14 7 7 0 000 14z" /><path d="M8.2 13.9L7 23l5-3 5 3-1.2-9.1" /></svg>
                                  {v}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 授课授权 */}
                          <div className="mb-6 rounded-lg border border-[#c9a24b]/30 bg-gradient-to-r from-[#c9a24b]/[.08] to-transparent p-4">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#c9a24b]/20 text-[#e5c97e] border border-[#c9a24b]/40 font-bold tracking-wider">{cert.grant.badge}</span>
                              <span className="text-sm font-bold text-white">{cert.grant.title}</span>
                            </div>
                            <p className="text-[12px] text-white/55 mb-3">{cert.grant.desc}</p>
                            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                              {cert.grant.items.map((g, j) => (
                                <div key={j} className="flex items-start gap-2 text-[12px] text-white/65">
                                  <span className="text-[#c9a24b] mt-0.5">◈</span>
                                  {g}
                                </div>
                              ))}
                            </div>
                            <a href={cert.grant.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#e5c97e] hover:text-white transition-colors">
                              {cert.grant.cta} · {cert.grant.url.replace('https://', '')}
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
                            </a>
                          </div>

                          {/* 颁证仪式 */}
                          <div className="rounded-lg border border-white/10 bg-white/[.03] p-4 text-center">
                            <div className="flex items-center justify-center gap-3 mb-2">
                              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#c9a24b]/60" />
                              <span className="text-xs font-bold text-[#e5c97e] tracking-[.3em]">{cert.ceremony.title}</span>
                              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#c9a24b]/60" />
                            </div>
                            <p className="text-[12px] text-white/55 leading-relaxed max-w-lg mx-auto">{cert.ceremony.desc}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })()}

                  {/* CTA */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/skill-fusion"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white text-sm font-bold hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                    >
                      进入拆专家工坊
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <a
                      href="/tf-assess/#ai"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-[#424245] text-sm font-medium hover:text-[#1d1d1f] transition-all border border-violet-500/20"
                    >
                      在线自评 · RIA 拆 AI
                    </a>
                  </div>
                </div>
              </div>
            </motion.section>
          )
        })()}
      </div>
    </div>
  )
}
