import { useState } from 'react';
import { useAuth } from '@/components/AuthContext';

interface CrearAgendaPayload {
  fichaClinicaId: number;
  responsableId: number;
  estudiantesIds: number[];
  motivoAtencion: string;
}

export function useAgendarAtencion() {
  const { accessToken, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const agendar = async (payload: CrearAgendaPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
        console.log(payload);
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/agenda`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Error al crear agenda');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { agendar, loading, error, success };
}
