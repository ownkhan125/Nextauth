'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signIn('credentials', { redirect: false, username, password })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center h-screen w-full">
                    <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                        <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>
                        <div className="mb-4 md:w-full">
                            <label htmlFor="email" className="block text-xs mb-1">Username or Email</label>
                            <input
                                className='p-3 w-full rounded-lg'
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                        </div>
                        <div className="mb-6 md:w-full">
                            <label htmlFor="password" className="block text-xs mb-1">Password</label>
                            <input
                                className='p-3 w-full rounded-lg'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                        <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded w-full">Login</button>
                        <a className="text-blue-700 text-center text-sm" href="/login">Forgot password?</a>
                    </div>
                </div>
            </form>

        </>



    )
}
