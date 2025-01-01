
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";


// POST /api/customer
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    }


    const { name, phone, email, address, userId } = await req.json();

    try {
        await prismaClient.customer.create({
            data: {
                name,
                phone,
                email,
                address: address ? address : "",
                userId: userId 
            }
        })
        return NextResponse.json({ message: 'Cliente cadastrado com sucesso!' });
    } catch (err) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }



    
}