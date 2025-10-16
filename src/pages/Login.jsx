import React from 'react'
import LoginForm from '../components/LoginForm'


export default function Login({ onLogin }){
return (
<div className="flex items-center justify-center h-[calc(100vh-72px)]">
<LoginForm onSuccess={onLogin} />
</div>
)
}