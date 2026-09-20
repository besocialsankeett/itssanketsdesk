import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import './styles/variables.css'
import './styles/globals.css'
import './styles/animations.css'
import './styles/desk.css'

/* Tells CSS that JS is running, so [data-reveal] elements are allowed to
   start hidden. Without JS they stay visible and the page still reads. */
document.documentElement.classList.add('js-ready')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
