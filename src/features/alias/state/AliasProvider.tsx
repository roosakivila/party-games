import { type ReactNode, useReducer } from 'react'

import { AliasContext } from './AliasContext'
import { aliasReducer, createInitialAliasState } from './aliasReducer'

export function AliasProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    aliasReducer,
    undefined,
    createInitialAliasState
  )

  return (
    <AliasContext.Provider value={{ state, dispatch }}>
      {children}
    </AliasContext.Provider>
  )
}
