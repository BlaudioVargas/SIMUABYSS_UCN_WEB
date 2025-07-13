import { useState } from "react";
import { crearPauta } from "@/app/api/api";

export function useCrearPauta(token: string | null) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const crear = async (pautaData: {
    nombre: string;
    descripcion: string;
    categoria: string;
    nivelAcademicoSugerido: string;
  }) => {
    if (!token) {
      setError("Token no disponible");
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      const pauta = await crearPauta(token, pautaData);
      return pauta;
    } catch (err: any) {
      setError(err.message || "Error al crear pauta");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { crear, loading, error };
}
