/** JSON shape of a prompt list (e.g. public/data/nhie/prompts.json). */
export interface PromptData {
  prompts: string[]
}

export interface PromptDeckConfig {
  /** Game title shown on the start screen and header. */
  title: string
  /** Tagline shown on the start screen. */
  subtitle: string
  /** Path to the prompts JSON, relative to the app base (e.g. "data/nhie/prompts.json"). */
  dataUrl: string
  /** Start-button label (default "Start"). */
  startLabel?: string
  /** Next-button label (default "Next"). */
  nextLabel?: string
  /** Emoji shown on the start screen. */
  emoji?: string
}
