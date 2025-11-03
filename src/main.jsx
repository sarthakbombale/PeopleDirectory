import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// fade out preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader')
  if (preloader) {
    preloader.classList.add('fade-out')
    setTimeout(() => preloader.remove(), 600)
  }
})
