import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions);
        console.log(session);

        return NextResponse.json({ succss: true }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
    }
}