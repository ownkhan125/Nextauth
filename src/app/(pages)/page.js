'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const [data, setData] = useState();
  const router = useRouter();


  const handleChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    const key = id || name;
    setData((prevData) => ({
      ...prevData,
      [key]: type === 'checkbox' ? checked : value,
    }));
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      })
      if (res.ok) {
        router.push('/login')
      }

    } catch (error) {
      console.log('Signup page:', error?.message);
    }

  }
  return (
    <>
      <div className="flex items-center  w-full">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">Sign up</span>
          <form className="mb-4" onSubmit={sendData} method="POST">
            <div className="mb-4 md:w-full">
              <label className="block text-xs mb-1">Username </label>
              <input
                required
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="text"
                name="username"
                id="username"
                onChange={handleChange}
                placeholder="Username"

              />
            </div>
            <div className="mb-4 md:w-full">
              <label className="block text-xs mb-1">Email</label>
              <input
                required
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                placeholder="email"

              />
            </div>
            <div className="mb-6 md:w-full">
              <label className="block text-xs mb-1">Password</label>
              <input
                required
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                placeholder="password"

              />
            </div>
            <button className="btn">Sign Up</button>
          </form>
        </div>
      </div>

    </>
  )
}

export default page