// HistorialMenu.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { fetchHistorial } from '../api/api';
import { useLocalSearchParams } from 'expo-router';

const ordenarPorCampo = (lista: any[], campo: string, asc: boolean) => {
  return [...lista].sort((a, b) => {
    if (campo === 'fecha') {
      const fechaA = new Date(a[campo]);
      const fechaB = new Date(b[campo]);
      return asc ? fechaA.getTime() - fechaB.getTime() : fechaB.getTime() - fechaA.getTime();
    }
    return asc
      ? a[campo].localeCompare(b[campo])
      : b[campo].localeCompare(a[campo]);
  });
};

export const HistorialMenu = () => {
  const { usuario, clave } = useLocalSearchParams();
  const [ordenCampo, setOrdenCampo] = useState<'nombre' | 'rut' | 'fecha'>('fecha');
  const [ascendente, setAscendente] = useState(true);
  const [historial, setHistorial] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usuario || !clave) return;

    fetchHistorial(usuario as string, clave as string)
      .then((data) => {
        console.log('📥 Datos recibidos de fetchHistorial:', data);
        setHistorial(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('❌ Error cargando historial:', err);
        setHistorial([]);
      })
      .finally(() => setLoading(false));
  }, [usuario, clave]);

  if (loading) return <Text>Cargando historial...</Text>;
  if (historial.length === 0) return <Text>No hay datos de historial disponibles.</Text>;

  const pacientesOrdenados = ordenarPorCampo(historial, ordenCampo, ascendente);

  const cambiarOrden = (campo: 'nombre' | 'rut' | 'fecha') => {
    if (ordenCampo === campo) {
      setAscendente(!ascendente);
    } else {
      setOrdenCampo(campo);
      setAscendente(true);
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Historial de Pacientes</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        {['nombre', 'rut', 'fecha'].map((campo) => (
          <TouchableOpacity key={campo} onPress={() => cambiarOrden(campo as any)}>
            <Text style={{ fontWeight: ordenCampo === campo ? 'bold' : 'normal' }}>
              {campo.charAt(0).toUpperCase() + campo.slice(1)}
              {ordenCampo === campo ? (ascendente ? ' ↑' : ' ↓') : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={pacientesOrdenados}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text><Text style={{ fontWeight: 'bold' }}>Nombre:</Text> {item.nombre ?? 'N/A'}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>RUT:</Text> {item.rut ?? 'N/A'}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Fecha:</Text> {item.fecha ?? 'N/A'}</Text>
          </View>
        )}
      />
    </View>
  );
};
