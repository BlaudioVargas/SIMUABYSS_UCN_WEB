// src/api/apiMock.ts
import { delay } from './utils'; // Función auxiliar para simular retraso de red

// Datos simulados (similar a tu backend)
const usuarios = [
  { usuario: 'admin', clave: '1234', rut: '1234-7' },
  { usuario: 'juan', clave: 'abcd', rut: '1234-8' },
];

const historialPorUsuario = {
  '1234-7': [
    { nombre: 'Juan Pérez', rut: '12.345.678-9', fecha: '2025-03-21' },
    { nombre: 'Ana Soto', rut: '11.223.334-5', fecha: '2025-01-15' },
  ],
  '1234-8': [
    { nombre: 'Carlos Ruiz', rut: '20.111.222-3', fecha: '2024-12-02' },
  ],
};

const pautasMedicas: Record<string, { id: string, nombre: string, descripcion: string }> = {
  "PM001": { id: "PM001", nombre: "Control de Hipertensión", descripcion: "Monitoreo de presión arterial semanal" },
  "PM002": { id: "PM002", nombre: "Diabetes Tipo 2", descripcion: "Control de glucosa y dieta diaria" },
  "PM003": { id: "PM003", nombre: "Rehabilitación Física", descripcion: "Ejercicios diarios guiados por kinesiólogo" },
};


const fichasMedicas: Record<string, any[]> = {
  "123456": [ // Ficha 1
      { nombre: "ID Documento", valor: "123456", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "N° de Historia", valor: "78910", tipo: "Numérico", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Documento (RUT)", valor: "12.345.678-9", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Nombres", valor: "Juan", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Apellido Paterno", valor: "Pérez", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Apellido Materno", valor: "Gutiérrez", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Fecha de Nacimiento", valor: "1985-03-15", tipo: "Fecha", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Edad", valor: "40", tipo: "Numérico", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Sexo", valor: "Varón", tipo: "Selección(Varón/Mujer)", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Profesional Asignado", valor: "Dr. Alfredo González", tipo: "Selección", seccion: "Datos Administrativos", obligatorio: true },
      { nombre: "Centro", valor: "CESFAM Central", tipo: "Selección", seccion: "Centro", obligatorio: true },
      { nombre: "Fecha de Inscripción", valor: "2022-10-01", tipo: "Fecha", seccion: "Datos Administrativos", obligatorio: true },
    ],
  "123457": [ // Ficha 2
      { nombre: "ID Documento", valor: "123457", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Nombres", valor: "Juan", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Apellido Paterno", valor: "Pérez", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Centro", valor: "CESFAM Central", tipo: "Selección", seccion: "Centro", obligatorio: true },
      { nombre: "Fecha de Inscripción", valor: "2023-05-01", tipo: "Fecha", seccion: "Datos Administrativos", obligatorio: true },
    ],
  "123458": [ // Ficha 3
      { nombre: "ID Documento", valor: "123458", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Nombres", valor: "Juan", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Apellido Paterno", valor: "Pérez", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Centro", valor: "CESFAM Central", tipo: "Selección", seccion: "Centro", obligatorio: true },
      { nombre: "Fecha de Inscripción", valor: "2024-01-10", tipo: "Fecha", seccion: "Datos Administrativos", obligatorio: true },
    ],
  "654321": [ // Ficha 1
      { nombre: "ID Documento", valor: "654321", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "N° de Historia", valor: "56789", tipo: "Numérico", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Documento (RUT)", valor: "20.111.222-3", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Nombres", valor: "Carlos", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Apellido Paterno", valor: "Ruiz", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Apellido Materno", valor: "Muñoz", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Fecha de Nacimiento", valor: "1990-07-10", tipo: "Fecha", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Edad", valor: "35", tipo: "Numérico", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Sexo", valor: "Varón", tipo: "Selección(Varón/Mujer)", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Profesional Asignado", valor: "Dra. Patricia Acuña", tipo: "Selección", seccion: "Datos Administrativos", obligatorio: true },
      { nombre: "Centro", valor: "CESFAM Norte", tipo: "Selección", seccion: "Centro", obligatorio: true },
      { nombre: "Fecha de Inscripción", valor: "2023-02-15", tipo: "Fecha", seccion: "Datos Administrativos", obligatorio: true },
    ],
    "654322": [ // Ficha 2
      { nombre: "ID Documento", valor: "654322", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Nombres", valor: "Carlos", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Apellido Paterno", valor: "Ruiz", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Centro", valor: "CESFAM Norte", tipo: "Selección", seccion: "Centro", obligatorio: true },
      { nombre: "Fecha de Inscripción", valor: "2023-08-10", tipo: "Fecha", seccion: "Datos Administrativos", obligatorio: true },
    ],
    "654323": [ // Ficha 3
      { nombre: "ID Documento", valor: "654323", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Nombres", valor: "Carlos", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Apellido Paterno", valor: "Ruiz", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
      { nombre: "Centro", valor: "CESFAM Norte", tipo: "Selección", seccion: "Centro", obligatorio: true },
      { nombre: "Fecha de Inscripción", valor: "2024-03-12", tipo: "Fecha", seccion: "Datos Administrativos", obligatorio: true },
    ],
  // etc.
};

const generarNuevoIdDocumento = (): string => {
  const idsExistentes = Object.keys(fichasMedicas).map(id => parseInt(id)).filter(n => !isNaN(n));
  const maxId = idsExistentes.length > 0 ? Math.max(...idsExistentes) : 123000;
  const nuevoId = maxId + 1;
  return nuevoId.toString().padStart(6, '0'); // rellena con ceros a la izquierda
};

type FichaUsuario = {
  id: string;
  nota?: string;
  comentario?: string;
  pautaMedicaId?: string; // ID de la pauta asociada
  datosPauta?: [string, string, string][]; // [nombre dato, tipo dato, valor]
};

const fichasPorUsuario: Record<string, FichaUsuario[]> = {
  "1234-7": [
    { id: "123456", nota: "7.0", comentario: "Revisar presión arterial" },
    { id: "123457", nota: "5.0", comentario: "" }
  ],
  "1234-8": [
    { id: "654321", nota: "5.6", comentario: "Paciente con hipertensión", pautaMedicaId: "PM001", datosPauta: [["dosis ml", "int", "15"]] }
  ]
};


const clientesPorUsuario = {
  '1234-7': [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'Ana Gómez' },
  ],
  '1234-8': [
    { id: 3, nombre: 'Carlos Díaz' },
    { id: 4, nombre: 'María Rodríguez' },
  ],
};

// Función para simular retraso de red
const simulateNetworkDelay = async () => {
  await delay(Math.random() * 1000 + 200); // Retraso entre 200-1200ms
};

// Función para autenticar usuario
const autenticar = (usuarioInput: string, claveInput: string) => {
  console.log(`[autenticar] Intento de login con usuario: ${usuarioInput}, clave: ${claveInput}`);
  return usuarios.find(u => u.usuario === usuarioInput && u.clave === claveInput) || null;
};


// Implementación de las funciones mock
export const fetchHistorial = async (rut: string, clave: string) => {
  console.log(`[fetchHistorial] Llamada con rut: ${rut}, clave: ${clave}`);
  await simulateNetworkDelay();
  const user = autenticar(rut, clave);
  if (!user) throw new Error('No autorizado');

  const datos = historialPorUsuario[user.rut];
  if (!datos) throw new Error('Datos no encontrados');

  return datos;
};

export const fetchPautasMedicas = async () => {
  await simulateNetworkDelay();
  return Object.values(pautasMedicas);
};

export const fetchFichas = async (usuario: string, clave: string) => {
  console.log(`[fetchFichas] Llamada con usuario: ${usuario}, clave: ${clave}`);
  await simulateNetworkDelay();
  const user = autenticar(usuario, clave);
  if (!user) throw new Error('No autorizado');

  const referencias = fichasPorUsuario[user.rut] || [];

  const datos = referencias.map(ref => {
    const ficha = fichasMedicas[ref.id];
    if (!ficha) return null;
    return [
      ...ficha,
      { nombre: "Nota", valor: ref.nota || "", tipo: "Texto", seccion: "Anotaciones", obligatorio: false },
      { nombre: "Comentario", valor: ref.comentario || "", tipo: "Texto", seccion: "Anotaciones", obligatorio: false }
    ];
  }).filter(f => f !== null);

  return datos;
};


// En apiMock.ts
export const crearFicha = async (ficha: any[], rutUsuario: string) => {
  console.log("[crearFicha] Inicio de creación de ficha");
  await simulateNetworkDelay();

  // Generar nuevo ID
  const nuevoId = generarNuevoIdDocumento();
  console.log(`[crearFicha] ID generado: ${nuevoId}`);

  // Insertar el ID generado como primer campo (o actualizar si ya hay uno)
  const indexIdCampo = ficha.findIndex(campo => campo.nombre === "ID Documento");
  console.log(`[crearFicha] Índice del campo ID Documento: ${indexIdCampo}`);

  if (indexIdCampo !== -1) {
    ficha[indexIdCampo].valor = nuevoId;
    console.log("[crearFicha] Campo 'ID Documento' actualizado con nuevo ID");
  } else {
    ficha.unshift({
      nombre: "ID Documento",
      valor: nuevoId,
      tipo: "Texto",
      seccion: "Datos Personales",
      obligatorio: true
    });
    console.log("[crearFicha] Campo 'ID Documento' agregado al inicio del arreglo");
  }

  // Guardar en fichasMedicas
  fichasMedicas[nuevoId] = JSON.parse(JSON.stringify(ficha));
  console.log(`[crearFicha] Ficha guardada en fichasMedicas bajo ID ${nuevoId}`);

  // Asociar al usuario
  if (!fichasPorUsuario[rutUsuario]) {
    fichasPorUsuario[rutUsuario] = [];
    console.log(`[crearFicha] No existía lista de fichas para usuario ${rutUsuario}, se creó`);
  }

  fichasPorUsuario[rutUsuario].push({ id: nuevoId, nota: "", comentario: "" });
  console.log(`[crearFicha] Ficha asociada a usuario ${rutUsuario}`);

  const resultado = {
    mensaje: 'Ficha creada correctamente',
    cantidadTotal: fichasPorUsuario[rutUsuario].length,
    idFicha: nuevoId
  };

  console.log("[crearFicha] Resultado final:", resultado);
  return resultado;
};

export const asignarPautaMedica = async (
  rut: string,
  idFicha: string,
  pautaMedicaId: string,
  datosPauta: [string, string, string][]
) => {
  await simulateNetworkDelay();

  const referencias = fichasPorUsuario[rut];
  if (!referencias) throw new Error("Usuario no tiene fichas");

  const ref = referencias.find(f => f.id === idFicha);
  if (!ref) throw new Error("Ficha no asociada a este usuario");

  if (!pautasMedicas[pautaMedicaId]) throw new Error("Pauta médica no encontrada");

  ref.pautaMedicaId = pautaMedicaId;
  ref.datosPauta = datosPauta;

  return {
    mensaje: "Pauta médica asignada correctamente",
    fichaId: idFicha,
    pauta: pautasMedicas[pautaMedicaId],
    datos: datosPauta
  };
};


export const obtenerPautaDeFicha = async (rut: string, idFicha: string) => {
  await simulateNetworkDelay();

  const referencias = fichasPorUsuario[rut];
  if (!referencias) throw new Error("Usuario no tiene fichas");

  const ref = referencias.find(f => f.id === idFicha);
  if (!ref) throw new Error("Ficha no asociada a este usuario");

  if (!ref.pautaMedicaId) return null;

  return {
    pauta: pautasMedicas[ref.pautaMedicaId],
    datos: ref.datosPauta || []
  };
};


export const fetchClientes = async (rut: string, clave: string) => {
  console.log(`[fetchClientes] Llamada con rut: ${rut}, clave: ${clave}`);
  await simulateNetworkDelay();
  const user = autenticar(rut, clave);
  if (!user) throw new Error('No autorizado');

  const datos = clientesPorUsuario[user.rut];
  if (!datos) throw new Error('Datos no encontrados');

  return datos;
};


export const buscarFichasPorTexto = async (texto: string, rutActual: string) => {
  await simulateNetworkDelay();
  const textoLower = texto.toLowerCase();
  const resultados: any[] = [];

  // Obtener lista de IDs ya asociados al rutActual
  const idsAsociados = new Set(
    (fichasPorUsuario[rutActual] || []).map(ref => ref.id)
  );

  for (const idFicha in fichasMedicas) {
    if (idsAsociados.has(idFicha)) continue; // Omitir si ya está asociada

    const fichaCompleta = fichasMedicas[idFicha];
    if (!fichaCompleta) continue;

    const encontrado = fichaCompleta.some((campo: any) => {
      const valorStr = campo.valor?.toString().toLowerCase() ?? "";
      return valorStr.includes(textoLower);
    });

    if (encontrado) {
      resultados.push({ id: idFicha, campos: fichaCompleta });
    }
  }

  return resultados;
};






export const validarCredenciales = async (usuario: string, clave: string): Promise<
  { resultado: 1, rut: string, clavemaestra: string } | { resultado: 2 | 3 }
> => {
  console.log(`[validarCredenciales] Validando usuario: ${usuario}`);
  await simulateNetworkDelay();
  const user = usuarios.find(u => u.usuario === usuario);

  if (!user) return { resultado: 2 }; // usuario incorrecto
  if (user.clave !== clave) return { resultado: 3 }; // clave incorrecta

  return {
    resultado: 1,
    rut: user.rut,
    clavemaestra: 'hello world',
  };
};

// Agrega esta función al apiMock.ts
export const asignarFicha = async (idFicha: string, rutDestino: string) => {
  await simulateNetworkDelay();

  if (!fichasMedicas[idFicha]) {
    return {
      success: false,
      message: `Ficha ${idFicha} no encontrada en fichasMedicas`,
    };
  }

  if (!fichasPorUsuario[rutDestino]) fichasPorUsuario[rutDestino] = [];

  // Evitar duplicados
  const yaAsignada = fichasPorUsuario[rutDestino].some(ref => ref.id === idFicha);
  if (!yaAsignada) {
    fichasPorUsuario[rutDestino].push({ id: idFicha, nota: "", comentario: "" });
  }

  return {
    success: true,
    message: `Ficha ${idFicha} asignada al rut ${rutDestino}`,
    ficha: fichasMedicas[idFicha],
  };
};


export const actualizarNotaComentario = async (rut: string, idFicha: string, nota: string, comentario: string) => {
  await simulateNetworkDelay();

  const referencias = fichasPorUsuario[rut];
  if (!referencias) throw new Error("Usuario no tiene fichas");

  const ref = referencias.find(f => f.id === idFicha);
  if (!ref) throw new Error("Ficha no asociada a este usuario");

  ref.nota = nota;
  ref.comentario = comentario;

  return {
    mensaje: "Nota y comentario actualizados correctamente"
  };
};



