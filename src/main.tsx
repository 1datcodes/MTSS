import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import App from './App.tsx'
import HomePage from './HomePage/HomePage'
import Resources from './Resources/Resources'
import Supports from './Supports/SupportPages'
import EditorTest from './EditorTest'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/supports" element={<Supports />} />
        <Route path="/editor" element={<EditorTest />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
