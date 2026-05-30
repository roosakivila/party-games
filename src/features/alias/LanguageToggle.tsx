import { cn } from '@/lib/utils'
import type { AliasLanguage } from './types'

interface LanguageToggleProps {
  value: AliasLanguage
  onChange: (language: AliasLanguage) => void
}

const OPTIONS: { value: AliasLanguage; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'fi', label: 'Suomi' },
]

export function LanguageToggle({ value, onChange }: LanguageToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Word language"
      className="grid grid-cols-2 gap-2 rounded-xl bg-muted p-1"
    >
      {OPTIONS.map((opt) => {
        const selected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              selected
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
