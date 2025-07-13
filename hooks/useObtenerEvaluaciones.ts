import { useEffect, useState } from "react";
import { obtenerEvaluaciones } from "@/app/api/api";

export function useObtenerEvaluaciones(token: string | null) {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchEvaluaciones = async () => {
      try {
        const data = await obtenerEvaluaciones(token);
        setEvaluaciones(data);
      } catch (err: any) {
        setError(err.message || "Error al obtener evaluaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluaciones();
  }, [token]);

  return { evaluaciones, loading, error };
}
