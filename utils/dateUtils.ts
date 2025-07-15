export const obtenerDiasDelMes = (mes: number, anio: number) => new Date(anio, mes, 0).getDate();

export const calcularEdad = (fechaNacimiento: string): string => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad.toString();
};