import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { config } from '../config/config'
import './index.css'

document.title = config.pageTitle;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
