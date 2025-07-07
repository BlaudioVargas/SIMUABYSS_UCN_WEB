import { Alert } from "react-native";
import { useAuth } from "@/components/AuthContext"; 

const urlbackend = "http://localhost/3000"; //poner .env

const camposObligatorios = ["nombres", "edad", "rut", "motivo", "causa"];

export const useEnviarPaciente = () => {
	const { accessToken } = useAuth();

	const enviarPacienteAlBackend = async (paciente: Record<string, any>) => {
		if (!accessToken) {
			Alert.alert("Error", "No hay token disponible. Inicia sesión.");
			return;
		}

		for (const campo of camposObligatorios) {
			if (!paciente[campo] || paciente[campo].toString().trim() === "") {
				Alert.alert("Campo obligatorio", `El campo "${campo}" es obligatorio`);
				return;
			}
		}

		const payload = camposObligatorios.reduce((acc, campo) => {
			acc[campo] = paciente[campo];
			return acc;
		}, {} as Record<string, any>);
		console.log(payload)
		try {
			const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error("Respuesta con error:", errorText);
				throw new Error("Error al crear el paciente");
			} 

			const data = await response.json();
			Alert.alert("Éxito", "Paciente creado correctamente");
			console.log("Paciente creado:", data);
		} catch (error: any) {
			console.error("Error:", error);
			Alert.alert("Error", "No se pudo guardar el paciente");
		}
	};

	return { enviarPacienteAlBackend };
};
