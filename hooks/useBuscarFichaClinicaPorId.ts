import { useState } from "react";
import { useAuth } from "@/components/AuthContext";

type FichaClinica = {
  id: number;
  user: {
    id: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno?: string;
    rut: string;
    fechaNacimiento?: string;
    edad?: number;
    sexo?: string;
    estadoCivil?: string;
    direccion?: string;
    telefonoPersonal?: string;
    email?: string;
    prevision?: string;
  };
  observacionesGenerales?: string;
  fechaCreacion: string;
  fechaUltimaAtencion?: string;
};

export function useBuscarFichaClinicaPorId() {
  const { accessToken } = useAuth();
  const [ficha, setFicha] = useState<FichaClinica | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buscarPorId(id: string | number) {
    if (!accessToken) {
      setError("No autorizado: token no disponible.");
      return;
    }
    setLoading(true);
    setError(null);
    setFicha(null);

    try {
      const res = await fetch(`http://localhost:3000/ficha-clinica/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || "Error al buscar ficha clínica");
      }

      const data: FichaClinica = await res.json();
      setFicha(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { ficha, buscarPorId, loading, error };
}
