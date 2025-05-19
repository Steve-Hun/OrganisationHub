console.log('Vite ⚡️ Rails')

import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/App'

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('react-app')
    
    if (container) {
      const root = createRoot(container)
      root.render(<App/>)
    }
  })
