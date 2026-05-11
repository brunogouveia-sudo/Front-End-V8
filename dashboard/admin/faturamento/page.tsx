"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminFaturamentoPage() {
  const [ordens, setOrdens] = useState<any[]>([])

  useEffect(() => {
    fetchOrdens()
  }, [])

  const fetchOrdens = async () => {
    const { data, error } = await supabase.from("ordem_servico").select("*").eq("status", "finalizado")
    if (error) alert(error.message)
    else setOrdens(data || [])
  }

  const registrarPagamento = async (id: string) => {
    const { error } = await supabase.from("faturamento").insert({ id_ordem: id, pago_em: new Date() })
    if (error) alert(error.message)
    else fetchOrdens()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Faturamento</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Veículo</th>
            <th className="p-2 text-left">Serviço</th>
            <th className="p-2 text-left">Ação</th>
          </tr>
        </thead>
        <tbody>
          {ordens.map(o => (
            <tr key={o.id} className="border-b">
              <td className="p-2">{o.id_veiculo}</td>
              <td className="p-2">{o.servico}</td>
              <td className="p-2">
                <button onClick={() => registrarPagamento(o.id)} className="bg-yellow-600 text-white p-1 rounded">Registrar Pagamento</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}