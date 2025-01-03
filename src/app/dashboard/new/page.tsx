import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";
import { custom } from "zod";

export default async function NewTicket() {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/')
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

    async function handleRegisterTicket(formData: FormData) {
        'use server'

        const name = formData.get('name') 
        const description = formData.get('description') 
        const customerId = formData.get('customer') 

        if(!name || !description || !customerId) {
            return 
        }

    }

    

    return (
        <Container>
            <main className="mt-9 mb-2" >
                <div className="flex items-center gap-3">
                    <Link href='/dashboard' className="text-white px-4 py-1 rounded bg-gray-900">
                        Voltar
                    </Link>

                    <h1 className="text-3xl font-bold">Novo Chamado</h1>
                </div>

                <form className="flex flex-col mt-6" action={handleRegisterTicket}>
                    <label className="mb-1 font-medium text-lg">Nome do chamado</label>
                    <input
                        type="text"
                        className="w-full border-2 rounded-md px-2 mb-2 h-11"
                        placeholder="Digite o nome do chamado "
                        required
                        name="name"
                    />

                    <label className="mb-1 font-medium text-lg">Descreva o problema</label>
                    <textarea

                        className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
                        placeholder="Descreva o problema"
                        required
                        name="description"
                    ></textarea>

                    {customers.length !== 0 && (
                        <>
                            <label className="mb-1 font-medium text-lg">Selecione o cliente</label>
                            <select
                                className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-whitex"
                                name="customer"
                            >
                                {customers.map(customer => (
                                    <option
                                        key={customer.id}
                                        value={customer.id}
                                    >
                                        {customer.name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    {customers.length === 0 && (
                        <Link href='/dashboard/customer/new'>
                            Você ainda não tem nenhum cliente, <span className="text-blue-500 font-medium">Cadastrar Cliente</span>
                        </Link>
                    )}

                    <button type="submit"
                        className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:cursor-not-allowed"
                        disabled={customers.length === 0}
                    >
                        Cadastrar
                    </button>

                </form>
            </main>
        </Container >
    )
}