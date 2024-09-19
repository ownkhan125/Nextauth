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
                router.push('/');
            }


        } catch (error) {
            console.log('Login page:', error?.message);
        }

    }

    return (
        <form onSubmit={handleSubmit(handleSubmitData)} className='form-sign'>

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



            <div className="flex items-center justify-between" >
                <button
                    className="btn"
                    type="submit"
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default page;


// 'use client'

// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import React from 'react'
// import { useForm } from 'react-hook-form'

// const page = () => {
//     const { register, handleSubmit } = useForm();
//     const router = useRouter();

//     const handleLoginFormSubmit = async (data) => {
//         try {
//             await signIn(
//                 'Verify',

//                 {
//                     ...data,
//                     redirect: false
//                 }
//             );
//             router.push("/dashboard")
//         } catch (error) {
//             console.log(error?.message);
//         }
//     }

//     return (
//         <>
//             <form onSubmit={handleSubmit(handleLoginFormSubmit)}>
//                 <input type='email' placeholder='enter email here...' {...register("email")} />
//                 <input type='password' placeholder='enter password here...' {...register("password")} />
//                 <button type='submit' >login</button>
//             </form>
//         </>
//     )
// }

// export default page