import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loginUsuario } from "@/src/conexion_back/conexion";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { router } from "expo-router";

type User = {
	id: number;
	name: string;
	email: string;
	role: string;
};

type AuthContextType = {
	user: User | null;
	accessToken: string | null;
    refreshToken: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
    loginConGoogle: (idToken: string) => Promise<void>;
	loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [accessToken, setAccessToken] = useLocalStorage<string | null>('accessToken', null);
	const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('refreshToken', null);
	const [loading, setLoading] = useState(true);

	// Restaurar sesión si hay tokens guardados
	useEffect(() => {
		const restaurarSesion = async () => {
			// Si hay accessToken Y usuario ya fue guardado, mantener sesión
			if (accessToken && user) {
				setLoading(false);
				return;
			}

			// Si hay token pero no hay user, idealmente deberías tener un endpoint como /auth/me
			// Pero como no lo tienes, no se puede hacer más aquí.
			setLoading(false);
		};
		restaurarSesion();
	}, [accessToken]);

	const login = async (email: string, password: string) => {
		const { access_token, refresh_token, user } = await loginUsuario(email, password);

		setAccessToken(access_token);
		setRefreshToken(refresh_token);
		setUser(user);

		console.log("✅ Login exitoso");
	};

	const logout = async () => {
		setUser(null);
		setAccessToken(null);
		setRefreshToken(null);
	};

	const loginConGoogle = async (idToken: string) => {
		const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/auth/google`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ idToken }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Error al autenticar con Google");
		}

		const { accessToken, refreshToken, user } = await response.json();

		setAccessToken(accessToken);
		setRefreshToken(refreshToken);
		setUser(user);
	};

	// Redirigir según rol
	useEffect(() => {
		if (user?.role === 'docente') {
			router.replace('/docente/CrearPaciente');
		} else if (user?.role === 'estudiante') {
			router.replace('/estudiante/AtenderPaciente');
		}
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout, loginConGoogle, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
