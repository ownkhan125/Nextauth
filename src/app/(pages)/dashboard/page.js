'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Dashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [image, setImage] = useState(null);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    const sendData = async () => {
        try {
            const name = document.querySelector('#name');
            const itemname = name.value;
            console.log('session', session.user);
            const newData = {
                email: session.user.email,
                image: image,
                itemname: itemname
            };

            const res = await fetch('/api/user/dashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newData })
            });

            name.value = '';
            setImage(null);

            if (res.ok) {
                const response = await res.json()
                console.log(response);
            } else {
                console.log('Error sending data');
            }
        } catch (error) {
            console.log('Signup page error:', error?.message);
        }
    };

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (session) {
        return (
            <div className="form-sign">
                <div className="my-4">
                    <h1>Welcome to your dashboard!</h1>
                    <p>User logged in: {session.user.email}</p>
                </div>

                <div className="p-3">
                    <label htmlFor="image" className="block text-sm text-slate-600 font-medium mb-1">
                        Item Image <span className="text-red-500">*</span>
                    </label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>

                <div className="p-3">
                    <label htmlFor="name" className="block text-sm text-slate-600 font-medium mb-1">
                        Item Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full text-sm text-slate-600 bg-white border border-slate-300 appearance-none rounded-lg px-3.5 py-2.5 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        placeholder="Name"
                        id="name"
                        required
                    />
                </div>

                <button className="btn my-2" onClick={sendData}>
                    Save Item
                </button>

                <button className="btn my-2" onClick={() => {
                    signOut({
                        redirect: true,
                        callbackUrl: '/login'
                    });
                }}>
                    Logout
                </button>
            </div>
        );
    }

    router.push('/login');
    return null;
};

export default Dashboard;
