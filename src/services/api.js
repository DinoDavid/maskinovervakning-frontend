// Mock API - will be replaced by Flask REST calls later

// declare/initialize the internal machines store
let machines = [
  // Radium
  { id: 'r1', name: 'SB 2', hospital: 'Radium', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'r2', name: 'SB 5', hospital: 'Radium', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'r3', name: 'SB 6', hospital: 'Radium', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'r4', name: 'SB 7', hospital: 'Radium', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'r5', name: 'SB 8', hospital: 'Radium', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'r6', name: 'SB 9', hospital: 'Radium', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'r7', name: 'SB 10', hospital: 'Radium', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'r8', name: 'SB 12', hospital: 'Radium', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'r9', name: 'SB 13', hospital: 'Radium', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'r10', name: 'SB 14', hospital: 'Radium', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'r11', name: 'SB 15', hospital: 'Radium', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'r12', name: 'SB 16', hospital: 'Radium', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },

  // Ullevål 
  { id: 'u1', name: 'SB 1', hospital: 'Ullevål', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'u2', name: 'SB 2', hospital: 'Ullevål', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'u3', name: 'SB 3', hospital: 'Ullevål', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'u4', name: 'SB 4', hospital: 'Ullevål', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'u5', name: 'SB 6', hospital: 'Ullevål', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'u6', name: 'SB 7', hospital: 'Ullevål', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
]


export async function getMachines(){
  // Return a clone so callers don't mutate internal state
  return JSON.parse(JSON.stringify(machines))
}


export async function updateMachineStatus(id, newStatus){
  const idx = machines.findIndex(m => m.id === id)
  if(idx === -1) throw new Error('Not found')
  machines[idx].status = newStatus
  machines[idx].lastSeen = Date.now()
  if(newStatus === 'red') machines[idx].serviceTimestamp = Date.now()
  else machines[idx].serviceTimestamp = null
  return JSON.parse(JSON.stringify(machines[idx]))
}


// Helper to reset timestamps at midnight (simulate) - run once a day
export function resetTimestampsAtMidnight(){
  // For the prototype we simulate checking date and resetting if needed.
  // Real backend would handle this.
  const now = new Date()
  const hh = now.getHours()
  if(hh === 0){
    machines = machines.map(m => ({ ...m, serviceTimestamp: null }))
  }
}