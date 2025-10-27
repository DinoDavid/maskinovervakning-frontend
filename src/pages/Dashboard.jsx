import React from 'react'
import useMachineStatus from '../hooks/useMachineStatus'
import MachineNode from '../components/MachineNode'
import StaffPanel from '../components/StaffPanel'
import { DashboardControls } from "../components/DashboardControls";

export default function Dashboard() {
  const { machines, toggleService } = useMachineStatus(5000)

  // Filtrer maskinene etter sykehus
  const radiumMachines = machines.filter(m => m.hospital === 'Radium')
  const ullevalMachines = machines.filter(m => m.hospital === 'Ullevål')

  return (
    <section>
      <StaffPanel />

      {/* RADIUM */}
      <h1 className="text-2xl font-bold mb-4">🏥 Radiumhospitalet</h1>
      {radiumMachines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-20 xl:gap-20 justify-center">
          {radiumMachines.map(m => (
            <MachineNode key={m.id} machine={m} onToggleService={toggleService} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 mb-8">Ingen maskiner funnet for Radiumhospitalet.</div>
      )}

      {/* ULLEVÅL */}
      <h1 className="text-2xl font-bold mt-10 mb-4">🏥 Ullevål sykehus</h1>
      {ullevalMachines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-20 xl:gap-20 justify-center">
          {ullevalMachines.map(m => (
            <MachineNode key={m.id} machine={m} onToggleService={toggleService} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500">Ingen maskiner funnet for Ullevål sykehus.</div>
      )}
      <p className="text-sm text-gray-500 mt-5">
        🟢 Normal 🔴 Feil 🟠 Assistanse ønsket 🟡 Assistanse ikke nødvendig ⚫ Offline 
      </p>
      <DashboardControls isDashboardMode={true} />
    </section>
  )
}
