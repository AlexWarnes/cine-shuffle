import { type ChallengeConfig, type ActiveRule, type BaseRule } from "./models"

export const challengeConfig = $state<ChallengeConfig>({
  name: '',
  rules: []
})

export const rulesLibrary: Record<string, BaseRule> = {
  VIBE: {
    name: 'VIBE',
    options: [
      'fear',
      'relaxation',
      'excitement',
    ]
  },
  DURATION: {
    name: 'DURATION',
    options: [
      '<15s',
      '<60s',
      '60-120s',
      '>120s',
    ]
  },
  CAMERA: {
    name: 'CAMERA',
    options: [
      'mobile',
      'long take',
      'match cut',
      'push in',
      'static shot',
      'dolly zoom'
    ]
  },
  LIGHTS: {
    name: 'LIGHTS',
    options: [
      'natural',
      'red',
      'low key',
      'high key',
      'practicals'
    ]
  },
  SOUND: {
    name: 'SOUND',
    options: [
      'silent',
      'music',
      'voiceover',
      'no dialog',
    ]
  },
}

export function addRule(name: keyof typeof rulesLibrary): void {
  const baseRule = rulesLibrary[name]
  const activeRule: ActiveRule = {
    id: crypto.randomUUID(),
    optionIndex: Math.floor(Math.random() * baseRule.options.length),
    ...baseRule,
  }

  challengeConfig.rules.push(activeRule)
}

export function removeActiveRule(ruleID: string): void {
  challengeConfig.rules = challengeConfig.rules.filter(r => r.id !== ruleID)
}

export function shuffleActiveRule(ruleIndex: number): void {
  const ruleRef = challengeConfig.rules[ruleIndex]
  ruleRef.optionIndex = Math.floor(Math.random() * ruleRef.options.length)
}

export function generateAllConstraints(): void {
  const activeRules = Object.values(rulesLibrary).map(baseRule => {
    return {
      id: crypto.randomUUID(),
      optionIndex: Math.floor(Math.random() * baseRule.options.length),
      ...baseRule,
    }
  })
  challengeConfig.rules = activeRules;
}
