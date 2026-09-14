import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { MeetingProvider } from './lib/store.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MeetingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MeetingProvider>
  </StrictMode>,
)
