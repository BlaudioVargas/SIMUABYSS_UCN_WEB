import { validarCredencialesOffline, obtenerListaFichaMedicaOffline  } from './conexion_demo/conexion';
import { enviarCredencialesAlBackend, obtenerListaFichaMedicaBackend  } from './conexion_back/conexion';



export async function validarCredenciales(usuario: string, clave: string)  {
  try {
    const data = await enviarCredencialesAlBackend(usuario, clave);
    return procesarRespuestaLogin(data);
  } catch (error) {
    console.error("Fallo en la conexión con el backend, usando respaldo local:", error);
    return validarCredencialesOffline(usuario, clave);
  }
}

export async function obtenerListaFichaMedica(usuario: string, clave: string) {
  try {
    const data = await obtenerListaFichaMedicaBackend(usuario, clave);
    return data;
  } catch (error) {
    console.error("Fallo en la conexión con el backend, usando respaldo local:", error);
    return obtenerListaFichaMedicaOffline(usuario, clave);
  }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

function procesarRespuestaLogin(data) {
  if (data && data.success) {
    return 1;
  }

  if (data && data.error) {
    if (data.error === "Usuario incorrecto") {
      return 2;
    } else if (data.error === "Contraseña incorrecta") {
      return 3;
    }
  }
  return 3;
}