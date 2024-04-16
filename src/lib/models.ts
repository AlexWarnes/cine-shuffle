export type ChallengeConfig = {
  name: string;
  rules: ActiveRule[]
}

export type BaseRule = {
  name: string;
  options: string[];
}

export type ActiveRule = BaseRule & {
  id: string;
  optionIndex: number;
}