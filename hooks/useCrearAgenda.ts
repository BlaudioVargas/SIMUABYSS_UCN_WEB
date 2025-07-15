// hooks/useCrearAgenda.ts
import { useAuth } from "@/components/AuthContext";

type CrearAgendaParams = {
  userId: number;
  responsableId: number;
  pacienteNombre: string;
  edad: number;
  documento: string;
  nhc?: string;
  prestacion: string;
  prevision: string;
};

export const useCrearAgenda = () => {
  const { user, accessToken } = useAuth(); // ✅ válido aquí

  const crearAgenda = async ({
    userId,
    pacienteNombre,
    edad,
    documento,
    nhc,
    prestacion,
    prevision,
  }: CrearAgendaParams) => {
    const now = new Date().toISOString();

    const payload = {
      hora: now,
      pacienteNombre,
      edad: edad.toString(),
      documento,
      nhc: nhc ?? userId.toString(),  
      prestacion,
      prevision,
      estadoAgenda: "activa",
      /*
      estadoConfirmacion: "confirmado",
      estadoPresencia: "presente",

      derivado: false,
      pago: "Fonasa",
      
      horaLlegada: now,
      esperaMin: 0,
      horaEntrada: now,
      horaSalida: now,
      duracionMin: 20,
      nota: "Agenda generada automáticamente",
      box: "Box 1",
      sector: "General",
      */
      userId,
      responsableId: user?.id ?? 6, // Usa el ID del usuario logueado
    };

    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/agenda`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al crear agenda");

      const data = await res.json();
      console.log("✅ Agenda creada:", data);
      return data;
    } catch (error) {
      console.error("❌ Error al crear agenda:", error);
      throw error;
    }
  };

  return { crearAgenda };
};
