import { supabase } from "@/lib/supabase";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const papel = await supabase
    .from("usuario")
    .select("papel")
    .eq("id", user?.id)
    .single()
    .then((res) => res.data?.papel || "cliente");

  return (
    <div className="min-h-screen flex">
      {/* Menu lateral */}
      <aside className="w-64 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          {papel === "cliente" ? (
            <>
              <li><a href="/dashboard/veiculos" className="hover:underline">Veículos</a></li>
              <li><a href="/dashboard/agendar" className="hover:underline">Agendar</a></li>
              <li><a href="/dashboard/meus-agendamentos" className="hover:underline">Meus Agendamentos</a></li>
            </>
          ) : (
            <>
              <li><a href="/dashboard/admin/agendamentos" className="hover:underline">Agendamentos</a></li>
              <li><a href="/dashboard/admin/ordens" className="hover:underline">Ordens</a></li>
              <li><a href="/dashboard/admin/faturamento" className="hover:underline">Faturamento</a></li>
            </>
          )}
        </ul>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}