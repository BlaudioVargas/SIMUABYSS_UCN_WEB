import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useAuth } from "@/components/AuthContext"; // ajusta el path si es necesario

const urlbackend = "http://localhost:3000"; // reemplaza con tu IP local

export const useObtenerPacientes = () => {
	const { accessToken } = useAuth();
	const [pacientes, setPacientes] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);

	const obtenerPacientes = async () => {
		if (!accessToken) {
			Alert.alert("Error", "No hay token disponible. Inicia sesión.");
			return;
		}

		setLoading(true);

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

			const data = await response.json();
			setPacientes(data);
		} catch (error: any) {
			console.error("Error:", error);
			Alert.alert("Error", "No se pudo obtener la lista de pacientes");
		} finally {
			setLoading(false);
		}
	};

	// Opcional: auto-cargar al montar
	useEffect(() => {
		obtenerPacientes();
	}, []);

	return { pacientes, loading, obtenerPacientes };
};
