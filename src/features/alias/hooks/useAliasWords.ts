import { useEffect, useState } from 'react'

import type { AliasWordData } from '../types'

const WORDS_URL = `${import.meta.env.BASE_URL}data/alias/words.json`

let cache: AliasWordData | null = null

interface UseAliasWords {
  data: AliasWordData | null
  loading: boolean
  error: string | null
}

/** Fetches words.json once and caches it for the session. */
export function useAliasWords(): UseAliasWords {
  const [data, setData] = useState<AliasWordData | null>(cache)
  const [loading, setLoading] = useState(cache === null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (cache) return
    let cancelled = false

    fetch(WORDS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load words (${res.status})`)
        return res.json() as Promise<AliasWordData>
      })
      .then((json) => {
        cache = json
        if (!cancelled) {
          setData(json)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load words')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}
