import React from 'react'
import { motion } from 'framer-motion'

const STATUS = {
  green: { label: 'AKTIV', bgClass: 'bg-green-500', hoverClass: 'hover:bg-green-600' },
  gray:  { label: 'OFFLINE',  bgClass: 'bg-gray-500',  hoverClass: 'hover:bg-gray-600' },
  red:   { label: 'SERVICE', bgClass: 'bg-red-500', hoverClass: 'hover:bg-red-600' },
  orange:  { label: 'ASSISTANCE',  bgClass: 'bg-orange-500',  hoverClass: 'hover:bg-orange-600' },
  yellow:   { label: 'NO ASSISTANCE', bgClass: 'bg-yellow-500', hoverClass: 'hover:bg-yellow-600' }
}

export default function MachineNode({ machine, onToggleService }){
  const s = STATUS[machine.status]

  return (
    <motion.button
      layout
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => onToggleService(machine.id)}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl shadow-md min-w-[140px] min-h-[120px] text-white transition-colors duration-500
        ${s.bgClass} ${s.hoverClass}`}
    >
      <div className="font-semibold text-lg">{machine.name}</div>
      <div className="text-sm">{s.label}</div>
      {machine.serviceTimestamp && (
        <div className="text-xs text-white/90">🕒Service: {new Date(machine.serviceTimestamp).toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit', hour12: false})}</div>
      )}
    </motion.button>
  )
}
