// src/api/api.ts
import axios from 'axios';
import * as apiMock from './apiMock';
import React, { useState } from 'react';


const API_URL = 'http://localhost:3000';
const USE_MOCK = false; // Cambiar a true para forzar el uso del mock

// Función para probar conexión con el backend
const testBackendConnection = async (): Promise<boolean> => {
  try {
    await axios.get(`${API_URL}/health`, { timeout: 2000 });
    return true;
  } catch (error) {
    console.warn('No se pudo conectar al backend, usando datos simulados');
    return false;
  }
};

// Función wrapper que decide qué implementación usar
const createApiHandler = async <T extends (...args: any[]) => any>(
  realFn: T,
  mockFn: T
): Promise<T> => {
  if (USE_MOCK) return mockFn;
  
  const isBackendAvailable = await testBackendConnection();
  return isBackendAvailable ? realFn : mockFn;
};

// Implementaciones reales
const realFns = {
  fetchHistorial: async (rut: string, clave: string) => {
    const res = await axios.get(`${API_URL}/historial`, {
      params: { rut, clave },
    });
    return res.data;
  },

  fetchFichas: async (usuario: string, clave: string) => {
    const res = await axios.get(`${API_URL}/fichas`, {
      params: { rut: usuario, clave },
    });
    return res.data;
  },

  crearFicha: async (ficha: any, rutUsuario?: string) => {
    const res = await axios.post(`${API_URL}/fichas`, ficha);
    return res.data;
  },


  fetchClientes: async (rut: string, clave: string) => {
    const res = await axios.get(`${API_URL}/clientes`, {
      params: { rut, clave },
    });
    return res.data;
  },

  validarCredenciales: async (usuario: string, clave: string): Promise<
  { resultado: 1, rut: string, clavemaestra: string } | { resultado: 2 | 3 }
    > => {
      try {
        const res = await axios.post(`${API_URL}/login`, { usuario, clave });
        return res.data;
      } catch (err: any) {
        if (err.response?.data?.resultado) {
          return { resultado: err.response.data.resultado };
        }
        throw err;
      }
    },

    buscarFichasPorTexto: async (textoBusqueda: string) => {
    const res = await axios.get(`${API_URL}/fichas/buscar`, { params: { texto: textoBusqueda } });
    return res.data;
  },
  asignarFicha: async (fichaId: string, usuarioDestino: string) => {
    const res = await axios.post(`${API_URL}/fichas/asignar`, { fichaId, usuarioDestino });
    return res.data;
  },

    fetchPautasMedicas: async () => {
    return Promise.reject("fetchPautasMedicas no implementado en backend");
  },

  asignarPautaMedica: async (
    rut: string,
    idFicha: string,
    pautaMedicaId: string,
    datosPauta: [string, string, string][]
  ) => {
    return Promise.reject("asignarPautaMedica no implementado en backend");
  },

  obtenerPautaDeFicha: async (rut: string, idFicha: string) => {
    return Promise.reject("obtenerPautaDeFicha no implementado en backend");
  },

  actualizarNotaComentario: async (
    rut: string,
    idFicha: string,
    nota: string,
    comentario: string
  ) => {
    return Promise.reject("actualizarNotaComentario no implementado en backend");
  },
};


// Exportamos las funciones que automáticamente deciden si usar el backend real o el mock
export const fetchHistorial = (...args: Parameters<typeof realFns.fetchHistorial>) => 
  createApiHandler(realFns.fetchHistorial, apiMock.fetchHistorial).then(fn => fn(...args));

export const fetchFichas = (...args: Parameters<typeof realFns.fetchFichas>) => 
  createApiHandler(realFns.fetchFichas, apiMock.fetchFichas).then(fn => fn(...args));

export const crearFicha = (...args: Parameters<typeof realFns.crearFicha>) =>
  createApiHandler(realFns.crearFicha, apiMock.crearFicha).then(fn => fn(...args));

export const fetchClientes = (...args: Parameters<typeof realFns.fetchClientes>) => 
  createApiHandler(realFns.fetchClientes, apiMock.fetchClientes).then(fn => fn(...args));

export const validarCredenciales = (...args: Parameters<typeof realFns.validarCredenciales>) => 
  createApiHandler(realFns.validarCredenciales, apiMock.validarCredenciales).then(fn => fn(...args));

export const buscarFichasPorTexto = (...args: Parameters<typeof realFns.buscarFichasPorTexto>) =>
  createApiHandler(
    realFns.buscarFichasPorTexto || (() => Promise.reject('No implementado en realFns')), 
    apiMock.buscarFichasPorTexto
  ).then(fn => fn(...args));

export const asignarFicha = (...args: Parameters<typeof realFns.asignarFicha>) =>
  createApiHandler(
    realFns.asignarFicha || (() => Promise.reject('No implementado en realFns')), 
    apiMock.asignarFicha
  ).then(fn => fn(...args));

export const fetchPautasMedicas = (...args: Parameters<typeof realFns.fetchPautasMedicas>) =>
  createApiHandler(realFns.fetchPautasMedicas, apiMock.fetchPautasMedicas).then(fn => fn(...args));

export const asignarPautaMedica = (...args: Parameters<typeof realFns.asignarPautaMedica>) =>
  createApiHandler(realFns.asignarPautaMedica, apiMock.asignarPautaMedica).then(fn => fn(...args));

export const obtenerPautaDeFicha = (...args: Parameters<typeof realFns.obtenerPautaDeFicha>) =>
  createApiHandler(realFns.obtenerPautaDeFicha, apiMock.obtenerPautaDeFicha).then(fn => fn(...args));

export const actualizarNotaComentario = (...args: Parameters<typeof realFns.actualizarNotaComentario>) =>
  createApiHandler(realFns.actualizarNotaComentario, apiMock.actualizarNotaComentario).then(fn => fn(...args));


