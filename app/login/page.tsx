"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
    const [animateSword, setAnimateSword] = useState<boolean>(false);

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

                {/* futura animação da espada aqui */}

                <form className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-300">E-mail</label>
                        <input
                            type="email"
                            placeholder="email@exemplo.com"
                            className="w-full mt-1 p-3 rounded-md bg-[#2a2a2a] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onFocus={() => setAnimateSword(true)}
                            onBlur={() => setAnimateSword(false)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-300">Senha</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full mt-1 p-3 rounded-md bg-[#2a2a2a] text-white border border-[#444] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onFocus={() => setAnimateSword(true)}
                            onBlur={() => setAnimateSword(false)}
                        />
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
