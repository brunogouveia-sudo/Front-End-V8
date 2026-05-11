"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function VeiculosPage() {
  const [veiculos, setVeiculos] = useState<any[]>([])

  useEffect(() => {
    fetchVeiculos()
  }, [])

  const fetchVeiculos = async () => {
    const { data, error } = await supabase.from("veiculo").select("*")
    if (error) alert(error.message)
    else setVeiculos(data || [])
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Meus Veículos</h1>
      <a href="/dashboard/veiculos/novo" className="text-blue-600 underline mb-2 block">+ Cadastrar veículo</a>
      <ul className="space-y-2">
        {veiculos.map((v) => (
          <li key={v.id} className="border p-2 rounded">
            {v.marca} {v.modelo} - {v.placa}
          </li>
        ))}
      </ul>
    </div>
  )
}