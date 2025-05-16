import React, { createContext, ReactNode } from "react";
import { loginUsuario } from "@/src/conexion_back/conexion";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type User = {
	id: string;
	name: string;
	email: string;
	role: string;
};

type AuthContextType = {
	//user: User | null;
	token: string | null;
	//login: (token: string, user: User) => Promise<void>;
	//logout: () => Promise<void>;
	//loading: boolean;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {

    const [accessToken, setAccessToken] = useLocalStorage<string | null>('accessToken', null);
    const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('refreshToken', null);




    return (
        <AuthContext.Provider value={{ token: 'token'}}>
            {children}
        </AuthContext.Provider>
    )
}