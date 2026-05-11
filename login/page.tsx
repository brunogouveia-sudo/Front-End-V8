"use client"

import { useState } from "react";
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });
    if (error) {
      setErro(error.message);
    } else {
      router.push("/dashboard/veiculos");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-3 rounded w-80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className="border p-2 mb-3 rounded w-80"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      {erro && <p className="text-red-500 mb-2">{erro}</p>}
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white p-2 rounded w-80 hover:bg-blue-700"
      >
        Entrar
      </button>
      <p className="mt-4">
        Não tem conta?{" "}
        <a href="/cadastro" className="text-blue-600 underline">
          Cadastre-se
        </a>
      </p>
    </div>
  );
}