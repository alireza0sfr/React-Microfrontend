import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '~/presentation/pages/App.tsx'
import '~/presentation/styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
