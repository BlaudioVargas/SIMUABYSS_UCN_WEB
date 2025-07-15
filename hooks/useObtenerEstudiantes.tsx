import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthContext";

type Estudiante = {
  id: number;
  name: string;
  // otros campos si los hay
};

export function useObtenerEstudiantes() {
	const { accessToken } = useAuth();
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEstudiantes = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/usersystem/role/estudiante`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				if (!res.ok) throw new Error("Error al obtener estudiantes");
				const data = await res.json();
				setEstudiantes(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		if (accessToken) {
			fetchEstudiantes();
		}
	}, [accessToken]);

	return { estudiantes, loading, error };
}
