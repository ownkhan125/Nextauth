'use client';

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [image, setImage] = useState(null);
    const [data, setData] = useState([]);


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
                // const response = await res.json()
            } else {
                console.log('Error sending data');
            }
        } catch (error) {
            console.log('Signup page error:', error?.message);
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = session.user.email;
                const res = await fetch(`/api/user/dashboard?email=${email}`, {
                    method: 'GET',
                });
                const response = await res.json();
                console.log(response);
            } catch (error) {
                console.log('dashboard page:', error);
            }
        };

        fetchData();
    }, []);




    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (session) {
        return (

            <>
                <div className="flex justify-between gap-2">
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



                    <div className="form-sign ">
                        <div className="my-4">
                            <h1>Your Items</h1>
                        </div>


                        {
                            data.map((item) => (
                                <div key={item.id} className="w-full flex items-center gap-x-2 bg-slate-200 rounded-lg max-h-[200px] overflow-auto my-4">
                                    <div>
                                        <div className="rounded-full overflow-hidden w-[60px] h-[60px]">
                                            <Image
                                                src={item.image || '/default-placeholder.png'}  // Fallback for missing images
                                                alt="User Image"
                                                width={60}
                                                height={60}
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full flex justify-between items-center">
                                        <h3>{item.name}</h3>
                                    </div>
                                </div>
                            ))
                        }


                    </div>

                </div>

            </>
        );
    }

    router.push('/login');
    return null;
};

export default Dashboard;
