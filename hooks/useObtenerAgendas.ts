// hooks/useObtenerAgendasConPacientes.ts
import { useAuth } from "@/components/AuthContext";
import { useState, useEffect } from "react";
import { Alert } from "react-native";

export const useObtenerAgendas = () => {
  const { accessToken } = useAuth();
  const [agendas, setAgendas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const obtenerAgendas = async () => {
    if (!accessToken) {
      Alert.alert("Error", "No hay token disponible.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/agenda`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Error al obtener agendas");

      const data = await res.json();

      const filtradas = data.filter(
        (a: any) => a.estadoAgenda === "activa" && a.user // solo las activas con paciente asociado
      );

      setAgendas(filtradas);
    } catch (error) {
      console.error("Error al obtener agendas:", error);
      Alert.alert("Error", "No se pudo cargar la lista de agendas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerAgendas();
  }, []);

  return { agendas, loading, obtenerAgendas };
};
