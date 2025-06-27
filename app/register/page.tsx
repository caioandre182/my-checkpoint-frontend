'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod"
import Image from "next/image"
import { User } from "lucide-react";

const registerSchema = z.object({
    name: z.string().min(2, 'Nome obrigatório'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres').max(32, 'A senha precisa ter no máximo 32 caracteres'),
    confirmPassword: z.string(),
    avatar: z.any(),
    bio: z.string().nonempty('A biografia é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas precisam ser iguais',
    path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const fileInputRef = useRef<HTMLInputElement>(null)

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setValue('avatar', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
    }

    const onSubmit = (data: RegisterFormData) => {
        console.log(data);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#D8BFD8] to-[#4169E1] flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-[#1e1e1e] border border-[#333] shadow-xl rounded-xl p-8 w-full max-w-sm text-white space-y-4">
                <h1 className="text-2xl font-bold text-center text-blue-500">Criar Conta</h1>

                <div>
                    <label className="block mb-1">Nome</label>
                    <input
                        type="text"
                        {...register('name')}
                        className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>

                <div>
                    <label className="block mb-1">E-mail</label>
                    <input
                        type="email"
                        {...register('email')}
                        className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>

                <div>
                    <label className="block mb-1">Senha</label>
                    <input
                        type="password"
                        {...register('password')}
                        className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>

                <div>
                    <label className="block mb-1">Confirmar Senha</label>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                    />
                    {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                </div>

                <div>
                    <label className="block mb-1">Biografia</label>
                    <input
                        type="text"
                        {...register('bio')}
                        className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                    />
                    {errors.bio && <span className="text-red-500 text-sm">{errors.bio.message}</span>}
                </div>

                {/* Avatar */}
                <div className="flex flex-col gap-2">
                    {avatarPreview && (
                        <>
                            <Image
                                src={avatarPreview}
                                alt="Preview do avatar"
                                width={80}
                                height={80}
                                className="rounded-full object-cover border border-[#555]"
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    setAvatarPreview('');
                                }}
                                className="text-sm text-red-400 hover:underline flex items-start mb-4 cursor-pointer"
                            >
                                Remover imagem
                            </button>
                        </>
                    )}
                </div>

                <div className="mb-4 mt-[-20px]">
                    {!avatarPreview && (
                        <>
                            <label className="block mb-1">Carregar Avatar</label>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-20 h-20 rounded-full bg-gray-800 border border-[#555] hover:border-blue-500 flex items-center justify-center group transition cursor-pointer"
                            >
                                <User />
                            </button>

                            <input
                                type="file"
                                accept="image/"
                                onChange={handleAvatarChange}
                                className="text-sm text-gray-300 sr-only"
                                ref={fileInputRef}
                            />
                        </>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                    Criar Conta
                </button>
            </form>
        </div>
    )
}