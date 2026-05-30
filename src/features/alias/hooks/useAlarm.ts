import { useCallback } from 'react'

const ALARM_URL = `${import.meta.env.BASE_URL}sounds/alarm.mp3`

// Module-level singleton so the element unlocked on a user gesture (Start)
// is the same one triggered later (timeout), across separate components.
let audio: HTMLAudioElement | null = null
let unlocked = false

function getAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio(ALARM_URL)
    audio.preload = 'auto'
  }
  return audio
}

export interface UseAlarm {
  /** Call from a user gesture (e.g. Start) to satisfy mobile autoplay rules. */
  unlock: () => void
  /** Play the alarm from the start; safe to call programmatically. */
  trigger: () => void
}

export function useAlarm(): UseAlarm {
  const unlock = useCallback(() => {
    if (unlocked) return
    const a = getAudio()
    const prevMuted = a.muted
    a.muted = true
    a.play()
      .then(() => {
        a.pause()
        a.currentTime = 0
        a.muted = prevMuted
        unlocked = true
      })
      .catch(() => {
        a.muted = prevMuted
      })
  }, [])

  const trigger = useCallback(() => {
    const a = getAudio()
    try {
      a.currentTime = 0
    } catch {
      // currentTime may throw before metadata loads; ignore.
    }
    void a.play().catch(() => {
      // Autoplay rejected (e.g. never unlocked): fall back to visual state.
    })
  }, [])

  return { unlock, trigger }
}
