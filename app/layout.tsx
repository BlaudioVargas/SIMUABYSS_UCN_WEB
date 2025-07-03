import React, { useState } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { HistorialMenu } from './components/HistorialMenu';
import { FichaMedicaActivaMenu } from './components/FichaMedicaActivaMenu';
import { ListadoPacientesMenu } from './components/ListadoPacientesMenu';
import CrearFichaMedica from './components/CrearFichaMedica';
import { styles } from './grafico/grafico';
import AyudaOverlay from './components/AyudaOverlay';

const Pantalla = () => {
  const router = useRouter();
  const { usuario, clave } = useLocalSearchParams();
  const [botonActivo, setBotonActivo] = useState(0);
  const [ayudaVisible, setAyudaVisible] = useState(false);

  const botones = [
    { titulo: 'Historial', componente: HistorialMenu },
    { titulo: 'Listado Pacientes', componente: ListadoPacientesMenu },
    { titulo: 'Ficha Médica Activa', componente: FichaMedicaActivaMenu },
    { titulo: 'Crear Ficha Médica', componente: CrearFichaMedica },
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Layout principal */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {/* Panel Izquierdo */}
        <View style={{ flex: 3, backgroundColor: '#00008B', alignItems: 'center', padding: 20 }}>
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontSize: 18, color: 'white' }}>Usuario: {usuario}</Text>
              <Text style={{ fontSize: 18, color: 'white', marginBottom: 10 }}>Clave: {clave}</Text>
            </View>

            {botones.map((btn, index) => (
              <View key={index} style={{ marginBottom: 10, width: '100%' }}>
                <Button
                  title={btn.titulo}
                  onPress={() => setBotonActivo(index)}
                  disabled={botonActivo === index}
                  color={botonActivo === index ? 'grey' : 'lightblue'}
                />
              </View>
            ))}

            <Button title="CERRAR SESIÓN" onPress={() => router.push('/')} color="grey" />
          </ScrollView>
        </View>

        {/* Panel Derecho */}
        <View style={{ flex: 7, backgroundColor: '#87CEEB', padding: 20 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {React.createElement(botones[botonActivo]?.componente, { usuario, clave })}
          </ScrollView>
        </View>
      </View>

      {/* Botón flotante "?" */}
      <TouchableOpacity
        onPress={() => setAyudaVisible(true)}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#000',
          borderRadius: 25,
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
      >
        <Text style={{ color: 'white', fontSize: 24 }}>?</Text>
      </TouchableOpacity>

      {/* Overlay de ayuda */}
      <Modal visible={ayudaVisible} animationType="slide" transparent={true}>
        <AyudaOverlay onCerrar={() => setAyudaVisible(false)} />
      </Modal>
    </View>
  );
};

export default Pantalla;
