export const ordenarPorCampo = (lista: any[], campo: string, asc: boolean) => {
  return [...lista].sort((a, b) => {
    if (campo === 'fecha') {
      return asc ? new Date(a[campo]).getTime() - new Date(b[campo]).getTime() : new Date(b[campo]).getTime() - new Date(a[campo]).getTime();
    }
    return asc ? a[campo].localeCompare(b[campo]) : b[campo].localeCompare(a[campo]);
  });
};
