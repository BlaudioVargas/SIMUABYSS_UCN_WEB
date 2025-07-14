import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useAuth } from "@/components/AuthContext";

const urlbackend = "http://localhost:3000";

export type Paciente = {
  id: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  rut: string;
  email?: string;
  fechaNacimiento?: string;

  edad?: number;            // agregar
  motivo?: string;          // agregar
  prevision?: string;       // agregar
  comentarios?: string;     // agregar, que usas como nota
};


export const useObtenerPacientes = () => {
  const { accessToken } = useAuth();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const obtenerPacientes = async () => {
    if (!accessToken) {
      Alert.alert("Error", "No hay token disponible. Inicia sesión.");
      setError("Token no disponible");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${urlbackend}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Respuesta con error:", errorText);
        throw new Error("Error al obtener los pacientes");
      }

      const data: Paciente[] = await response.json();
      setPacientes(data);
    } catch (error: any) {
      console.error("Error:", error);
      setError("No se pudo obtener la lista de pacientes");
      Alert.alert("Error", "No se pudo obtener la lista de pacientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerPacientes();
  }, []);

  return { pacientes, loading, error, obtenerPacientes };
};
