import { createContext, type Dispatch, useContext } from 'react'

import type { AliasState } from '../types'
import type { AliasAction } from './aliasReducer'

export interface AliasContextValue {
  state: AliasState
  dispatch: Dispatch<AliasAction>
}

export const AliasContext = createContext<AliasContextValue | null>(null)

export function useAlias(): AliasContextValue {
  const ctx = useContext(AliasContext)
  if (!ctx) {
    throw new Error('useAlias must be used within an AliasProvider')
  }
  return ctx
}
