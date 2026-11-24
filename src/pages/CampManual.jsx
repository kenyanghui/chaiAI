import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { campModules, campOrder } from '../data/camp'

const totalSteps = (m) => m.sections.reduce((n, s) => n + s.steps.length, 0)

function useProgress(modId) {
  const key = `camp-progress-${modId}`
  const [done, setDone] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? new Set(JSON.parse(raw)) : new Set()
    } catch {
      return new Set()
    }
  })
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify([...done]))
    } catch {
      /* private mode: progress just won't persist */
    }
  }, [done, key])
  const toggle = (i) => {
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }
  return [done, toggle]
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button
      type="button"
      onClick={copy}
      className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${copied ? 'bg-[#34c759] text-white' : 'bg-[#0071e3] text-white hover:bg-[#0077ed]'}`}
    >
      {copied ? '已复制 ✓' : '复制'}
    </button>
  )
}

function StepCard({ index, step, checked, onToggle }) {
  return (
    <div className={`rounded-[20px] border p-5 sm:p-6 transition-colors ${checked ? 'bg-[#f0f7ff] border-[#0071e3]/25' : 'bg-white border-black/[.07]'}`}>
      <div className="flex items-start gap-4">
        <button
          type="button"
          aria-label={checked ? '取消勾选这一步' : '勾选完成这一步'}
          onClick={onToggle}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[13px] font-bold shrink-0 mt-0.5 transition-colors ${checked ? 'bg-[#0071e3] border-[#0071e3] text-white' : 'border-black/20 text-[#86868b] hover:border-[#0071e3] hover:text-[#0071e3]'}`}
        >
          {checked ? '✓' : index}
        </button>
        <div className="flex-1 min-w-0">
          <h4 className={`text-[16px] sm:text-[17px] font-bold leading-snug ${checked ? 'text-[#6e6e73] line-through decoration-[#0071e3]/40' : 'text-[#1d1d1f]'}`}>{step.title}</h4>
          <p className="mt-2.5 text-[14px] sm:text-[15px] leading-relaxed text-[#424245] whitespace-pre-line">{step.action}</p>
          {step.tip && (
            <p className="mt-3 rounded-xl bg-[#fff8e6] px-4 py-3 text-[13px] leading-relaxed text-[#6e5423]">💡 {step.tip}</p>
          )}
          {step.checkpoint && (
            <div className="mt-3 rounded-xl bg-[#e8f4ff] border border-[#0071e3]/15 px-4 py-3">
              <div className="text-[12px] font-bold text-[#0071e3]">检查点（看到才算做对）</div>
              <p className="mt-1 text-[13px] sm:text-[14px] leading-relaxed text-[#1d1d1f]">{step.checkpoint}</p>
            </div>
          )}
          {step.fixes?.length > 0 && (
            <details className="mt-3 rounded-xl bg-[#f5f5f7] px-4 py-3 group">
              <summary className="cursor-pointer list-none text-[12px] font-semibold text-[#6e6e73] flex items-center justify-between">
                <span>没看到怎么办</span>
                <span className="text-[#0071e3] group-open:rotate-45 transition-transform text-[16px] leading-none">+</span>
              </summary>
              <ul className="mt-2.5 space-y-1.5">
                {step.fixes.map((fix) => (
                  <li key={fix} className="text-[13px] leading-relaxed text-[#424245]">· {fix}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CampManual() {
  const { moduleId } = useParams()
  const mod = campModules[moduleId]
  const stepCount = useMemo(() => (mod ? totalSteps(mod) : 0), [mod])
  const [done, toggle] = useProgress(mod?.id ?? 'none')
  const globalIndex = useMemo(() => {
    const map = {}
    let i = 1
    mod?.sections.forEach((s) => {
      map[s.label] = []
      s.steps.forEach(() => {
        map[s.label].push(i)
        i += 1
      })
    })
    return map
  }, [mod])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [moduleId])

  if (!mod) return <Navigate to="/workshops/camp" replace />

  const pos = campOrder.findIndex((m) => m.id === mod.id)
  const next = pos >= 0 && pos < campOrder.length - 1 ? campOrder[pos + 1] : null
  const doneCount = mod.sections.reduce((n, s) => n + s.steps.filter((_, idx) => done.has(globalIndex[s.label][idx])).length, 0)

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <nav className="bg-white/90 backdrop-blur border-b border-black/[.06] sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between gap-3">
          <Link to="/workshops/camp" className="text-[13px] text-[#6e6e73] hover:text-[#0071e3] shrink-0">← 训练营总览</Link>
          <div className="text-[12px] text-[#86868b] truncate">拆AI训练营 · {mod.weekend} · {mod.name}</div>
          <a href="#self-check" className="text-[13px] font-semibold text-[#0071e3] shrink-0">交付自检 →</a>
        </div>
      </nav>

      <header className="bg-white px-4 pt-10 pb-12 border-b border-black/[.05]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-11 h-11 rounded-2xl bg-[#1d1d1f] text-white flex items-center justify-center text-[14px] font-bold">{mod.no}</span>
              <span className="px-3 py-1.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[12px] font-semibold">{mod.weekend} · 自学手册</span>
              <span className="text-[13px] font-semibold text-[#6e6e73]">{mod.name}</span>
            </div>
            <h1 className="mt-6 text-[30px] sm:text-[42px] font-bold tracking-[-0.03em] leading-[1.15]">{mod.headline}</h1>
            <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#6e6e73]">
              预计总时长：约 {mod.totalMinutes} 分钟｜{mod.splitHint}。<br className="hidden sm:block" />
              没有讲师也能做完：一步一步照做，每步都有「检查点」和「卡住怎么办」。
            </p>
            <div className="mt-6 rounded-[20px] bg-[#f5f5f7] p-5 sm:p-6">
              <div className="text-[12px] font-bold tracking-wide text-[#0071e3]">跟做完，你能得到</div>
              <ul className="mt-3 space-y-2">
                {mod.outcomes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[14px] leading-relaxed text-[#1d1d1f]">
                    <span className="text-[#0071e3] font-bold shrink-0">✓</span><span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full bg-black/[.08] overflow-hidden">
                <div className="h-full rounded-full bg-[#0071e3] transition-all duration-500" style={{ width: `${stepCount ? (doneCount / stepCount) * 100 : 0}%` }} />
              </div>
              <span className="text-[12px] font-semibold text-[#6e6e73] shrink-0">{doneCount}/{stepCount} 步已完成</span>
            </div>
            <p className="mt-1.5 text-[11px] text-[#86868b]">勾选会自动保存在这台设备上，可以分几次做完。</p>
          </motion.div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <section className="rounded-[24px] bg-white p-6 sm:p-8 border border-black/[.05]">
          <h2 className="text-[20px] sm:text-[24px] font-bold"><span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#1d1d1f] text-white text-[13px] mr-2.5 align-[2px]">备</span>开始之前：设备与账号自查</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6e6e73]">{mod.prep.intro}</p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-[13px] leading-relaxed border-collapse">
              <thead>
                <tr className="text-left text-[12px] text-[#86868b] border-b border-black/[.08]">
                  <th className="py-2.5 pr-4 font-semibold whitespace-nowrap">你需要有</th>
                  <th className="py-2.5 pr-4 font-semibold">怎么确认已有</th>
                  <th className="py-2.5 font-semibold">没有怎么办</th>
                </tr>
              </thead>
              <tbody>
                {mod.prep.rows.map((row) => (
                  <tr key={row.need} className="border-b border-black/[.05] last:border-0 align-top">
                    <td className="py-3 pr-4 font-semibold text-[#1d1d1f]">{row.need}</td>
                    <td className="py-3 pr-4 text-[#424245]">{row.confirm}</td>
                    <td className="py-3 text-[#424245]">{row.fallback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-xl bg-[#e8f4ff] px-4 py-3 text-[13px] leading-relaxed text-[#1d1d1f]">{mod.prep.fallbackNote}</p>
        </section>

        {mod.sections.map((section) => (
          <section key={section.label} className="rounded-[24px] bg-white p-6 sm:p-8 border border-black/[.05]">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-[20px] sm:text-[24px] font-bold">{section.label} · {section.title}</h2>
              <span className="text-[12px] font-semibold text-[#0071e3]">预计 {section.minutes} 分钟</span>
            </div>
            <p className="mt-2.5 text-[14px] leading-relaxed text-[#6e6e73]">{section.goal}</p>
            {section.preflight?.length > 0 && (
              <div className="mt-4 rounded-xl bg-[#f5f5f7] px-4 py-3">
                <div className="text-[12px] font-bold text-[#6e6e73]">动手前确认</div>
                <ul className="mt-1.5 space-y-1">
                  {section.preflight.map((item) => (
                    <li key={item} className="text-[13px] leading-relaxed text-[#424245]">· {item}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-6 space-y-4">
              {section.steps.map((step, idx) => (
                <StepCard
                  key={step.title}
                  index={globalIndex[section.label][idx]}
                  step={step}
                  checked={done.has(globalIndex[section.label][idx])}
                  onToggle={() => toggle(globalIndex[section.label][idx])}
                />
              ))}
            </div>
            {section.troubleTable?.length > 0 && (
              <div className="mt-6">
                <div className="text-[13px] font-bold text-[#1d1d1f] mb-2.5">本节排障表</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px] leading-relaxed border-collapse">
                    <thead>
                      <tr className="text-left text-[12px] text-[#86868b] border-b border-black/[.08]">
                        <th className="py-2 pr-4 font-semibold w-[30%]">症状</th>
                        <th className="py-2 pr-4 font-semibold w-[30%]">可能原因</th>
                        <th className="py-2 font-semibold">解法</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.troubleTable.map((row) => (
                        <tr key={row.symptom} className="border-b border-black/[.05] last:border-0 align-top">
                          <td className="py-2.5 pr-4 font-semibold text-[#1d1d1f]">{row.symptom}</td>
                          <td className="py-2.5 pr-4 text-[#6e6e73]">{row.cause}</td>
                          <td className="py-2.5 text-[#424245]">{row.fix}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        ))}

        <section id="self-check" className="rounded-[24px] bg-[#1d1d1f] text-white p-6 sm:p-8 scroll-mt-20">
          <h2 className="text-[20px] sm:text-[24px] font-bold"><span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white text-[#1d1d1f] text-[13px] mr-2.5 align-[2px]">验</span>交付物自检表</h2>
          <p className="mt-3 text-[13px] leading-relaxed text-white/60">全部勾上才算这个周末毕业。差哪条，就回对应节补哪条。</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {mod.selfCheck.map((deliverable) => (
              <div key={deliverable.name} className="rounded-[18px] bg-white/[.06] border border-white/10 p-5">
                <div className="text-[14px] font-bold text-[#64d2ff]">{deliverable.name}</div>
                <ul className="mt-3 space-y-2">
                  {deliverable.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-white/80">
                      <span className="text-[#64d2ff] shrink-0">☐</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-xl bg-[#ffefcc] px-4 py-3 text-[13px] leading-relaxed text-[#6e5423] font-semibold">🔒 {mod.security}</p>
        </section>

        <section className="rounded-[24px] bg-white p-6 sm:p-8 border border-black/[.05]">
          <h2 className="text-[20px] sm:text-[24px] font-bold"><span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#1d1d1f] text-white text-[13px] mr-2.5 align-[2px]">续</span>30 天巩固计划</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6e6e73]">{mod.plan30.intro}</p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-[13px] leading-relaxed border-collapse">
              <thead>
                <tr className="text-left text-[12px] text-[#86868b] border-b border-black/[.08]">
                  <th className="py-2.5 pr-4 font-semibold w-[18%]">周</th>
                  <th className="py-2.5 pr-4 font-semibold w-[41%]">做什么</th>
                  <th className="py-2.5 font-semibold">自查标准</th>
                </tr>
              </thead>
              <tbody>
                {mod.plan30.rows.map((row) => (
                  <tr key={row.week} className="border-b border-black/[.05] last:border-0 align-top">
                    <td className="py-3 pr-4 font-semibold text-[#0071e3] whitespace-nowrap">{row.week}</td>
                    <td className="py-3 pr-4 text-[#424245]">{row.task}</td>
                    <td className="py-3 text-[#424245]">{row.standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-xl bg-[#e8f4ff] px-4 py-3 text-[13px] leading-relaxed text-[#1d1d1f]"><span className="font-bold">每日一分钟：</span>{mod.plan30.daily}</p>
        </section>

        <section className="rounded-[24px] bg-white p-6 sm:p-8 border border-black/[.05]">
          <h2 className="text-[20px] sm:text-[24px] font-bold">指令卡（复制即用）</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6e6e73]">把重复动作固化成卡。占位符换成你自己的内容再发送。</p>
          <div className="mt-5 space-y-4">
            {mod.promptCards.map((card) => (
              <div key={card.title} className="rounded-[18px] border border-black/[.07] overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-5 py-4 bg-[#f5f5f7]">
                  <div>
                    <div className="text-[15px] font-bold">{card.title}</div>
                    <div className="text-[12px] text-[#6e6e73] mt-0.5">{card.usage}</div>
                  </div>
                  <CopyButton text={card.prompt} />
                </div>
                <pre className="px-5 py-4 text-[13px] leading-relaxed text-[#1d1d1f] whitespace-pre-wrap bg-white border-t border-black/[.06] font-[inherit]">{card.prompt}</pre>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] bg-gradient-to-br from-[#0071e3] to-[#0055b8] text-white p-6 sm:p-8 text-center">
          <div className="text-[12px] tracking-[0.18em] uppercase font-semibold text-white/70">Next weekend</div>
          <h2 className="mt-3 text-[22px] sm:text-[28px] font-bold">{next ? `下一个周末 · ${next.name}` : mod.nextModule.name}</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-white/80 max-w-xl mx-auto">{mod.nextModule.note}</p>
          {next && (
            <Link to={`/workshops/camp/${next.id}`} className="inline-block mt-6 px-6 py-3 rounded-full bg-white text-[#0071e3] text-[14px] font-bold hover:bg-white/90">
              进入「{next.name}」手册 →
            </Link>
          )}
        </section>
      </div>

      <footer className="bg-white border-t border-black/[.05] px-4 py-7">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[12px] text-[#86868b]">
          <span>小蛮腰 · 拆AI训练营 · 自学跟做手册</span>
          <Link to="/workshops/camp" className="text-[#0071e3] hover:underline">返回训练营总览 →</Link>
        </div>
      </footer>
    </div>
  )
}
