import { useAuth } from "@/components/AuthContext";
import { useCallback } from "react";

export const useCrearAtencion = () => {
    const { accessToken} = useAuth();


	const crearAtencion = useCallback(async (data: any) => {
		const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/atencion`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
				// Agrega Authorization si lo necesitas
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) throw new Error("Error al crear atención");
		return await response.json();
	}, []);

	return { crearAtencion };
};
