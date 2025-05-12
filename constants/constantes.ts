type CampoMedico = {
  nombre: string;
  valor: string;
  tipo: string;
  seccion: string;
  obligatorio: boolean;
 };

export const clientes = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'Ana Gómez' },
  { id: 3, nombre: 'Carlos Díaz' },
  { id: 4, nombre: 'María Rodríguez' },
  { id: 5, nombre: 'Luis Fernández' },
  { id: 6, nombre: 'Patricia López' },
  { id: 7, nombre: 'Javier Martínez' },
  { id: 8, nombre: 'Laura Sánchez' },
];

export const medicalData: CampoMedico[][] = [
  // Documento 1
  [
  { nombre: "ID Persona", valor: "123456", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
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
  // Documento 2
  [
  { nombre: "ID Persona", valor: "789123", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "N° de Historia", valor: "11223", tipo: "Numérico", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Documento (RUT)", valor: "98.765.432-1", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Nombres", valor: "María", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Apellido Paterno", valor: "Fernández", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Apellido Materno", valor: "López", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Fecha de Nacimiento", valor: "1990-07-22", tipo: "Fecha", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Edad", valor: "34", tipo: "Numérico", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Sexo", valor: "Mujer", tipo: "Selección(Varón/Mujer)", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Profesional Asignado", valor: "Dra. Patricia Vega", tipo: "Selección", seccion: "Datos Administrativos", obligatorio: true },
  { nombre: "Centro", valor: "CESFAM Norte", tipo: "Selección", seccion: "Centro", obligatorio: true },
  { nombre: "Fecha de Inscripción", valor: "2023-02-12", tipo: "Fecha", seccion: "Datos Administrativos", obligatorio: true },
  ],
  // Documento 3
  [
  { nombre: "ID Persona", valor: "456321", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "N° de Historia", valor: "99887", tipo: "Numérico", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Documento (RUT)", valor: "11.222.333-4", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Nombres", valor: "Carlos", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Apellido Paterno", valor: "Rojas", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Apellido Materno", valor: "Morales", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Fecha de Nacimiento", valor: "1978-11-30", tipo: "Fecha", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Edad", valor: "46", tipo: "Numérico", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Sexo", valor: "Varón", tipo: "Selección(Varón/Mujer)", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Profesional Asignado", valor: "Dr. Matías Ruiz", tipo: "Selección", seccion: "Datos Administrativos", obligatorio: true },
  { nombre: "Centro", valor: "CESFAM Oriente", tipo: "Selección", seccion: "Centro", obligatorio: true },
  { nombre: "Fecha de Inscripción", valor: "2021-06-08", tipo: "Fecha", seccion: "Datos Administrativos", obligatorio: true },
  ]
];

export const datosHistorial = [
  { nombre: 'Juan Pérez', rut: '12.345.678-9', fecha: '2025-03-21' },
  { nombre: 'Ana Soto', rut: '11.223.334-5', fecha: '2025-01-15' },
  { nombre: 'Carlos Ruiz', rut: '20.111.222-3', fecha: '2024-12-02' },
  // Agrega más pacientes si lo deseas
];