// @/hooks/useBuscarHistoriaClinica.ts
import { useState } from "react";
import { buscarHistoriaPorRut } from "@/app/api/api";
import type { HistoriaClinica } from "@/types/types";

export function useBuscarHistoriaClinica() {
  const [historia, setHistoria] = useState<HistoriaClinica | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buscar(rut: string) {
    setLoading(true);
    setError(null);
    try {
      const data = (await buscarHistoriaPorRut(rut)) as HistoriaClinica;
      setHistoria(data);
    } catch (err: any) {
      setError(err.message || "Error al buscar historia clínica");
      setHistoria(null);
    } finally {
      setLoading(false);
    }
  }

  return { historia, buscar, loading, error };
}
