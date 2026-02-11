import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ForWalletsPage from './pages/ForWalletsPage'
import ForVaultsPage from './pages/ForVaultsPage'
import ForCreatorsPage from './pages/ForCreatorsPage'
import DocsPage from './pages/DocsPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallet" element={<ForWalletsPage />} />
        <Route path="/vault" element={<ForVaultsPage />} />
        <Route path="/creator" element={<ForCreatorsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

