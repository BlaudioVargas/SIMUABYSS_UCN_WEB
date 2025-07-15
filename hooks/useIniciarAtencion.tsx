import { useAuth } from "@/components/AuthContext";

interface IniciarAtencionPayload {
  agendaId: number;
}

export function useIniciarAtencion() {
  const { accessToken } = useAuth();

  const iniciarAtencion = async (payload: IniciarAtencionPayload) => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/atencion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al iniciar atención");
      }

      return await res.json(); // contiene la atención creada, incluyendo su ID
    } catch (e) {
      console.error("Error al iniciar atención:", e);
      return null;
    }
  };

  return { iniciarAtencion };
}
