import { useState, useEffect } from 'react'
import { getMachines, updateMachineStatus } from '../services/api'

export default function useMachineStatus(interval = 5000) {
  const [machines, setMachines] = useState([])
  const [serviceTimestamp, setServiceTimestamp] = useState(null)

  useEffect(() => {
    getMachines().then(setMachines)

    const timer = setInterval(() => {
      getMachines().then(setMachines)
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  const toggleService = (id) => {
    setMachines(prev =>
      prev.map(m => {
        if (m.id !== id) return m

        // definér statusrekkefølgen
        const order = ['green', 'red', 'orange', 'yellow', 'gray']
        const nextStatus = order[(order.indexOf(m.status) + 1) % order.length]
        const timestamp = new Date().toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit', hour12: false })

        let newTimestamp = m.timestamp

        // hvis status blir rød (ny feil) → lagre felles tidsstempel
        if (nextStatus === 'red') {
          setServiceTimestamp(timestamp)
          newTimestamp = timestamp
        }

        // hvis status er oransje eller gul → bruk felles timestamp
        if (nextStatus === 'orange' || nextStatus === 'yellow') {
          newTimestamp = serviceTimestamp
        }

        // hvis offline → vis eget tidspunkt
        if (nextStatus === 'gray') {
          newTimestamp = timestamp
        }

        // hvis tilbake til grønn → nullstill
        if (nextStatus === 'green') {
          newTimestamp = null
        }

        updateMachineStatus(id, nextStatus)
        return { ...m, status: nextStatus, timestamp: newTimestamp }
      })
    )
  }

  return { machines, toggleService }
}
