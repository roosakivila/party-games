import { PromptDeckScreen } from '@/features/prompt-deck/PromptDeckScreen'
import type { PromptDeckConfig } from '@/features/prompt-deck/types'

const config: PromptDeckConfig = {
  title: 'Truth or Drink',
  subtitle: 'Ready to spill some secrets? Answer honestly or take a sip.',
  dataUrl: 'data/tod/questions.json',
  emoji: '🥂',
  nextLabel: 'Next Question',
}

export function TruthOrDrinkPage() {
  return <PromptDeckScreen config={config} />
}
