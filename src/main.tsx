import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import { SmoothScroll } from './lib/SmoothScroll'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*
      `reducedMotion="user"` makes every motion component honour the OS
      setting: transform and layout animations are skipped, opacity is kept.
      The CSS media query alone cannot do this - these animations are driven
      in JavaScript, not by CSS transitions.
    */}
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </MotionConfig>
  </StrictMode>,
)
