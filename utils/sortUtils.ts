export const ordenarPorCampo = (lista: any[], campo: string, asc: boolean) => {
  return [...lista].sort((a, b) => {
    const valA = a[campo];
    const valB = b[campo];

    // Si alguno de los valores es undefined, lo mandamos al final
    if (valA === undefined || valB === undefined) return 0;

    // Comparación por fecha
    if (campo === "fecha") {
      return asc
        ? new Date(valA).getTime() - new Date(valB).getTime()
        : new Date(valB).getTime() - new Date(valA).getTime();
    }

    // Comparación por número
    if (typeof valA === "number" && typeof valB === "number") {
      return asc ? valA - valB : valB - valA;
    }

    // Comparación por string
    return asc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });
};
