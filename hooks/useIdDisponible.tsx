import { useMemo } from "react";
import { FichaClinica } from "@/hooks/useObtenerFichasClinicas";

function generarIdRandom(): number {
  // Genera un número entero aleatorio entre 1 y 9999
  return Math.floor(Math.random() * 9999) + 1;
}

export function useIdDisponible(fichas: FichaClinica[]) {
  return useMemo(() => {
    const ids = new Set(fichas.map(f => f.id));
    let idDisponible = generarIdRandom();

    // Mientras el id generado ya exista, generar otro
    while (ids.has(idDisponible)) {
      idDisponible = generarIdRandom();
    }
    return idDisponible;
  }, [fichas]);
}
