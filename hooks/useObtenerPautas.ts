import { useEffect, useState } from "react";
import { obtenerPautas } from "@/app/api/api";
import { Pauta } from "@/types/types"; // si la mueves a un archivo types.ts

export function useObtenerPautas(token: string | null) {
  const [pautas, setPautas] = useState<Pauta[]>([]); // ← aquí tipas correctamente
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchPautas = async () => {
      try {
        const data = await obtenerPautas(token);
        setPautas(data);
      } catch (err: any) {
        setError(err.message || "Error al obtener pautas");
      } finally {
        setLoading(false);
      }
    };

    fetchPautas();
  }, [token]);

  return { pautas, loading, error };
}
