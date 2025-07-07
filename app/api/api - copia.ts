// src/api/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchHistorial = async (rut: string, clave: string) => {
  const res = await axios.get(`${API_URL}/historial`, {
    params: { rut, clave },
  });
  return res.data;
};

export const fetchFichas = async (usuario: string, clave: string) => {
  const res = await axios.get(`${API_URL}/fichas`, {
    params: { rut: usuario, clave },
  });
  return res.data;
};


export const crearFicha = async (ficha: any) => {
  const res = await axios.post(`${API_URL}/fichas`, ficha);
  return res.data;
};

export const fetchClientes = async (rut: string, clave: string) => {
  const res = await axios.get(`${API_URL}/clientes`, {
    params: { rut, clave },
  });
  return res.data;
};

export const validarCredenciales = async (usuario: string, clave: string): Promise<number> => {
  try {
    const res = await axios.post(`${API_URL}/login`, { usuario, clave });
    return res.data.resultado; // 1: ok, 2: usuario incorrecto, 3: contraseña incorrecta
  } catch (err: any) {
    if (err.response && err.response.data?.resultado) {
      return err.response.data.resultado;
    }
    console.error('Error al validar credenciales:', err);
    throw err;
  }
};


