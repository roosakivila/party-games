import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { ScreenTransition } from '@/components/layout/ScreenTransition'
import { Toaster } from '@/components/ui/sonner'
import { HomePage } from '@/features/home/HomePage'
import { AliasPage } from '@/features/alias/AliasPage'
import { NeverHaveIEverPage } from '@/features/never-have-i-ever/NeverHaveIEverPage'
import { TruthOrDrinkPage } from '@/features/truth-or-drink/TruthOrDrinkPage'

function App() {
  return (
    <BrowserRouter>
      <ScreenTransition>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/alias" element={<AliasPage />} />
          <Route path="/never-have-i-ever" element={<NeverHaveIEverPage />} />
          <Route path="/truth-or-drink" element={<TruthOrDrinkPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ScreenTransition>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
