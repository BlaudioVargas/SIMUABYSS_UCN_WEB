import { crearUsuario } from "@/app/api/api";
import { useAuth } from "@/components/AuthContext";

export function useEnviarPaciente() {
  const { accessToken } = useAuth();

  const enviarPacienteAlBackend = async (pacienteData: any) => {
    console.log("Token usado para paciente:", accessToken);
    if (!accessToken) {
      throw new Error("Token de acceso no disponible");
    }

    console.log("Datos paciente:", pacienteData);
    return await crearUsuario(accessToken, pacienteData);
  };

  return { enviarPacienteAlBackend };
}

