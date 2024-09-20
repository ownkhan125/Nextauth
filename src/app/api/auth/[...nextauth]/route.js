import { connectDB } from "@/connectdb/connectDB";
import { User } from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            id: 'Verify',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            async authorize(credentials, req) {
                try {
                    await connectDB();
                    const { email, password } = credentials;
                    const user = await User.findOne({ email: email })
                    if (user) {
                        if (password === user.password) {
                            return user;
                        } else {
                            throw new Error('Incorrect password');
                        }
                    }

                } catch (error) {
                    console.log("catch error",error?.message);
                    return null
                }
            }
        }),

        // Login with Google
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,

        })
    ],

    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === "google") {
                console.log(profile);

                await connectDB();

                const existingUser = await User.findOne({ email: profile.email });
                if (existingUser) {
                    return true;
                }

                const user = await new User({
                    username: profile.name,
                    email: profile.email,
                    password: profile.at_hash
                })
                await user.save();
                return true;
            }
            return true
        },
    }
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
