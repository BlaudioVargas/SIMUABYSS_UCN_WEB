import React, { createContext, ReactNode, useContext, useState } from "react";
import { loginUsuario } from "@/src/conexion_back/conexion";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type User = {
	id: number;
	name: string;
	email: string;
	role: string;
};

type AuthContextType = {
	user: User | null;
	token: string | null;
	login: (email: string, password: string) => Promise<void>;
	//logout: () => Promise<void>;
	//loading: boolean;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    return useContext(AuthContext);
};
export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useLocalStorage<string | null>('accessToken', null);
    const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('refreshToken', null);

    console.log('authprovider testing')


    const login = async (email: string, password: string) => {
        const { access_token , refresh_token, user} = await loginUsuario(email, password);

        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        setUser(user);

        console.log('Authoprovider login exitoso');
        console.log(accessToken);
        console.log(refreshToken);
    }

    const logout = () => {
        // setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
    };

    return (
        <AuthContext.Provider value={{ user ,token: 'token', login}}>
            {children}
        </AuthContext.Provider>
    )
}