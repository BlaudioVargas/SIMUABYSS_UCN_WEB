import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../styles/grafico';
import { clientes } from '../constants/constantes';

export const ListadoPacientesMenu = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Clientes</Text>
      <ScrollView style={styles.scroll}>
        {clientes.map(cliente => (
          <View key={cliente.id} style={styles.clienteItem}>
            <Text style={styles.clienteNombre}>{cliente.nombre}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
