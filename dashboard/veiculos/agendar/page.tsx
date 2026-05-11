"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function AgendarPage() {
  const [veiculos, setVeiculos] = useState<any[]>([])
  const [veiculoId, setVeiculoId] = useState("")
  const [tipo, setTipo] = useState("servico")
  const [data, setData] = useState("")
  const [hora, setHora] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchVeiculos()
  }, [])

  const fetchVeiculos = async () => {
    const { data: user } = await supabase.auth.getUser()
    const { data, error } = await supabase.from("veiculo").select("*").eq("id_cliente", user?.user?.id)
    if (error) alert(error.message)
    else setVeiculos(data || [])
  }

  const handleAgendar = async () => {
    const { error } = await supabase.from("agendamento").insert({
      id_veiculo: veiculoId,
      tipo,
      data,
      hora
    })
    if (error) alert(error.message)
    else router.push("/dashboard/meus-agendamentos")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Agendar Serviço</h1>
      {veiculos.length === 0 && <p>Cadastre um veículo antes de agendar.</p>}
      {veiculos.length > 0 && (
        <>
          <select value={veiculoId} onChange={e => setVeiculoId(e.target.value)} className="border p-2 mb-2 block">
            <option value="">Selecione o veículo</option>
            {veiculos.map(v => <option key={v.id} value={v.id}>{v.marca} {v.modelo}</option>)}
          </select>
          <select value={tipo} onChange={e => setTipo(e.target.value)} className="border p-2 mb-2 block">
            <option value="servico">Serviço</option>
            <option value="avaliacao">Avaliação</option>
          </select>
          <input type="date" value={data} onChange={e => setData(e.target.value)} className="border p-2 mb-2 block"/>
          <input type="time" value={hora} onChange={e => setHora(e.target.value)} className="border p-2 mb-2 block"/>
          <button onClick={handleAgendar} className="bg-blue-600 text-white p-2 rounded">Agendar</button>
        </>
      )}
    </div>
  )
}