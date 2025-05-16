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
  {
    nombre: 'Juan Pérez',
    edad: 45,
    rut: '12.345.678-9',
    prestacion: 'Consulta médica general',
    prevision: 'Fonasa',
    nota: 'Nota adicional del docente',
    fecha: '2025-03-21',
  },
  {
    nombre: 'Ana Soto',
    edad: 32,
    rut: '11.223.334-5',
    prestacion: 'Control prenatal',
    prevision: 'Isapre Colmena',
    nota: '',
    fecha: '2025-01-15',
  },
  {
    nombre: 'Carlos Ruiz',
    edad: 58,
    rut: '20.111.222-3',
    prestacion: 'Electrocardiograma',
    prevision: 'Fonasa',
    nota: '',
    fecha: '2024-12-02',
  },
  {
    nombre: 'Lucía Fernández',
    edad: 67,
    rut: '14.789.654-1',
    prestacion: 'Consulta geriátrica',
    prevision: 'Isapre Banmédica',
    nota: '',
    fecha: '2025-02-10',
  },
  {
    nombre: 'Matías López',
    edad: 29,
    rut: '18.333.777-5',
    prestacion: 'Consulta traumatológica',
    prevision: 'Fonasa',
    nota: '',
    fecha: '2025-04-05',
  },
];
//-------------------- crearpaciente.tsx
export type PacienteField =
  | 'nHistoria'
  | 'rut'
  | 'nombres'
  | 'apellidoPaterno'
  | 'apellidoMaterno'
  | 'fechaNacimiento'
  | 'edad'
  | 'sexo'
  | 'identidadGenero'
  | 'estadoCivil'
  | 'nacionalidad'
  | 'paisNacimiento'
  | 'prevision'
  | 'escolaridad'
  | 'lenguaje'
  | 'etnia'
  | 'descendencia'
  | 'ocupacion'
  | 'religion'
  | 'region'
  | 'provincia'
  | 'comuna'
  | 'ciudad'
  | 'villaPoblacion'
  | 'calle'
  | 'numeroDomicilio'
  | 'departamento'
  | 'sector'
  | 'unidadVecinal'
  | 'telefonoPersonal'
  | 'celular'
  | 'email'
  | 'fechaInscripcion'
  | 'profesionalAsignado'
  | 'motivo'
  | 'estado'
  | 'causa'
  | 'comentarios';

export interface CampoFormulario {
  key: string;
  label: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

export const camposDatosPersonales = [
    { key: 'nHistoria', label: 'Número de Historia' },
    { key: 'rut', label: 'RUT' },
    { key: 'nombres', label: 'Nombres' },
    { key: 'apellidoPaterno', label: 'Apellido Paterno' },
    { key: 'apellidoMaterno', label: 'Apellido Materno' },
    { key: 'fechaNacimiento', label: 'Fecha de Nacimiento' },
    { key: 'edad', label: 'Edad' },
    { key: 'sexo', label: 'Sexo' },
    { key: 'identidadGenero', label: 'Identidad de Género' },
    { key: 'estadoCivil', label: 'Estado Civil' },
    { key: 'nacionalidad', label: 'Nacionalidad' },
    { key: 'paisNacimiento', label: 'País de Nacimiento' },
    { key: 'prevision', label: 'Previsión' },
    { key: 'escolaridad', label: 'Escolaridad' },
    { key: 'lenguaje', label: 'Lenguaje' },
    { key: 'etnia', label: 'Etnia' },
    { key: 'descendencia', label: 'Descendencia' },
    { key: 'ocupacion', label: 'Ocupación' },
    { key: 'religion', label: 'Religión' },
  ];

export const camposDireccion = [
    { key: 'region', label: 'Región' },
    { key: 'provincia', label: 'Provincia' },
    { key: 'comuna', label: 'Comuna' },
    { key: 'ciudad', label: 'Ciudad' },
    { key: 'villa', label: 'Villa/Población' },
    { key: 'calle', label: 'Calle' },
    { key: 'numeroDomicilio', label: 'Número Domicilio' },
    { key: 'departamento', label: 'Departamento' },
    { key: 'sector', label: 'Sector' },
    { key: 'unidadVecinal', label: 'Unidad Vecinal' },
    { key: 'telefono', label: 'Teléfono Personal'},
    { key: 'celular', label: 'Celular' },
    { key: 'email', label: 'E-mail' },
  ];

export const camposAdministrativos = [
    { key: 'fechaInscripcion', label: 'Fecha de Inscripción' },
    { key: 'profesionalAsignado', label: 'Profesional Asignado' },
    { key: 'motivo', label: 'Motivo' },
    { key: 'estado', label: 'Estado' },
    { key: 'causa', label: 'Causa' },
    { key: 'comentarios', label: 'Comentarios' },
  ];
