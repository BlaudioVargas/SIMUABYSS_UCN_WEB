import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, Alert } from 'react-native';
import { asignarFicha, buscarFichasPorTexto } from '../api/api';

const BuscarFichaMedicaActivaMenu = ({ rut, clave }: { rut: string; clave: string }) => {
  const [fichaSeleccionada, setFichaSeleccionada] = useState<any | null>(null);
  const [busqueda, setBusqueda] = useState('');

  const realizarBusqueda = async () => {
    if (busqueda.trim() === '') {
      Alert.alert('Atención', 'Debe ingresar un texto para buscar');
      return;
    }
    try {
      const resultados = await buscarFichasPorTexto(busqueda);
      if (resultados.length === 0) {
        setFichaSeleccionada(null);
        Alert.alert('Sin resultados', 'No se encontró ninguna ficha');
        return;
      }
      setFichaSeleccionada(resultados[0]); // Tomar la primera automáticamente
    } catch (error) {
      Alert.alert('Error', 'No se pudo realizar la búsqueda');
    }
  };

const guardarFicha = async () => {
  if (!fichaSeleccionada) return;

  try {
    console.log('Asignando ficha existente al usuario:', rut, fichaSeleccionada.id);
    const respuesta = await asignarFicha(fichaSeleccionada.id, rut);
    if (respuesta.success) {
      Alert.alert('Éxito', `Ficha asignada correctamente al usuario ${rut}`);
      setFichaSeleccionada(null);
      setBusqueda('');
    } else {
      Alert.alert('Error', respuesta.message);
    }
  } catch (error) {
    console.error('Error al asignar ficha:', error);
    Alert.alert('Error', 'No se pudo asignar la ficha');
  }
};




  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Buscar Ficha Médica</Text>
      <TextInput
        placeholder="Ingrese nombre, RUT u otro dato"
        value={busqueda}
        onChangeText={setBusqueda}
        style={{
          borderWidth: 1,
          borderColor: '#aaa',
          padding: 8,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />
      <Button title="Buscar" onPress={realizarBusqueda} />

      {fichaSeleccionada && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Ficha encontrada:</Text>
          <ScrollView style={{ maxHeight: 300, marginBottom: 10 }}>
            {fichaSeleccionada.campos.map((campo: any, i: number) => (
              <Text key={i}>
                {campo.nombre}: {campo.valor}
              </Text>
            ))}
          </ScrollView>
          <Button title="Guardar Ficha" onPress={guardarFicha} />
        </View>
      )}
    </View>
  );
};

export default BuscarFichaMedicaActivaMenu;
