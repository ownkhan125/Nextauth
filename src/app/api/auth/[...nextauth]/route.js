import { User } from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


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
                    console.log("Credentials: ?", credentials);
                    const { email, password } = credentials;
                    const user = await User.findOne({ email: email })
                    console.log('user data', user);
                    if (!user) {
                        return null
                    };

                    return user;
                } catch (error) {
                    console.log(error?.message);
                }
            }
        })
    ],
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
