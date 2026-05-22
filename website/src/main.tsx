import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'
import './index.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element #root not found in document.')

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
