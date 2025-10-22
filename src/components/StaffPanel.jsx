import React, { useState, useEffect } from 'react'

const employees = [
  'Torje', 'Haakon', 'Dawid', 'Rob', 'Martin', 'BjørnR',
  'Olav', 'BjørnU', 'Rahu', 'Stian', 'Said'
]

export default function StaffPanel() {
  const defaultStatus = Object.fromEntries(employees.map(name => [name, 'red']))
  const [statuses, setStatuses] = useState(() => {
    const saved = localStorage.getItem('staffStatuses')
    const savedDate = localStorage.getItem('staffStatusDate')
    const today = new Date().toLocaleDateString('no-NO')

    // Nullstill hvis dato er ny dag
    if (saved && savedDate === today) {
      return JSON.parse(saved)
    } else {
      localStorage.setItem('staffStatusDate', today)
      localStorage.setItem('staffStatuses', JSON.stringify(defaultStatus))
      return defaultStatus
    }
  })

  useEffect(() => {
    localStorage.setItem('staffStatuses', JSON.stringify(statuses))
  }, [statuses])

  const toggleStatus = (name) => {
    setStatuses(prev => {
      const current = prev[name]
      let next = 'red'
      if (current === 'red') next = 'green'
      else if (current === 'green') next = 'yellow'
      else next = 'red'
      return { ...prev, [name]: next }
    })
  }

  const getButtonClass = (color) => {
    const base = 'px-4 py-2 rounded-lg text-white font-medium shadow-md transition-colors duration-200'
    if (color === 'red') return `${base} bg-red-500 hover:bg-red-600`
    if (color === 'green') return `${base} bg-green-500 hover:bg-green-600`
    if (color === 'yellow') return `${base} bg-yellow-400 text-black hover:bg-yellow-500`
    return base
  }

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4">👷 Ansattstatus</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {employees.map(name => (
          <button
            key={name}
            onClick={() => toggleStatus(name)}
            className={getButtonClass(statuses[name])}
          >
            {name}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-3">
        🔴 Ikke på jobb &nbsp;&nbsp; 🟢 På jobb &nbsp;&nbsp; 🟡 Opptatt
      </p>
    </div>
  )
}
