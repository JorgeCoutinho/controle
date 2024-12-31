'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    phone: z.string().refine((value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value)
    }, {
        message: "O numero de telefone deve estar (DD) 999999999",
    }),
    address: z.string()
})

type FormData = z.infer<typeof schema> 

export const NewCustomerForm = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    return (
        <form action="">
            <label htmlFor="">Nome completo</label>
            <input
                type="text"
                placeholder="Nome completo"
            />
        </form>
    )
}
