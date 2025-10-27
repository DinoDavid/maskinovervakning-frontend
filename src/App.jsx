import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('auth') === 'true'
  })
  const [videoMode, setVideoMode] = useState(null) // 'ocean' | 'namibia' | null

  useEffect(() => {
    if (isAuthenticated) sessionStorage.setItem('auth', 'true')
    else sessionStorage.removeItem('auth')
  }, [isAuthenticated])


  return (
    <BrowserRouter basename="/maskinovervakning-frontend/">
      <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors">
        
        {/* HEADER */}
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          videoMode={videoMode}
          setVideoMode={setVideoMode}
        />

        {/* INNHOLD */}
        <main className="p-4 relative z-10">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login onLogin={() => setIsAuthenticated(true)} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
