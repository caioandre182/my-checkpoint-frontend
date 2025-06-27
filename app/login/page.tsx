"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const loginSchema = z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres').max(32, 'A senha precisa ter no máximo 32 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [animateSword, setAnimateSword] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        console.log(data);
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#D8BFD8] to-[#4169E1] flex items-center justify-center">
            <div className="bg-[#1e1e1e] border border-[#333] shadow-xl rounded-xl p-8 w-full max-w-sm text-white">
                <div className="flex justify-center items-center">
                    <Image
                        src="/logo-mycheckpoint.png"
                        alt="Logo MyCheckPoint"
                        width={250}
                        height={120}
                        priority
                        className="m-0 p-0"
                    />
                    <Image
                        src="/espada.png" // coloque essa imagem em /public/espada.png
                        alt="Espada girando"
                        width={120}
                        height={120}
                        className={`ml-[-54px] ${animateSword ? "animate-sword" : ""}`}
                    />
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="text-sm font-medium text-gray-300">E-mail</label>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="email@exemplo.com"
                            className="w-full mt-1 p-3 rounded-md bg-[#2a2a2a] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onFocus={() => setAnimateSword(true)}
                            onBlur={() => setAnimateSword(false)}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-300">Senha</label>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="••••••••"
                            className="w-full mt-1 p-3 rounded-md bg-[#2a2a2a] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onFocus={() => setAnimateSword(true)}
                            onBlur={() => setAnimateSword(false)}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="mt-2 bg-blue-600 hover:bg-blue-700 transition-colors p-3 rounded-md font-semibold"
                        onMouseEnter={() => setAnimateSword(true)}
                        onMouseLeave={() => setAnimateSword(false)}
                    >
                        Entrar
                    </button>
                </form>

                <p className="text-sm text-center text-gray-400 mt-6">
                    Ainda não tem conta?{" "}
                    <a href="#" className="text-blue-400 hover:underline">
                        Cadastre-se
                    </a>
                </p>
            </div>
        </div>
    );
}
