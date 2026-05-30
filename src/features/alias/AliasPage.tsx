import { PlayerSetup } from './PlayerSetup'
import { PreRound } from './PreRound'
import { RoundScreen } from './RoundScreen'
import { TurnEnded } from './TurnEnded'
import { AliasProvider } from './state/AliasProvider'
import { useAlias } from './state/AliasContext'

export function AliasPage() {
  return (
    <AliasProvider>
      <AliasFlow />
    </AliasProvider>
  )
}

function AliasFlow() {
  const { state } = useAlias()

  const renderPhase = () => {
    switch (state.phase) {
      case 'setup':
        return <PlayerSetup />
      case 'preRound':
        return <PreRound />
      case 'playing':
        return <RoundScreen />
      case 'turnEnded':
        return <TurnEnded />
      default:
        return <PlayerSetup />
    }
  }

  return (
    <div
      key={state.phase}
      className="flex min-h-[100dvh] flex-col animate-in fade-in slide-in-from-bottom-2 duration-200 ease-out"
    >
      {renderPhase()}
    </div>
  )
}
