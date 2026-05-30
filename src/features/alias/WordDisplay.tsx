interface WordDisplayProps {
  word: string | null
}

export function WordDisplay({ word }: WordDisplayProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-2">
      {word ? (
        <p
          key={word}
          className="text-balance text-center text-5xl font-extrabold leading-tight tracking-tight animate-in fade-in zoom-in-95 duration-200"
        >
          {word}
        </p>
      ) : (
        <p className="text-center text-xl text-muted-foreground">
          No more words left.
        </p>
      )}
    </div>
  )
}
