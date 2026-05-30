import { useEffect, useRef } from 'react'

import { TURN_SECONDS } from '../types'

const TICK_MS = 250

/**
 * Drift-resistant countdown. When `active` becomes true, it captures an
 * end timestamp and ticks every 250ms, recomputing the remaining seconds
 * from `Date.now()` (so a backgrounded tab stays accurate). Fires `onTimeout`
 * once at zero. The interval is cleaned up on unmount or when `active` flips
 * to false.
 */
export function useTimer(
  active: boolean,
  onTick: (secondsRemaining: number) => void,
  onTimeout: () => void,
  durationSeconds: number = TURN_SECONDS
) {
  const onTickRef = useRef(onTick)
  const onTimeoutRef = useRef(onTimeout)
  onTickRef.current = onTick
  onTimeoutRef.current = onTimeout

  useEffect(() => {
    if (!active) return

    const endTimestamp = Date.now() + durationSeconds * 1000

    const computeAndEmit = () => {
      const remaining = Math.max(
        0,
        Math.ceil((endTimestamp - Date.now()) / 1000)
      )
      onTickRef.current(remaining)
      if (remaining <= 0) {
        clearInterval(intervalId)
        onTimeoutRef.current()
      }
    }

    const intervalId = setInterval(computeAndEmit, TICK_MS)
    computeAndEmit()

    return () => clearInterval(intervalId)
  }, [active, durationSeconds])
}
