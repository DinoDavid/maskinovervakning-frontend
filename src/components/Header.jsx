import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'



export default function Header({ isAuthenticated, setIsAuthenticated, isDashboardMode}) {
const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
const location = useLocation()


  useEffect(() => {
    const root = document.documentElement
    if(dark){
      root.classList.add('dark')
      localStorage.setItem('theme','dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme','light')
    }
  },[dark])

  return (
    <header className="flex items-center justify-between px-4 py-3 shadow-sm bg-white/60 dark:bg-gray-800/60 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-indigo-600 w-12 h-12 flex items-center justify-center text-white font-semibold">AMF</div>
        <div>
          <div className="text-sm font-semibold">Maskinovervåkning</div>
          <div className="text-xs text-gray-600 dark:text-gray-300">Dashboard</div>
          <div className="flex flex-wrap gap-3 text-sm">
        </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark(d => !d)}
          className="px-3 py-1 border rounded-md text-sm bg-gray-100 dark:bg-gray-700"
        >
          Darkmode
        </button>
        {isAuthenticated && (
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1 rounded-md text-sm bg-red-500 text-white"
          >Logg ut</button>
        )}
      </div>
    </header>
  )
}

