export interface Pauta {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  nivelAcademicoSugerido: string;
}

export interface ItemClinico {
  id: number;
  nombre: string;
  descripcion: string;
  pauta: {
    id: number;
    nombre: string;
  } | null;
}

export interface Ficha {
  id: number;
  user: { nombres: string; apellidoPaterno: string; rut: string };
  observacionesGenerales?: string;
  fechaCreacion: string;
  fechaUltimaAtencion?: string;
}

export interface HistoriaClinica {
  id: number;
  nHistoria: number;
  // atenciones: Atencion[];  // si lo necesitas
  fichaClinica: Ficha;      // O tal vez…
}



