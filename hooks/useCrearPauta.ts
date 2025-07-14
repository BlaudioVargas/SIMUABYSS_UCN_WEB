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
    estructura: object;   // nuevo campo
    activa: boolean;      // nuevo campo
  }) => {
    if (!token) {
      setError("Token no disponible");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const pauta = await crearPauta(token, pautaData);
      console.log("Pauta creada:", pauta);
      return pauta;
    } catch (error) {
      console.error("Error creando pauta:", error);
      throw error;
    }
  };


  return { crear, loading, error };
}
