import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { HistorialMenu, ListadoPacientesMenu, FichaMedicaActivaMenu } from './menu/menu_web';
import { styles } from './grafico/grafico';

const Pantalla = () => {
  const router = useRouter();
  const { usuario, clave } = useLocalSearchParams();
  const [botonActivo, setBotonActivo] = useState(0);

  // Lista de botones con sus respectivos títulos y componentes
  const botones = [
    { titulo: 'Historial', componente: HistorialMenu },
    { titulo: 'Listado Pacientes', componente: ListadoPacientesMenu },
    { titulo: 'Ficha Médica Activa', componente: FichaMedicaActivaMenu },
    // Puedes seguir agregando más:
    // { titulo: 'Otro Módulo', componente: () => <OtroComponente /> },
  ];

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {/* Panel Izquierdo */}
      <View style={{ flex: 3, backgroundColor: '#00008B', alignItems: 'center', padding: 20 }}>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          {/* Info usuario */}
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            {/*<Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Datos de BlackBox</Text>*/}
            <Text style={{ fontSize: 18, color: 'white' }}>Usuario: {usuario}</Text>
            <Text style={{ fontSize: 18, color: 'white', marginBottom: 10 }}>Clave: {clave}</Text>
          </View>

          {/* Render dinámico de botones */}
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

          {/* Cerrar sesión */}
          <Button title="CERRAR SESIÓN" onPress={() => router.push('/')} color="grey" />
        </ScrollView>
      </View>

      {/* Panel Derecho */}
      <View style={{ flex: 7, backgroundColor: '#87CEEB', padding: 20 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {React.createElement(botones[botonActivo]?.componente)}
        </ScrollView>
      </View>
    </View>
  );
};

export default Pantalla;
