"use client"

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleCadastro = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      setErro(error.message);
      return;
    }

    await supabase.from("usuario").insert({
      id: data.user?.id,
      nome,
      papel: "cliente",
    });

    router.push("/dashboard/veiculos");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Cadastro</h1>
      <input
        type="text"
        placeholder="Nome"
        className="border p-2 mb-3 rounded w-80"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
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
        onClick={handleCadastro}
        className="bg-green-600 text-white p-2 rounded w-80 hover:bg-green-700"
      >
        Cadastrar
      </button>
      <p className="mt-4">
        Já tem conta?{" "}
        <a href="/login" className="text-blue-600 underline">
          Faça login
        </a>
      </p>
    </div>
  );
}