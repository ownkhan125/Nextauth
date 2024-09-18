import { connectDB } from "@/connectdb/connectDB"
import { User } from "@/models/User";
import { NextResponse } from "next/server"




export const POST = async (req) => {
    try {
        await connectDB();
        const { data } = await req.json();
        const { username, email, password } = data;
        const user = new User({
            username: username,
            email: email,
            password: password
        })
        await user.save();
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return NextResponse.json({ 'signup route:': error?.message }, { status: 500 })
    }
}