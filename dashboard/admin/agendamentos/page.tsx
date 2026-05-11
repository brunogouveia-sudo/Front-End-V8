"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminAgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<any[]>([])

  useEffect(() => {
    fetchAgendamentos()
  }, [])

  const fetchAgendamentos = async () => {
    const { data, error } = await supabase.from("agendamento").select("*").eq("status", "pendente")
    if (error) alert(error.message)
    else setAgendamentos(data || [])
  }

  const confirmar = async (id: string) => {
    const { error } = await supabase.from("agendamento").update({ status: "confirmado" }).eq("id", id)
    if (error) alert(error.message)
    else fetchAgendamentos()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Agendamentos Pendentes</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Veículo</th>
            <th className="p-2 text-left">Tipo</th>
            <th className="p-2 text-left">Data / Hora</th>
            <th className="p-2 text-left">Ação</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map(a => (
            <tr key={a.id} className="border-b">
              <td className="p-2">{a.id_veiculo}</td>
              <td className="p-2">{a.tipo}</td>
              <td className="p-2">{a.data} {a.hora}</td>
              <td className="p-2">
                <button onClick={() => confirmar(a.id)} className="bg-green-600 text-white p-1 rounded">Confirmar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}