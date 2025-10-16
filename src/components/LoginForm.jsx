import React, { useState } from 'react'


export default function LoginForm({ onSuccess }){
const [user, setUser] = useState('')
const [pass, setPass] = useState('')
const [err, setErr] = useState('')


function submit(e){
e.preventDefault()
if(user === 'Admin' && pass === 'Admin'){
setErr('')
onSuccess()
} else {
setErr('Feil brukernavn eller passord')
}
}


return (
<form onSubmit={submit} className="max-w-sm mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
<h2 className="text-xl font-semibold mb-4">Logg inn</h2>
<label className="block mb-2 text-sm">Brukernavn</label>
<input value={user} onChange={e=>setUser(e.target.value)} className="w-full mb-3 p-2 rounded border bg-gray-50 dark:bg-gray-700" />
<label className="block mb-2 text-sm">Passord</label>
<input type="password" value={pass} onChange={e=>setPass(e.target.value)} className="w-full mb-3 p-2 rounded border bg-gray-50 dark:bg-gray-700" />
{err && <div className="text-red-500 mb-2">{err}</div>}
<button className="w-full py-2 rounded bg-indigo-600 text-white">Logg inn</button>
</form>
)
}