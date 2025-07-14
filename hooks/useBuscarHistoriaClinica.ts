// @/hooks/useBuscarHistoriaClinica.ts
import { useState } from "react";
import { buscarHistoriaPorRut } from "@/app/api/api";
import type { HistoriaClinica } from "@/types/types";
import { useAuth } from "@/components/AuthContext";

export function useBuscarHistoriaClinica() {
  const { accessToken } = useAuth();
  const [historia, setHistoria] = useState<HistoriaClinica | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buscar(rut: string) {
    if (!accessToken) {
      setError("No autorizado: token no disponible.");
      return;
    }

    setLoading(true);
    setError(null);
    console.log("Buscando historia con RUT:", rut);  // <-- debug

    try {
      const data = await buscarHistoriaPorRut(accessToken, rut);
      console.log("Historia encontrada:", data);  // <-- debug
      setHistoria(data);
    } catch (err: any) {
      console.error("Error buscando historia:", err);
      setError(err.message || "Error al buscar historia clínica");
      setHistoria(null);
    } finally {
      setLoading(false);
    }
  }


  return { historia, buscar, loading, error };
}