"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminOrdensPage() {
  const [ordens, setOrdens] = useState<any[]>([])

  useEffect(() => {
    fetchOrdens()
  }, [])

  const fetchOrdens = async () => {
    const { data, error } = await supabase.from("ordem_servico").select("*")
    if (error) alert(error.message)
    else setOrdens(data || [])
  }

  const atualizarStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("ordem_servico").update({ status }).eq("id", id)
    if (error) alert(error.message)
    else fetchOrdens()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ordens de Serviço</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Veículo</th>
            <th className="p-2 text-left">Serviço</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Ação</th>
          </tr>
        </thead>
        <tbody>
          {ordens.map(o => (
            <tr key={o.id} className="border-b">
              <td className="p-2">{o.id_veiculo}</td>
              <td className="p-2">{o.servico}</td>
              <td className="p-2">{o.status}</td>
              <td className="p-2 space-x-1">
                {o.status === "rascunho" && <button onClick={() => atualizarStatus(o.id, "em_execucao")} className="bg-blue-600 text-white p-1 rounded">Iniciar</button>}
                {o.status === "em_execucao" && <button onClick={() => atualizarStatus(o.id, "finalizado")} className="bg-green-600 text-white p-1 rounded">Finalizar</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}