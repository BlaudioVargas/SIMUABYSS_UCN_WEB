import { useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useAuth } from "@/components/AuthContext"; // tu contexto actual

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const { loginConGoogle } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,
    responseType: 'id_token'
    //iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_ID!,
    //androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_ID!,

  });

  

  useEffect(() => {
    if (response?.type === "success") {

      const idToken = response.params?.id_token;
      if (!idToken) return;

      // Llama a loginConGoogle para validar en el backend
      loginConGoogle(idToken).catch((err) => {
        console.error("Error en el servidor:", err);
        alert("No se pudo iniciar sesión.");
      });
    }
  }, [response]);

  return { promptAsync, request };
};
