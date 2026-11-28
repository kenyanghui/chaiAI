import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import levels, { mentorship } from '../data/learningPath'
import { tfScoringRule, tfStageGroups, tfStageNotes } from '../data/tfStages'
import { mentorCamp, mentorTools } from '../data/mentorTools'

const officialSkillCount = levels.slice(0, 3).reduce((n, level) => n + level.skills.length, 0)
const totalStages = tfStageGroups.reduce((n, group) => n + group.stages.length, 0)
const totalScoringItems = tfStageGroups.reduce(
  (n, group) => n + group.stages.reduce((sum, stage) => sum + stage.keySkills.length, 0),
  0,
)
const totalAiSkills = tfStageGroups.reduce(
  (n, group) => n + group.stages.reduce((sum, stage) => sum + stage.aiSkills.length, 0),
  0,
)

const levelIcons = [
  <svg key="tf1" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20" /><path d="M8 7h6" /><path d="M8 11h8" /><path d="M8 15h5" /></svg>,
  <svg key="tf2" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 6v12" /><path d="M17.196 9a6 6 0 100 6" /><circle cx="12" cy="12" r="10" /></svg>,
  <svg key="tf3" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
  <svg key="ai" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a4 4 0 014 4c0 2-2 4-4 6-2-2-4-4-4-6a4 4 0 014-4z" /><path d="M12 16c-3 0-6 2-6 4h12c0-2-3-4-6-4z" /></svg>,
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-8">
      {eyebrow && <div className="text-xs font-bold tracking-[0.2em] text-neon-purple mb-3">{eyebrow}</div>}
      <h2 className="text-2xl md:text-3xl font-black text-[#1d1d1f]">{title}</h2>
      {description && <p className="mt-3 text-sm md:text-base leading-relaxed text-[#6e6e73] max-w-3xl">{description}</p>}
    </div>
  )
}

function TextList({ items, className = '' }) {
  return (
    <ul className={`space-y-3 text-sm leading-relaxed text-[#424245] ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-40" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function GradingGrid({ grading, score, ai = false }) {
  const grades = [
    { key: 'a', label: 'A · 不合格', className: 'border-red-500/20 bg-red-500/[.04] text-red-800' },
    { key: 'b', label: ai ? 'B · 有截图' : 'B · 合格', className: 'border-amber-500/20 bg-amber-500/[.04] text-amber-800' },
    { key: 'c', label: 'C · 优秀', className: 'border-emerald-500/20 bg-emerald-500/[.04] text-emerald-800' },
  ]

  return (
    <div className="mt-4 grid gap-2 lg:grid-cols-3">
      {grades.map((grade) => (
        <div key={grade.key} className={`rounded-xl border p-3 ${grade.className}`}>
          <div className="mb-1.5 flex items-center justify-between gap-2 text-xs font-bold">
            <span>{grade.label}</span>
            {grade.key === 'c' && score !== null && <span>{score} 分</span>}
          </div>
          <p className="text-xs leading-relaxed text-[#515154]">{grading[grade.key]}</p>
        </div>
      ))}
    </div>
  )
}

function StageCard({ stage, level, open, onToggle }) {
  const detailsId = `${stage.id}-details`

  return (
    <article id={stage.id} className={`overflow-hidden rounded-2xl border bg-white/80 ${level.border}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={onToggle}
        className="w-full p-5 text-left transition-colors hover:bg-white md:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-lg px-2.5 py-1 text-xs font-black ${level.bg} ${level.text}`}>{stage.code}</span>
              <span className="text-xs text-[#86868b]">{stage.keySkills.length} 个关键技能 · {stage.aiSkills.length} 个 AI 技能</span>
            </div>
            <h4 className="mt-3 text-lg font-black text-[#1d1d1f]">{stage.name}</h4>
            <p className="mt-2 text-xs font-medium text-[#6e6e73]">{stage.duration}</p>
          </div>
          <span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${level.border} ${level.text} transition-transform ${open ? 'rotate-45' : ''}`}>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[#515154]">{stage.focus}</p>
        <span className={`mt-4 inline-block text-xs font-bold ${level.text}`}>{open ? '收起完整评分表' : '展开完整评分表'}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={detailsId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <div className="border-t border-black/[.06] p-5 md:p-6">
              {stage.premise.length > 0 && (
                <div className="mb-6 rounded-xl bg-[#f5f5f7] p-4">
                  <h5 className="mb-2 text-xs font-bold text-[#1d1d1f]">过关前提</h5>
                  <TextList items={stage.premise} className="text-xs" />
                </div>
              )}

              <div className="space-y-4">
                {stage.keySkills.map((skill, index) => (
                  <section key={`${stage.id}-${skill.name}-${index}`} className={`rounded-2xl border p-4 md:p-5 ${skill.critical ? 'border-red-500/25 bg-red-500/[.025]' : 'border-black/[.07] bg-white'}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black text-[#86868b]">{String(index + 1).padStart(2, '0')}</span>
                      <h5 className="text-sm font-black text-[#1d1d1f]">{skill.name}</h5>
                      {skill.critical && <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] font-bold text-red-700">关键技能 · A 档否决</span>}
                      {skill.critical === null && <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-700">关键属性待现场核对</span>}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#424245]">{skill.detail}</p>
                    <GradingGrid grading={skill.grading} score={skill.score} />
                  </section>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-neon-purple/20 bg-neon-purple/[.035] p-4 md:p-5">
                <h5 className="text-sm font-black text-[#1d1d1f]">2026 版 AI 技能点</h5>
                <p className="mt-1 text-xs text-[#6e6e73]">保留对话截图；A 档通常一票否决，具体以本关观察表为准。</p>
                <div className="mt-4 space-y-4">
                  {stage.aiSkills.map((skill, index) => (
                    <section key={`${stage.id}-ai-${index}`} className="rounded-xl border border-neon-purple/15 bg-white/70 p-4">
                      <h6 className="text-sm font-bold text-[#1d1d1f]">{index + 1}. {skill.name}</h6>
                      <p className="mt-2 text-sm leading-relaxed text-[#424245]">{skill.detail}</p>
                      <GradingGrid grading={skill.grading} score={skill.score} ai />
                    </section>
                  ))}
                </div>
              </div>

              {stage.veto.length > 0 && (
                <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/[.04] p-4">
                  <h5 className="mb-2 text-xs font-black text-red-800">一票否决提醒</h5>
                  <TextList items={stage.veto} className="text-xs text-red-800" />
                </div>
              )}
              {stage.note && <p className="mt-4 text-xs leading-relaxed text-[#6e6e73]">补充说明：{stage.note}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

function LearnerView() {
  const [openStage, setOpenStage] = useState(null)

  return (
    <motion.div key="learner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="mb-12 rounded-2xl border border-black/[.06] bg-white/70 p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-xl font-black text-[#1d1d1f]">先看路线，再打开每一关的评分表</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#6e6e73]">{tfScoringRule}</p>
            <TextList items={tfStageNotes} className="mt-3 text-xs" />
          </div>
          <Link to="/tf-assess/" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/15 transition-all hover:scale-[1.02]">
            进入在线自评
          </Link>
        </div>
      </section>

      <div className="space-y-12">
        {levels.map((level, index) => {
          const group = tfStageGroups[index]
          return (
            <motion.section key={level.id} {...fadeUp} className={`rounded-3xl border bg-gradient-to-br ${level.light} ${level.border} p-6 md:p-10`}>
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${level.color} text-white shadow-lg`}>
                    {levelIcons[index]}
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${level.text}`}>{level.range}</div>
                    <h2 className="mt-1 text-2xl font-black text-[#1d1d1f] md:text-3xl">{level.title}</h2>
                    <p className="mt-1 text-sm font-medium text-[#6e6e73]">{level.subtitle}</p>
                  </div>
                </div>
                <div className={`rounded-xl px-4 py-2 text-center ${level.bg}`}>
                  <div className={`text-xl font-black ${level.text}`}>{group.stages.length}</div>
                  <div className="text-[11px] text-[#6e6e73]">个晋级关卡</div>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-[#424245] md:text-base">{level.desc}</p>

              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl bg-white/65 p-5">
                  <h3 className="mb-4 text-sm font-black text-[#1d1d1f]">本段能力地图</h3>
                  <TextList items={level.skills} className="text-xs" />
                </div>
                <div className="rounded-2xl bg-white/65 p-5">
                  <h3 className="mb-4 text-sm font-black text-[#1d1d1f]">新人会收获什么</h3>
                  <TextList items={level.value} className="text-xs" />
                </div>
                <div className="rounded-2xl bg-white/65 p-5">
                  <h3 className="mb-4 text-sm font-black text-[#1d1d1f]">本段认证标准</h3>
                  <TextList items={level.outcomes} className="text-xs" />
                </div>
              </div>

              <div className="mt-10">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-black text-[#1d1d1f]">逐关评分细则</h3>
                    <p className="mt-1 text-xs text-[#6e6e73]">点开关卡，可逐项查看 A / B / C 观察标准与否决点。</p>
                  </div>
                  <span className="text-xs font-medium text-[#86868b]">{group.stages.reduce((n, stage) => n + stage.keySkills.length, 0)} 个评分项</span>
                </div>
                <div className="space-y-4">
                  {group.stages.map((stage) => (
                    <StageCard
                      key={stage.id}
                      stage={stage}
                      level={level}
                      open={openStage === stage.id}
                      onToggle={() => setOpenStage(openStage === stage.id ? null : stage.id)}
                    />
                  ))}
                </div>
              </div>
            </motion.section>
          )
        })}
      </div>

      <section className="mt-12 rounded-2xl border border-neon-purple/20 bg-gradient-to-br from-neon-purple/10 to-neon-blue/10 p-6 text-center md:p-8">
        <h2 className="text-xl font-black text-[#1d1d1f] md:text-2xl">先自评，再带着具体卡点找师父</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#6e6e73]">本站提供 TF1-1、TF2-4、TF3-3 逐条自评。自评不能代替观察家正式评审，但能帮你把下一次沟通聚焦到具体技能点。</p>
        <Link to="/tf-assess/" className="mt-6 inline-flex rounded-xl bg-neon-purple px-7 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-105">
          开始逐条自评
        </Link>
      </section>
    </motion.div>
  )
}

function ToolCard({ tool }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-black/[.07] bg-white/80 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-neon-purple/10 px-2.5 py-1 text-[11px] font-bold text-neon-purple">{tool.category}</span>
        <span className="text-[11px] text-[#86868b]">{String(mentorTools.indexOf(tool) + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="mt-4 text-lg font-black text-[#1d1d1f]">{tool.name}</h3>
      <p className="mt-2 text-sm font-medium leading-relaxed text-[#424245]">{tool.tagline}</p>
      <p className="mt-3 text-xs leading-relaxed text-[#6e6e73]">{tool.purpose}</p>
      <details className="group mt-auto pt-5">
        <summary className="cursor-pointer list-none text-xs font-bold text-neon-purple outline-none focus-visible:ring-2 focus-visible:ring-neon-purple/40">
          <span className="group-open:hidden">查看使用方法与模板 +</span>
          <span className="hidden group-open:inline">收起使用方法与模板 −</span>
        </summary>
        <div className="mt-4 border-t border-black/[.06] pt-4">
          <h4 className="text-xs font-black text-[#1d1d1f]">工具结构</h4>
          <TextList items={tool.structure} className="mt-3 text-xs" />
          <h4 className="mt-5 text-xs font-black text-[#1d1d1f]">怎么用</h4>
          <TextList items={tool.usage} className="mt-3 text-xs" />
          <div className="mt-5 rounded-xl bg-[#f5f5f7] p-4">
            <h4 className="text-xs font-black text-[#1d1d1f]">示例 / 话术</h4>
            <p className="mt-2 text-xs leading-relaxed text-[#515154]">{tool.example}</p>
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-[#86868b]">来源：{tool.source}</p>
        </div>
      </details>
    </article>
  )
}

function MentorView() {
  const categories = ['全部', ...new Set(mentorTools.map((tool) => tool.category))]
  const [category, setCategory] = useState('全部')
  const visibleTools = category === '全部' ? mentorTools : mentorTools.filter((tool) => tool.category === category)
  const { mentorGrowth, lineage, talkSheets } = mentorCamp

  return (
    <motion.div key="mentor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
      <section className="overflow-hidden rounded-3xl border border-neon-purple/20 bg-gradient-to-br from-neon-purple/10 via-white/70 to-neon-blue/10 p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <div className="text-xs font-bold tracking-[0.18em] text-neon-purple">MENTOR ENABLEMENT</div>
            <h2 className="mt-3 text-2xl font-black text-[#1d1d1f] md:text-3xl">{mentorCamp.name}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#515154] md:text-base">{mentorCamp.intro}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-lg bg-white/70 px-3 py-2 text-xs font-bold text-[#424245]">{mentorCamp.period}</span>
              <span className="rounded-lg bg-white/70 px-3 py-2 text-xs font-bold text-[#424245]">{mentorCamp.duration}</span>
              <span className="rounded-lg bg-white/70 px-3 py-2 text-xs font-bold text-[#424245]">录播 + 作业 + 答疑</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/80 bg-white/70 p-5">
            <h3 className="text-sm font-black text-[#1d1d1f]">每周固定节奏</h3>
            <TextList items={mentorCamp.rhythm} className="mt-4" />
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="7-WEEK CAMP" title="七周，把带徒方法练成一套闭环" description="课程安排按训练营课程表整理；作业与直播日期保留原始节奏，方便师父回看与复盘。" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {mentorCamp.weekly.map((week) => (
            <article key={week.week} className="rounded-2xl border border-black/[.07] bg-white/75 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-neon-purple">WEEK {week.week}</span>
                <span className="text-xs text-[#86868b]">{week.date}</span>
              </div>
              <h3 className="mt-4 min-h-12 text-sm font-black leading-relaxed text-[#1d1d1f]">{week.lesson}</h3>
              <div className="mt-4 space-y-2 border-t border-black/[.06] pt-4 text-xs leading-relaxed text-[#6e6e73]">
                <p><span className="font-bold text-[#424245]">主题：</span>{week.focus}</p>
                <p><span className="font-bold text-[#424245]">作业截止：</span>{week.assignmentDue}</p>
                <p><span className="font-bold text-[#424245]">直播：</span>{week.live}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="13 FIELD TOOLS" title="师父带徒工具箱" description="从双向选择、目标约定，到写稿支撑、关键场次陪练与赛后复盘。点开工具即可查看结构、使用步骤和示范话术。" />
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="按工具用途筛选">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${category === item ? 'bg-neon-purple text-white shadow-md shadow-purple-500/15' : 'border border-black/[.08] bg-white/70 text-[#6e6e73] hover:text-[#1d1d1f]'}`}
            >
              {item}{item === '全部' ? ` ${mentorTools.length}` : ''}
            </button>
          ))}
        </div>
        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleTools.map((tool) => (
              <motion.div layout key={tool.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}>
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section>
        <SectionHeading eyebrow="GROW AS A MENTOR" title="师父也要持续成长" description="先测自己在哪些维度已经稳定，再用搭架子方法把支撑落到徒弟的每一个具体卡点。" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-black/[.07] bg-white/75 p-6 md:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-[#1d1d1f]">师父胜任力测评</h3>
                <p className="mt-2 text-xs text-[#6e6e73]">21 题 · 约 5 分钟 · 七维度</p>
              </div>
              <span className="text-3xl font-black text-neon-purple">105</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {mentorGrowth.competency.dimensions.map((dimension) => <span key={dimension} className="rounded-lg bg-neon-purple/10 px-3 py-1.5 text-xs font-bold text-neon-purple">{dimension}</span>)}
            </div>
            <div className="mt-6">
              <h4 className="text-xs font-black text-[#1d1d1f]">评分锚点</h4>
              <TextList items={mentorGrowth.competency.anchors} className="mt-3 text-xs" />
            </div>
            <div className="mt-6 space-y-2">
              {mentorGrowth.competency.levels.map((level) => (
                <div key={level.name} className="grid grid-cols-[84px_64px_1fr] items-center gap-2 rounded-xl bg-[#f5f5f7] px-3 py-2.5 text-xs">
                  <span className="font-black text-[#1d1d1f]">{level.name}</span>
                  <span className="font-bold text-neon-purple">{level.range}</span>
                  <span className="text-[#6e6e73]">{level.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-black/[.07] bg-white/75 p-6 md:p-8">
            <h3 className="text-xl font-black text-[#1d1d1f]">七环搭架子</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#6e6e73]">常态每关约 20-25 小时。时间是原工具图中的参考投入，不是要求师父代做。</p>
            <div className="mt-6 space-y-3">
              {mentorGrowth.scaffold.map((item, index) => (
                <div key={item.stage} className="grid grid-cols-[28px_54px_58px_1fr] items-start gap-2 rounded-xl border border-black/[.05] p-3 text-xs">
                  <span className="font-black text-neon-purple">{index + 1}</span>
                  <span className="font-black text-[#1d1d1f]">{item.stage}</span>
                  <span className="font-bold text-[#6e6e73]">{item.time}</span>
                  <span className="leading-relaxed text-[#515154]">{item.support}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-neon-blue/20 bg-gradient-to-br from-neon-blue/[.07] to-neon-purple/[.06] p-6 md:p-10">
        <SectionHeading eyebrow="MENTORSHIP TALK" title="师徒面谈，不只谈什么时候过级" description="先理解徒弟为什么来、能投入什么、希望怎样被支持，再共同写下三级九关与拆研班路径。" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white/75 p-5">
            <h3 className="text-sm font-black text-[#1d1d1f]">{talkSheets.apprenticeReflection.title}</h3>
            <TextList items={talkSheets.apprenticeReflection.prompts} className="mt-4 text-xs" />
          </div>
          <div className="rounded-2xl bg-white/75 p-5">
            <h3 className="text-sm font-black text-[#1d1d1f]">{talkSheets.mentorExpectations.title}</h3>
            <TextList items={talkSheets.mentorExpectations.prompts} className="mt-4 text-xs" />
          </div>
          <div className="rounded-2xl bg-white/75 p-5">
            <h3 className="text-sm font-black text-[#1d1d1f]">{talkSheets.growthPath.title}</h3>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {talkSheets.growthPath.fields.map((field) => <span key={field} className="rounded bg-neon-blue/10 px-2 py-1 text-[11px] font-bold text-[#42607a]">{field}</span>)}
            </div>
            <TextList items={talkSheets.growthPath.milestones} className="mt-4 text-xs" />
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-black/[.06] bg-white/70 p-5">
          <h3 className="text-sm font-black text-[#1d1d1f]">带徒实践原则</h3>
          <TextList items={mentorCamp.practices} className="mt-4 text-xs md:columns-2 md:gap-8 md:space-y-4" />
        </div>
      </section>

      <section className="rounded-3xl border border-black/[.07] bg-[#1d1d1f] p-6 text-white md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-bold tracking-[0.18em] text-cyan-300">LINEAGE · AS OF {lineage.asOf}</div>
            <h2 className="mt-3 text-2xl font-black md:text-3xl">师承，是一张持续生长的关系网络</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/65">{lineage.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[480px]">
            {[
              [lineage.members, '拆书家'],
              [lineage.pairs, '师徒对'],
              [lineage.trees, '师承树'],
              [lineage.records, '关系记录'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-white/[.06] p-4 text-center">
                <div className="text-2xl font-black text-cyan-300">{value.toLocaleString()}</div>
                <div className="mt-1 text-[11px] text-white/55">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

function PersonalMentorship() {
  return (
    <motion.section {...fadeUp} className="mt-16 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[.07] via-white/60 to-neon-purple/[.06] p-6 md:p-10">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-2xl text-white shadow-lg">师</div>
        <div>
          <div className="text-xs font-bold tracking-widest text-amber-600">MENTORSHIP · 专属师承</div>
          <h2 className="mt-1 text-2xl font-black text-[#1d1d1f] md:text-3xl">{mentorship.title}</h2>
          <p className="mt-1 text-sm font-medium text-[#6e6e73]">{mentorship.subtitle}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <p className="text-sm leading-relaxed text-[#424245] md:text-base">{mentorship.desc}</p>
          <h3 className="mt-8 text-base font-black text-[#1d1d1f]">师承对拆书家意味着什么</h3>
          <TextList items={mentorship.value} className="mt-4" />
          <div className="mt-8 rounded-2xl border border-amber-500/20 bg-white/60 p-5">
            <div className="text-xs font-bold tracking-widest text-amber-600">证书上的师承</div>
            <p className="mt-2 text-sm leading-relaxed text-[#6e6e73]">{mentorship.certificate}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-6">
          <div className="text-xs font-bold tracking-widest text-amber-600">我的师承 · 栗子师父</div>
          <div className="mt-4 space-y-3">
            {mentorship.myMentor.timeline.map((item) => (
              <div key={item.date} className="flex gap-3 rounded-xl border border-amber-500/15 bg-white/60 p-4">
                <div className="shrink-0 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-700">{item.date}</div>
                <div className="text-sm font-medium text-[#424245]">{item.event}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-amber-500/15 pt-5">
            <h4 className="text-sm font-black text-[#1d1d1f]">栗子师父对徒弟的价值</h4>
            <TextList items={mentorship.myMentor.value} className="mt-3 text-xs" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-amber-500/15 pt-8">
        <p className="text-sm text-[#6e6e73]">想要栗子师父带你走三级九关？</p>
        <a href={mentorship.contact.wechatUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:scale-105">
          {mentorship.contact.wechat}
        </a>
        <a href={mentorship.contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-amber-500/40 px-6 py-3 text-sm font-bold text-amber-700 transition-all hover:bg-amber-500/10">
          预约 15 分钟聊聊
        </a>
      </div>
    </motion.section>
  )
}

function AIAdvancement() {
  return (
    <motion.section {...fadeUp} className="mt-12 rounded-3xl border border-neon-purple/30 bg-gradient-to-br from-neon-purple/10 via-white/50 to-neon-blue/10 p-6 md:p-10">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-blue text-white shadow-lg shadow-purple-500/20">{levelIcons[3]}</div>
        <div>
          <div className="text-xs font-bold tracking-widest text-neon-purple">拆书帮 × AI 实验室</div>
          <h2 className="mt-1 text-2xl font-black text-[#1d1d1f] md:text-3xl">{mentorship.aiPath.title}</h2>
          <p className="mt-1 text-sm font-medium text-[#6e6e73]">{mentorship.aiPath.subtitle}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <p className="text-sm leading-relaxed text-[#424245] md:text-base">{mentorship.aiPath.desc}</p>
          <h3 className="mt-8 text-base font-black text-[#1d1d1f]">加入 AI 实验室，你能拿到什么</h3>
          <TextList items={mentorship.aiPath.value} className="mt-4" />
          <div className="mt-8 rounded-2xl border border-neon-purple/20 bg-white/60 p-5">
            <div className="text-xs font-bold tracking-widest text-neon-purple">AI 实验室专属认证</div>
            <p className="mt-2 text-sm leading-relaxed text-[#6e6e73]">{mentorship.aiPath.certificate}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-neon-purple/20 bg-gradient-to-br from-neon-purple/10 to-neon-blue/5 p-6">
          <div className="text-xs font-bold tracking-widest text-neon-purple">AI 实验室专属认证路径</div>
          <div className="mt-4 space-y-3">
            {mentorship.aiPath.timeline.map((item, index) => (
              <div key={item.step} className="flex gap-3 rounded-xl border border-neon-purple/15 bg-white/60 p-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neon-purple/15 text-xs font-bold text-neon-purple">{index + 1}</div>
                <div>
                  <div className="text-xs font-bold text-neon-purple">{item.step}</div>
                  <div className="mt-1 text-sm font-medium text-[#424245]">{item.event}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-neon-purple/15 pt-5">
            <h4 className="text-sm font-black text-[#1d1d1f]">AI 实验室能帮你做到</h4>
            <TextList items={mentorship.aiPath.mentorValue} className="mt-3 text-xs" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-neon-purple/15 pt-8">
        <p className="text-sm text-[#6e6e73]">想让 AI 成为你的拆书加速器？</p>
        <a href={mentorship.contact.wechatUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105">
          {mentorship.aiPath.contactText}
        </a>
        <a href={mentorship.contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-neon-purple/40 px-6 py-3 text-sm font-bold text-neon-purple transition-all hover:bg-neon-purple/10">
          预约 15 分钟聊聊
        </a>
      </div>
    </motion.section>
  )
}

export default function LearningPath() {
  const [audience, setAudience] = useState('learner')

  return (
    <div className="pt-24 pb-20">
      <section className="relative overflow-hidden pb-10">
        <div className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-neon-purple/10 blur-[128px]" />
        <div className="absolute bottom-0 right-1/3 h-80 w-80 rounded-full bg-neon-blue/10 blur-[128px]" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-5 inline-block rounded-full border border-neon-purple/30 bg-neon-purple/10 px-4 py-1.5 text-sm text-neon-purple">拆书帮人才发展 · 2026 版</div>
            <h1 className="mb-6 text-4xl font-black leading-tight md:text-6xl">
              <span className="gradient-text">从新人到三级拆书家</span>
              <br />
              <span className="text-[#1d1d1f]">一条成长路，两种同行视角</span>
            </h1>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#6e6e73] md:text-lg">
              拆书帮的人才培养体系，从基础拆书家到拆书专家，每一步都有清晰的成长路径和认证标准。
              <br />
              新人看见自己怎样一关关成长，师父学会怎样陪伴、搭架子与赋能。
            </p>
            <div className="mx-auto mt-7 flex max-w-2xl items-center justify-center gap-3 rounded-full border border-black/[.06] bg-white/60 px-6 py-3 text-xs font-medium text-[#86868b] md:text-sm">
              <span className="font-bold text-[#1d1d1f]">官方升级认证</span>
              <span>·</span>
              <span className="font-bold text-neon-purple">AI 实验室专属认证</span>
              <span>·</span>
              <span className="font-bold text-amber-600">专属师承</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <motion.div {...fadeUp} className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            [totalStages, '三级九关', 'TF1-1 ~ TF3-3'],
            [totalScoringItems, '关键评分项', `${totalAiSkills} 个 AI 技能点`],
            [officialSkillCount, '能力地图要点', '新人成长路线'],
            [mentorTools.length, '师父赋能工具', '含模板与话术'],
          ].map(([value, label, sub]) => (
            <div key={label} className="rounded-2xl border border-black/[.06] bg-white/65 p-4 text-center md:p-5">
              <div className="text-2xl font-black text-neon-purple md:text-3xl">{value}</div>
              <div className="mt-1 text-xs font-bold text-[#1d1d1f] md:text-sm">{label}</div>
              <div className="mt-1 text-[11px] text-[#86868b]">{sub}</div>
            </div>
          ))}
        </motion.div>

        <div className="sticky top-20 z-30 mb-12 flex justify-center">
          <div className="inline-flex rounded-2xl border border-black/[.08] bg-white/90 p-1.5 shadow-lg shadow-black/[.04] backdrop-blur-xl" role="group" aria-label="选择成长路线视角">
            {[
              { id: 'learner', label: '新人成长路线', sub: '我怎样过九关' },
              { id: 'mentor', label: '师父带徒赋能', sub: '我怎样陪人过关' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={audience === item.id}
                onClick={() => setAudience(item.id)}
                className={`relative rounded-xl px-4 py-3 text-left transition-colors sm:px-7 ${audience === item.id ? 'text-white' : 'text-[#6e6e73] hover:text-[#1d1d1f]'}`}
              >
                {audience === item.id && <motion.span layoutId="audience-pill" className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue shadow-md shadow-purple-500/20" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
                <span className="relative block text-sm font-black">{item.label}</span>
                <span className={`relative mt-0.5 block text-[11px] ${audience === item.id ? 'text-white/75' : 'text-[#86868b]'}`}>{item.sub}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {audience === 'learner' ? <LearnerView key="learner-view" /> : <MentorView key="mentor-view" />}
        </AnimatePresence>

        <PersonalMentorship />
        <AIAdvancement />
      </section>
    </div>
  )
}
