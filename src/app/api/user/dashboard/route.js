import { connectDB } from "@/connectdb/connectDB"
import { UserData } from "@/models/UserData";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { useSession } from "next-auth/react";


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

        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}