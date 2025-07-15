import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '@/styles/grafico';
import { fetchClientes } from '../api/api';
import { useLocalSearchParams } from 'expo-router';

type Cliente = {
  id: number;
  nombre: string;
};

export const ListadoPacientesMenu = () => {
  const { usuario, clave } = useLocalSearchParams();

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usuario || !clave) return;

    fetchClientes(usuario as string, clave as string)
      .then((data) => {
        console.log('📥 Datos recibidos en fetchClientes:', data);
        setClientes(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('❌ Error cargando clientes:', err);
        setClientes([]);
      })
      .finally(() => setLoading(false));
  }, [usuario, clave]);

  if (loading) return <Text>Cargando clientes...</Text>;

  if (clientes.length === 0) return <Text>No hay clientes disponibles.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Clientes</Text>
      <ScrollView style={styles.scroll}>
        {clientes.map((cliente) => (
          <View key={cliente.id} style={styles.clienteItem}>
            <Text style={styles.clienteNombre}>{cliente.nombre}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
