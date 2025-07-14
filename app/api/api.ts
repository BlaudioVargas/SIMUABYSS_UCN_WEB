const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

// Función auxiliar para el fetch con token y JSON
async function fetchWithAuth(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  token: string | null,
  body?: any
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  console.log("fetchWithAuth - Método:", method);
  console.log("fetchWithAuth - Endpoint:", endpoint);
  console.log("fetchWithAuth - Headers:", headers);
  if (body) console.log("fetchWithAuth - Body:", body);

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(BASE_URL + endpoint, options);

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Error ${res.status}: ${errorBody}`);
  }

  if (res.status === 204) return null; // No content

  return await res.json();
}


// --- AUTH ---
// Login y register
export async function login(email: string, password: string) {
  return await fetchWithAuth("/auth/login", "POST", null, { email, password });
}

export async function registerDocente(data: {
  email: string;
  name: string;
  password: string;
  rut: string;
  fechaNacimiento: string;
}) {
  return await fetchWithAuth("/auth/register-docente", "POST", null, data);
}

export async function registerEstudiante(data: {
  email: string;
  name: string;
  password: string;
  rut: string;
  fechaNacimiento: string;
}) {
  return await fetchWithAuth("/auth/register-estudiante", "POST", null, data);
}

// --- AGENDA ---
export async function crearAgenda(
  token: string,
  data: {
    fichaClinicaId: number;
    responsableId: number;
    asignadoAId: number;
    motivoAtencion: string;
    precargarAtencion: boolean;
    datosPrecargados?: {
      motivo: string;
      anamnesis: string;
      exploracion: string;
      diagnostico: string;
      actuacion: string;
    };
  }
) {
  return await fetchWithAuth("/agenda", "POST", token, data);
}

export async function obtenerAgendas(token: string) {
  return await fetchWithAuth("/agenda", "GET", token);
}

export async function obtenerAgendaPorId(token: string, id: number) {
  return await fetchWithAuth(`/agenda/${id}`, "GET", token);
}

export async function actualizarAgenda(
  token: string,
  id: number,
  data: {
    motivoAtencion?: string;
    fichaClinicaId?: number;
    responsableId?: number;
    asignadoAId?: number;
  }
) {
  return await fetchWithAuth(`/agenda/${id}`, "PUT", token, data);
}

export async function eliminarAgenda(token: string, id: number) {
  return await fetchWithAuth(`/agenda/${id}`, "DELETE", token);
}

// --- ATENCION ---
export async function crearAtencion(
  token: string,
  data: {
    agendaId: number;
    motivo: string;
    anamnesis: string;
    exploracion: string;
    diagnostico: string;
    actuacion: string;
    esPrecargado: boolean;
  }
) {
  return await fetchWithAuth("/atencion", "POST", token, data);
}

export async function obtenerAtenciones(token: string) {
  return await fetchWithAuth("/atencion", "GET", token);
}

export async function obtenerAtencionPorId(token: string, id: number) {
  return await fetchWithAuth(`/atencion/${id}`, "GET", token);
}

export async function actualizarAtencion(
  token: string,
  id: number,
  data: {
    motivo?: string;
    anamnesis?: string;
    exploracion?: string;
    diagnostico?: string;
    actuacion?: string;
    esPrecargado?: boolean;
  }
) {
  return await fetchWithAuth(`/atencion/${id}`, "PUT", token, data);
}

export async function eliminarAtencion(token: string, id: number) {
  return await fetchWithAuth(`/atencion/${id}`, "DELETE", token);
}

// --- FICHA CLINICA ---
export async function crearFichaClinica(
  token: string,
  data: {
    userId: number;
    observacionesGenerales: string;
    fechaUltimaAtencion?: string;
  }
) {
  console.log("crearFichaClinica - Datos enviados:", data);
  const resultado = await fetchWithAuth("/ficha-clinica", "POST", token, data);
  console.log("crearFichaClinica - Resultado recibido:", resultado);
  return resultado;
}

export async function obtenerFichasClinicas(token: string) {
  console.log("obtenerFichasClinicas - Token:", token);
  const resultado = await fetchWithAuth("/ficha-clinica", "GET", token);
  console.log("obtenerFichasClinicas - Resultado recibido:", resultado);
  return resultado;
}

export async function obtenerFichaClinicaPorId(token: string, id: number) {
  console.log(`obtenerFichaClinicaPorId - Id: ${id}, Token:`, token);
  const resultado = await fetchWithAuth(`/ficha-clinica/${id}`, "GET", token);
  console.log("obtenerFichaClinicaPorId - Resultado recibido:", resultado);
  return resultado;
}

export async function actualizarFichaClinica(
  token: string,
  id: number,
  data: {
    observacionesGenerales?: string;
    fechaUltimaAtencion?: string;
  }
) {
  console.log(`actualizarFichaClinica - Id: ${id}, Datos:`, data);
  const resultado = await fetchWithAuth(`/ficha-clinica/${id}`, "PUT", token, data);
  console.log("actualizarFichaClinica - Resultado recibido:", resultado);
  return resultado;
}

export async function eliminarFichaClinica(token: string, id: number) {
  console.log(`eliminarFichaClinica - Id: ${id}, Token:`, token);
  const resultado = await fetchWithAuth(`/ficha-clinica/${id}`, "DELETE", token);
  console.log("eliminarFichaClinica - Resultado recibido:", resultado);
  return resultado;
}

// --- HISTORIA CLINICA ---
export async function crearHistoriaClinica(token: string, fichaClinicaId: number) {
  console.log("crearHistoriaClinica - fichaClinicaId:", fichaClinicaId);
  const resultado = await fetchWithAuth("/historia-clinica", "POST", token, { fichaClinicaId });
  console.log("crearHistoriaClinica - Resultado recibido:", resultado);
  return resultado;
}

export async function buscarHistoriaPorRut(token: string, rut: string) {
  console.log("buscarHistoriaPorRut - rut:", rut);
  const resultado = await fetchWithAuth(`/historia-clinica/rut/${rut}`, "GET", token);
  console.log("buscarHistoriaPorRut - Resultado recibido:", resultado);
  return resultado;
}

export async function obtenerHistoriasClinicas() {
  console.log("obtenerHistoriasClinicas");
  const resultado = await fetchWithAuth("/historia-clinica", "GET", null);
  console.log("obtenerHistoriasClinicas - Resultado recibido:", resultado);
  return resultado;
}


// --- EVALUACIONES ---
export async function crearEvaluacion(
  token: string,
  data: {
    puntaje_total: number;
    retroalimentacion: string;
    estudianteId: number;
    docenteId: number;
    atencionId: number;
  }
) {
  return await fetchWithAuth("/evaluaciones", "POST", token, data);
}

export async function obtenerEvaluaciones(token: string) {
  return await fetchWithAuth("/evaluaciones", "GET", token);
}

export async function obtenerEvaluacionPorId(token: string, id: number) {
  return await fetchWithAuth(`/evaluaciones/${id}`, "GET", token);
}

export async function actualizarEvaluacion(
  token: string,
  id: number,
  data: {
    puntaje_total?: number;
    retroalimentacion?: string;
    finalizada?: boolean;
  }
) {
  return await fetchWithAuth(`/evaluaciones/${id}`, "PATCH", token, data);
}

export async function eliminarEvaluacion(token: string, id: number) {
  return await fetchWithAuth(`/evaluaciones/${id}`, "DELETE", token);
}

// --- PAUTA ---
export async function crearPauta(
  token: string,
  data: {
    nombre: string;
    descripcion: string;
    categoria: string;
    nivelAcademicoSugerido: string;
  }
) {
  console.log("Token para crear pauta:", token);
  console.log("Headers enviados:", data);
  return await fetchWithAuth("/pauta", "POST", token, data);
}

export async function obtenerPautas(token: string) {
  return await fetchWithAuth("/pauta", "GET", token);
}

export async function obtenerPautaPorId(token: string, id: number) {
  return await fetchWithAuth(`/pauta/${id}`, "GET", token);
}

export async function actualizarPauta(
  token: string,
  id: number,
  data: {
    nombre?: string;
    descripcion?: string;
    categoria?: string;
    nivelAcademicoSugerido?: string;
  }
) {
  return await fetchWithAuth(`/pauta/${id}`, "PUT", token, data);
}

export async function eliminarPauta(token: string, id: number) {
  return await fetchWithAuth(`/pauta/${id}`, "DELETE", token);
}

// --- PAUTA APLICADA ---
export async function crearPautaAplicada(
  token: string,
  data: {
    pautaId: number;
    atencionId: number;
    respuestas: Array<{ itemId: number; valor: number; comentario?: string }>;
  }
) {
  return await fetchWithAuth("/pauta-aplicada", "POST", token, data);
}

export async function obtenerPautasAplicadas(token: string) {
  return await fetchWithAuth("/pauta-aplicada", "GET", token);
}

export async function obtenerPautaAplicadaPorId(token: string, id: number) {
  return await fetchWithAuth(`/pauta-aplicada/${id}`, "GET", token);
}

export async function actualizarPautaAplicada(token: string, id: number, data: { finalizada: boolean }) {
  return await fetchWithAuth(`/pauta-aplicada/${id}`, "PUT", token, data );
}

export async function eliminarPautaAplicada(token: string, id: number) {
  return await fetchWithAuth(`/pauta-aplicada/${id}`, "DELETE", null, token);
}



// --- PAUTA ITEM CLINICO ---
export async function obtenerItemsClinicos() {
  return await fetchWithAuth("/pauta-item-clinico", "GET", null);
}

export async function obtenerItemClinicoPorId(id: number) {
  return await fetchWithAuth(`/pauta-item-clinico/${id}`, "GET", null);
}

export async function crearItemClinico(
  data: {
    enunciado: string;
    puntaje: number;
    orden: number;
    area: string;
    tipo: string;
    puntajes: number[];
    opciones: string[];
    pauta: { id: number };
  }
) {
  return await fetchWithAuth("/pauta-item-clinico", "POST", null, data);
}

export async function actualizarItemClinico(
  id: number,
  data: Partial<{
    enunciado: string;
    puntaje: number;
    orden: number;
    area: string;
    tipo: string;
    puntajes: number[];
    opciones: string[];
    pauta: { id: number };
  }>
) {
  return await fetchWithAuth(`/pauta-item-clinico/${id}`, "PATCH", null, data);
}

export async function eliminarItemClinico(id: number) {
  return await fetchWithAuth(`/pauta-item-clinico/${id}`, "DELETE", null);
}

// --- RESPUESTA PAUTA ITEM ---
export async function crearRespuestaPautaItem(
  data: {
    respuesta: string;
    pautaAplicadaId: number;
    itemId: number;
  }
) {
  return await fetchWithAuth("/respuesta-pauta-item", "POST", null, data);
}

export async function actualizarRespuestaPautaItem(
  id: number,
  data: {
    respuesta: string;
  }
) {
  return await fetchWithAuth(`/respuesta-pauta-item/${id}`, "PATCH", null, data);
}

// --- USERSYSTEM (solo admin) ---
export async function obtenerUsuariosSistema(token: string) {
  return await fetchWithAuth("/usersystem", "GET", token);
}

export async function obtenerUsuarioSistemaPorId(token: string, id: number) {
  return await fetchWithAuth(`/usersystem/${id}`, "GET", token);
}

export async function crearUsuarioSistema(
  token: string,
  data: {
    email: string;
    name: string;
    rut: string;
    fechaNacimiento: string;
    role: "docente" | "estudiante" | "admin";
    password?: string;
  }
) {
    console.log("crearUsuario - Token:", token);
    console.log("crearUsuario - Data:", data);
  return await fetchWithAuth("/usersystem", "POST", token, data);
}

// --- USERS (pacientes) ---
export async function crearUsuario(
  token: string,
  data: {
    rut: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno?: string;
    fechaNacimiento: string; // ISO 8601, ej: "1990-01-01"
    edad?: string;
    sexo?: string;
    estadoCivil?: string;
    direccion?: string;
    telefonoPersonal?: string;
    email?: string;
    motivo?: string;
    prevision?: string;
    [key: string]: any; // Para que acepte otros campos opcionales
  }
) {
  console.log("crearUsuario - Token recibido:", token);
  console.log("crearUsuario - Data enviada:", data);

  try {
    const result = await fetchWithAuth("/users", "POST", token, data);
    console.log("crearUsuario - Respuesta:", result);
    return result;
  } catch (error: any) {
    console.error("crearUsuario - Error al crear usuario:", error.message);
    throw error; // para que arriba puedan manejar el error
  }
}



export async function actualizarUsuarioSistema(
  token: string,
  id: number,
  data: {
    email?: string;
    name?: string;
    rut?: string;
    fechaNacimiento?: string;
    role?: "docente" | "estudiante" | "admin";
  }
) {
  return await fetchWithAuth(`/usersystem/${id}`, "PUT", token, data);
}

// --- REGISTRAR PACIENTE (USUARIO SISTEMA, solo admin) ---
export async function registerPaciente(
  token: string,
  data: {
    email: string;
    name: string;
    password: string;
    rut: string;
    fechaNacimiento: string; // formato ISO: YYYY-MM-DD
    role?: "estudiante" | "docente" | "admin"; // para paciente usualmente 'estudiante'
  }
) {
  // Asegura que role sea 'estudiante' si no viene definido
  if (!data.role) data.role = "estudiante";

  return await fetchWithAuth("/usersystem", "POST", token, data);
}


export async function eliminarUsuarioSistema(token: string, id: number) {
  return await fetchWithAuth(`/usersystem/${id}`, "DELETE", token);
}

// --- USERS (pacientes) ---
export async function obtenerUsuarios(token: string) {
  return await fetchWithAuth("/users", "GET", token);
}

export async function obtenerUsuarioPorId(token: string, id: number) {
  return await fetchWithAuth(`/users/${id}`, "GET", token);
}

export async function actualizarUsuario(token: string, id: number, data: any) {
  return await fetchWithAuth(`/users/${id}`, "PUT", token, data);
}

export async function eliminarUsuario(token: string, id: number) {
  return await fetchWithAuth(`/users/${id}`, "DELETE", token);
}

export async function buscarUsuarioPorRut(token: string, rut: string) {
  return await fetchWithAuth(`/users/rut/${rut}`, "GET", token);
}


