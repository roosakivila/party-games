import { PromptDeckScreen } from '@/features/prompt-deck/PromptDeckScreen'
import type { PromptDeckConfig } from '@/features/prompt-deck/types'

const config: PromptDeckConfig = {
  title: 'Never Have I Ever',
  subtitle: 'Tap through the prompts and see who fesses up.',
  dataUrl: 'data/nhie/prompts.json',
  emoji: '🙈',
}

export function NeverHaveIEverPage() {
  return <PromptDeckScreen config={config} />
}
