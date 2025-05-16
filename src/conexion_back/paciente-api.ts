import { Alert } from "react-native";

const camposObligatorios = ["nombres", "edad", "rut", "motivo", "causa"];

export const enviarPacienteAlBackend = async (
	paciente: Record<string, any>,
	token: string
) => {
	// Validar campos obligatorios
	for (const campo of camposObligatorios) {
		if (!paciente[campo] || paciente[campo].toString().trim() === "") {
			Alert.alert("Campo obligatorio", `El campo "${campo}" es obligatorio`);
			return;
		}
	}

	// Construir payload con los campos obligatorios
	const payload = camposObligatorios.reduce((acc, campo) => {
		acc[campo] = paciente[campo];
		return acc;
	}, {} as Record<string, any>);

	try {
		const response = await fetch("http://TU_BACKEND_URL/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`, // si usas JWT
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
