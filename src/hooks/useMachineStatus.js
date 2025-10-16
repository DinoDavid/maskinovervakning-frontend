import { useEffect, useState, useRef } from 'react'
import * as api from '../services/api'


export default function useMachineStatus(pollInterval = 5000){
  const [machines, setMachines] = useState([])
  const mounted = useRef(false)

  useEffect(()=>{
    mounted.current = true
    let interval

    async function fetchData(){
      try {
        const res = await api.getMachines()
        let data = res
        if (res && typeof res === 'object' && Array.isArray(res.data)) data = res.data
        if (!Array.isArray(data)) {
          console.error('useMachineStatus: getMachines returned unexpected value:', res)
          data = []
        }
        if (mounted.current) setMachines(data)
      } catch (err) {
        console.error('useMachineStatus: fetch error', err)
        if (mounted.current) setMachines([])
      }
    }

    fetchData()
    interval = setInterval(fetchData, pollInterval)

    return () => { mounted.current = false; clearInterval(interval) }
  },[pollInterval])

  async function toggleService(id){
    try {
      const m = machines.find(x => x.id === id)
      if(!m) return
      const newStatus = m.status === 'red' ? 'green' : 'red'
      const res = await api.updateMachineStatus(id, newStatus)
      let updated = res
      if (res && typeof res === 'object' && res.data) updated = res.data
      if (!updated || !updated.id) {
        // fallback: optimistically update local state
        setMachines(prev => prev.map(x => x.id === id ? { ...x, status: newStatus } : x))
        return
      }
      setMachines(prev => prev.map(x => x.id === id ? updated : x))
    } catch (err) {
      console.error('useMachineStatus: toggleService error', err)
    }
  }

  return { machines, toggleService, setMachines }
}