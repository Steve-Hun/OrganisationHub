import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '../src/App'

document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('react-root')
    
    if (element) {
      window.csrfToken = element.dataset.csrfToken;
      
      const userId = parseInt(element.dataset.userId);
      
      const root = ReactDOM.createRoot(element)
      root.render(
        <React.StrictMode>
          <BrowserRouter>
            <App userId={userId} />
          </BrowserRouter>
        </React.StrictMode>
      )
    }
  })
