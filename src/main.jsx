import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { inject } from '@vercel/analytics'
import App from './App.jsx'
import './i18n/i18n.js'
import './index.css'

// Vercel Web Analytics — anonymous page-view counting, no cookies.
// Requires "Web Analytics" to be enabled for the project in the Vercel dashboard.
inject()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
