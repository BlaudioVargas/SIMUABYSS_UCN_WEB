import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ordenarPorCampo } from '../../utils/sortUtils';
import { datosHistorial } from '../../constants/constantes';

const HistorialMenu = () => {
  const [ordenCampo, setOrdenCampo] = useState<'nombre' | 'rut' | 'fecha'>('fecha');
  const [ascendente, setAscendente] = useState(true);
  const pacientesOrdenados = ordenarPorCampo(datosHistorial, ordenCampo, ascendente);

  const cambiarOrden = (campo: 'nombre' | 'rut' | 'fecha') => {
    if (ordenCampo === campo) setAscendente(!ascendente);
    else { setOrdenCampo(campo); setAscendente(true); }
  };

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Historial de Pacientes</Text>
      <View style={{ flexDirection: 'row', backgroundColor: '#E0E0E0', paddingVertical: 8, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#999' }}>
        <View style={{ width: 40 }} />
        <View style={{ width: 40 }} />
        {['nombre', 'rut', 'fecha'].map((campo) => (
          <TouchableOpacity key={campo} style={{ flex: 1, alignItems: 'center' }} onPress={() => cambiarOrden(campo as any)}>
            <Text style={{ fontWeight: ordenCampo === campo ? 'bold' : 'normal' }}>{campo.charAt(0).toUpperCase() + campo.slice(1)}{ordenCampo === campo ? (ascendente ? ' ↑' : ' ↓') : ''}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={pacientesOrdenados}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 10, alignItems: 'center' }}>
            <View style={{ width: 40, alignItems: 'center' }}><MaterialIcons name="manage-accounts" size={24} color="#007BFF" /></View>
            <View style={{ width: 40, alignItems: 'center' }}><MaterialIcons name="person-search" size={24} color="#28A745" /></View>
            <View style={{ flex: 1, alignItems: 'center' }}><Text>{item.nombre}</Text></View>
            <View style={{ flex: 1, alignItems: 'center' }}><Text>{item.rut}</Text></View>
            <View style={{ flex: 1, alignItems: 'center' }}><Text>{item.fecha}</Text></View>
          </View>
        )}
      />
    </View>
  );
};
export default HistorialMenu