'use client';



import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();  // For handling redirection

    // Loading state while session is being fetched
    if (status === "loading") {
        return <p>Loading...</p>;
    }

    // If the user is logged in, show their details and a logout button
    if (session) {
        return (
            <div className="form-sign">
                <div className="my-4">
                    <h1>Welcome to your dashboard!</h1>
                    <p>User logged in: {session.user.email}</p>
                </div>
                {/* Logout Button */}
                <button className="btn"
                    onClick={() => {
                        signOut({
                            redirect: true,         // Redirect after sign out
                            callbackUrl: '/login'   // After logout, redirect to login page
                        });
                    }}
                >
                    Logout
                </button>
            </div>
        );
    }

    router.push('/login');
    return null;
};

export default Dashboard;





