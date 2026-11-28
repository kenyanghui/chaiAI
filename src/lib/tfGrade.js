// TF 智能分级引擎 — 拆书帮三级九拆启发式推断（非官方）
// 纯 ESM，无依赖，Node 与浏览器共用。

export const TF_LEVELS = ['TF1-1','TF1-2','TF2-1','TF2-2','TF2-3','TF2-4','TF3-1','TF3-2','TF3-3']

const LEVEL_META = {
  'TF1-1': { n: 1, short: '便签起步', tone: 'bg-sky-500/10 text-sky-600 border-sky-500/20', desc: '10 分钟单拆页 RIA 起步，重述与激活经验。' },
  'TF1-2': { n: 1, short: 'how讲解', tone: 'bg-sky-500/10 text-sky-600 border-sky-500/20', desc: 'how 拆页加分组指令，日常便签练级。' },
  'TF2-1': { n: 2, short: '目标设计', tone: 'bg-amber-500/10 text-amber-600 border-amber-500/20', desc: '可观察学习目标 + FAB + 显像提问。' },
  'TF2-2': { n: 2, short: '预防催化', tone: 'bg-amber-500/10 text-amber-600 border-amber-500/20', desc: '坏处 + 举例 + 预防异议 + 分步催化。' },
  'TF2-3': { n: 2, short: '细化演练', tone: 'bg-amber-500/10 text-amber-600 border-amber-500/20', desc: '细化步骤 + 意译案例 + A3 演练。' },
  'TF2-4': { n: 2, short: '双页成课', tone: 'bg-amber-500/10 text-amber-600 border-amber-500/20', desc: '双拆页递进，完整一堂课。' },
  'TF3-1': { n: 3, short: '理念提炼', tone: 'bg-purple-500/10 text-purple-600 border-purple-500/20', desc: 'why/what 理念拆页 + 提炼 how 与适用边界。' },
  'TF3-2': { n: 3, short: '量表控场', tone: 'bg-purple-500/10 text-purple-600 border-purple-500/20', desc: '量表 + 剧本 + 选择题现场控场。' },
  'TF3-3': { n: 3, short: '微行动反馈', tone: 'bg-purple-500/10 text-purple-600 border-purple-500/20', desc: '微行动学习 + 回应式反馈。' },
}

export function tfMeta(level) {
  return LEVEL_META[level] || LEVEL_META['TF1-2']
}

// 关键词信号：正则（对 CJK 原文 + 拉丁小写拼接文本匹配），信号名用于 signals
const SIGNALS = [
  ['TF1-1', /拆书是什么|拆书帮|ria便签|重述|激活.*经验|规划应用/],
  ['TF1-2', /分组|指令|行动建议|复述|(^|[^a-z])how([^a-z]|$)/],
  ['TF2-1', /学习目标|可观察|可测量|学习者能|学员能|之后能|fab|特征.*优势.*利益|显像|情境画面/],
  ['TF2-2', /不做的坏处|糟糕的后果|反例|异议|预防|分步催化/],
  ['TF2-3', /细化|行动步骤|意译|本土|演练|角色扮演|a3|场景/],
  ['TF2-4', /两个拆页|递进|补充|完整|一堂课/],
  ['TF3-1', /(^|[^a-z])why([^a-z]|$)|(^|[^a-z])what([^a-z]|$)|理念|概念|适用边界|提炼|场景介绍/],
  ['TF3-2', /量表|自测|测评|剧本|编剧|选择题|控场/],
  ['TF3-3', /微行动|行动学习|回应式|反馈/],
]

const SIGNAL_NAMES = {
  'TF1-1': '起步信号', 'TF1-2': 'how/分组信号', 'TF2-1': '目标设计信号',
  'TF2-2': '预防催化信号', 'TF2-3': '细化演练信号', 'TF2-4': '双页信号',
  'TF3-1': '理念提炼信号', 'TF3-2': '控场信号', 'TF3-3': '反馈信号',
}

function normText(m) {
  const parts = [m.topic || '', m.remark || '', m.learnGoal || '']
  if (Array.isArray(m.texts)) parts.push(m.texts.join(' '))
  return parts.join(' ').toLowerCase().replace(/\s+/g, ' ')
}

export function gradeMemoir(m) {
  m = m || {}
  const text = normText(m)
  const duration = Number(m.duration) || 0
  const textsCount = Number(m.textsCount) || 0

  const scores = {}
  const signals = []
  for (const [level, re] of SIGNALS) {
    scores[level] = 0
    if (re.test(text)) {
      scores[level] += 2
      signals.push(SIGNAL_NAMES[level])
    }
  }

  const hasSignal = TF_LEVELS.some(l => scores[l] > 0)

  // 时长阶梯（无关键词信号时的主推断轴）
  if (!hasSignal) {
    if (duration <= 10) { scores['TF1-1'] += 1; signals.push(`时长${duration||'?'}min`) }
    else if (duration <= 20) { scores['TF1-2'] += 1; signals.push(`时长${duration}min`) }
    else if (duration <= 30) { scores['TF2-3'] += 1; signals.push(`时长${duration}min`) }
    else if (duration <= 60) { scores['TF2-4'] += 1; signals.push(`时长${duration}min`) }
    else if (duration <= 120) { scores['TF3-1'] += 1; signals.push(`时长${duration}min`) }
    else { scores['TF3-2'] += 1; signals.push(`时长${duration}min`) }
    // 引导语丰富度：清晰的学习目标句式 → 目标设计；演练指令 → 细化演练
    if ((m.remark || '').length >= 60 || /学习者能|学员能|之后能|能针对|能运用/.test(text)) {
      scores['TF2-1'] += 1; signals.push('学习目标句式')
    }
    if (/演练|角色扮演|案例|场景/.test(text)) {
      scores['TF2-3'] += 1; signals.push('演练指令')
    }
    if (textsCount >= 2 && duration >= 30) {
      scores['TF2-4'] += 1; signals.push(`双拆页${textsCount}×`)
    }
    if ((m.remark || '').length >= 200) {
      scores['TF3-1'] += 1; signals.push('长文理念')
    }
  } else if (textsCount >= 2 && duration >= 45) {
    scores['TF2-4'] += 1
    signals.push(`双拆页${textsCount}×/时长${duration}min`)
  }

  // 选最高分；平分时取更高级别（保守偏向成熟），无分兜底 TF1-2
  let best = 'TF1-2'
  let bestScore = 0
  for (const level of TF_LEVELS) {
    if (scores[level] >= bestScore && scores[level] > 0) {
      bestScore = scores[level]
      best = level
    }
  }
  if (bestScore === 0) signals.push('无显性信号·兜底日常练级')
  return { level: best, score: bestScore, signals }
}
