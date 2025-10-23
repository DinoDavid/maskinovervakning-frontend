import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'

export default function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('auth') === 'true'
  })

  useEffect(() => {
    if(isAuthenticated) sessionStorage.setItem('auth','true')
    else sessionStorage.removeItem('auth')
  },[isAuthenticated])

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 body-tv transition-colors">
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className="p-4">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}