import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SpeedInsights } from "@vercel/speed-insights/react"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SpeedInsights
        // projectId="speed-insights"
        // clientId="speed-insights"
        // clientSecret="speed-insights"
      >
        <App />
      </SpeedInsights>
    </BrowserRouter>
  </StrictMode>,
)
