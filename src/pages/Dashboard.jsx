import React from 'react'
import useMachineStatus from '../hooks/useMachineStatus'
import MachineNode from '../components/MachineNode'


export default function Dashboard(){
  const { machines, toggleService } = useMachineStatus(5000)

  // debug: print machines to browser console
  console.log('Dashboard machines:', machines)

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4"></h1>

      {machines && machines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-20 xl:gap-20">
          {machines.map(m => (
            <MachineNode key={m.id} machine={m} onToggleService={toggleService} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500">Ingen maskiner funnet. Laster eller feil i hook.</div>
      )}

      <div className="mt-6 text-sm text-gray-600 dark:text-gray-300"></div>
    </section>
  )
}