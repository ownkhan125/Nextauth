import { connectDB } from "@/connectdb/connectDB"
import { UserData } from "@/models/UserData";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import { User } from "@/models/User";


export const POST = async (req) => {
    try {

        await connectDB();
        const { newData } = await req.json();
        const { email, image, itemname } = newData;

        let user = await UserData.findOne({ email: email });
        if (user) {
            user.items.push({ image: image, name: itemname });
            await user.save();
        } else {
            user = new UserData({
                email,
                items: [{ image: image, name: itemname }],
            });
            await user.save();
        }
        const users = await UserData.find();

        return NextResponse.json(users, { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}


export const GET = async (req) => {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        console.log(email);
        let user = await UserData.findOne({ email });
        if (!user) {
            const find = await User.findOne({ email })
            console.log(find);
            const userItem = find.items
            return NextResponse.json(userItem, { status: 200 });
        }
        else {
            const userItem = user.items
            console.log('ibaad', userItem);
            return NextResponse.json(userItem, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
    }
};