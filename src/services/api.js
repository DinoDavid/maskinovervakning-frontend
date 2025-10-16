// Mock API - will be replaced by Flask REST calls later

// declare/initialize the internal machines store
let machines = [
  { id: 'm5', name: 'SB 5', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'm6', name: 'SB 6', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'm8', name: 'SB 8', status: 'green',   lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'm9', name: 'SB 9', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'm10', name: 'SB 10', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'm12', name: 'SB 12', status: 'green',   lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'm13', name: 'SB 13', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'm14', name: 'SB 14', status: 'green', lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'm15', name: 'SB 15', status: 'green',   lastSeen: Date.now(), serviceTimestamp: null },
  { id: 'm16', name: 'SB 16', status: 'green',   lastSeen: Date.now(), serviceTimestamp: null }
]

// Utility to randomly change some statuses (simulate connection loss)
function randomize(){
  machines = machines.map(m => {
    // small chance to become gray (lost connection)
    if (Math.random() < 0.05) return { ...m, status: 'gray', lastSeen: Date.now() - (1000*60*10) }
    return m
  })
}


// Polling/interval to simulate environment changes
setInterval(() => {
  try { randomize() } catch (e) { console.error('api.randomize error', e) }
}, 15000)


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