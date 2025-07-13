import { useEffect, useState } from "react";
import { obtenerFichasClinicas } from "@/app/api/api";

// 1) Definimos la interfaz de la ficha:
export interface FichaClinica {
  id: number;
  user: {
    nombres: string;
    apellidoPaterno: string;
    rut: string;
  };
  observacionesGenerales?: string;
  fechaCreacion: string;
  fechaUltimaAtencion?: string;
}

export function useObtenerFichasClinicas(token: string | null) {
  // 2) Tipamos el estado como FichaClinica[]
  const [fichas, setFichas] = useState<FichaClinica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchFichas = async () => {
      try {
        const data = await obtenerFichasClinicas(token) as FichaClinica[];
        setFichas(data);
      } catch (err: any) {
        setError(err.message || "Error al obtener fichas clínicas");
      } finally {
        setLoading(false);
      }
    };

    fetchFichas();
  }, [token]);

  return { fichas, loading, error };
}