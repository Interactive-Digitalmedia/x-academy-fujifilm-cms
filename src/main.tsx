import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
// import './index.css'
import './global.css'
import posthog from 'posthog-js'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import { PlanProvider } from './context/PlanContext.tsx'

posthog.init('phc_5fIDGxBNeDvHyxxtwPxQXiGycSSm2M2HXWwOvZmj1DQ', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  session_recording: {
    maskTextSelector: '*' // Masks all text elements (not including inputs)
  }
})

localStorage.removeItem('vite-ui-theme')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <DndProvider backend={HTML5Backend}>
        {/* <PlanProvider> */}
        <App />
        {/* </PlanProvider> */}
      </DndProvider>
    </Router>
  </React.StrictMode>
)
