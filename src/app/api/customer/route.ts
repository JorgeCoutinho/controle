
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');


    // Check if the user is authenticated
    if (!userId) {
        return NextResponse.json({ message: 'Failed delete customer' }, { status: 400 });
    }


    const findTicket = await prismaClient.ticker.findFirst({
        where: {
            customerId: userId as string
        }
    })

    // Check if the user has a ticket
    if (findTicket) {
        return NextResponse.json({ message: 'Failed delete customer' }, { status: 400 });
    }


    try {

        await prismaClient.customer.delete({
            where: {
                id: userId as string
            }
        })

        return NextResponse.json({ message: 'Customer deleted successfully' });

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: 'Failed delete customer' }, { status: 400 });
    }

}


// Rota para cadastrar um cliente
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