'use client';

import { BiSolidHide } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React from 'react'

const page = () => {

    const { register, handleSubmit } = useForm();
    const router = useRouter();


    const handleSubmitData = async (data) => {
        try {
            const result = await signIn(
                'Verify',
                {
                    ...data,
                    redirect: false
                }
            );

            if (result?.ok) {
                router.push('/dashboard');
            } else {
                router.push('/login');
            }


        } catch (error) {
            console.log('Login page:', error?.message);
        }

    }



    const handleGoogleSignIn = async () => {
        try {
            await signIn('google', { callbackUrl: '/dashboard' });
        } catch (error) {
            console.error("Google SignIn Error:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitData)} method="POST" className='form-sign'>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Email
                    </label>
                    <input type='email' placeholder='enter email here...' {...register("email")} />
                </div>


                <div className="mb-4 relative">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                        Password
                    </label>
                    <input type='password' placeholder='enter password here...' {...register("password")} />
                    <div className='absolute top-10 right-2 text-2xl cursor-pointer' onClick={() => Show()}><BiSolidHide /></div>
                </div>

                <div className="flex items-center justify-between my-3" >
                    <button
                        className="btn"
                        type="submit"
                    >
                        Login
                    </button>
                </div>

                <div className="flex items-center justify-between" >
                    <button
                        className="btn"
                        onClick={handleGoogleSignIn}
                    >
                        Login with Google
                    </button>
                </div>


            </form>

        </>
    );
};

export default page;


