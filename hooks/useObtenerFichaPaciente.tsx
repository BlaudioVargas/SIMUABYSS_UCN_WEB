import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthContext';

export function useObtenerFichaPaciente(rut: string) {
  const { accessToken } = useAuth();
  const [ficha, setFicha] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!rut || !accessToken) return;
    const fetchFicha = async () => {
      try {
        const resp = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users/rut/${rut}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!resp.ok) throw new Error('Error al obtener ficha clínica');
        const data = await resp.json();
        setFicha(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFicha();
  }, [rut, accessToken]);

  return { ficha, loading, error };
}
