"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function NovoVeiculoPage() {
  const [marca, setMarca] = useState("")
  const [modelo, setModelo] = useState("")
  const [placa, setPlaca] = useState("")
  const router = useRouter()

  const handleCadastro = async () => {
    const { data: user } = await supabase.auth.getUser()
    const { error } = await supabase.from("veiculo").insert({
      marca,
      modelo,
      placa,
      id_cliente: user?.user?.id
    })
    if (error) alert(error.message)
    else router.push("/dashboard/veiculos")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cadastrar Veículo</h1>
      <input placeholder="Marca" value={marca} onChange={e => setMarca(e.target.value)} className="border p-2 mb-2 block"/>
      <input placeholder="Modelo" value={modelo} onChange={e => setModelo(e.target.value)} className="border p-2 mb-2 block"/>
      <input placeholder="Placa" value={placa} onChange={e => setPlaca(e.target.value)} className="border p-2 mb-2 block"/>
      <button onClick={handleCadastro} className="bg-green-600 text-white p-2 rounded">Cadastrar</button>
    </div>
  )
}