import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ForWalletsPage from './pages/ForWalletsPage'
import ForVaultsPage from './pages/ForVaultsPage'
import ForCreatorsPage from './pages/ForCreatorsPage'
import DocsPage from './pages/DocsPage'
import ApplyPage from './pages/ApplyPage'
import CreatorDemoPage from './pages/CreatorDemoPage'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallet" element={<ForWalletsPage />} />
        <Route path="/vault" element={<ForVaultsPage />} />
        <Route path="/creator" element={<ForCreatorsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/creator-demo" element={<CreatorDemoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App

