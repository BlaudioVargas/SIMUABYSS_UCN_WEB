import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { HistorialMenu, ListadoPacientesMenu, FichaMedicaActivaMenu } from './menu/menu_web';

const Pantalla = () => {
  const router = useRouter();
  const { usuario, clave } = useLocalSearchParams();
  const [botonActivo, setBotonActivo] = useState('home');

  // Mapeo de botones con íconos
  const botones = [
    {
      key: 'home',
      titulo: 'Inicio',
      icon: 'home',
      componente: HistorialMenu,
    },
    {
      key: 'pacientes',
      titulo: 'Pacientes',
      icon: 'group',
      componente: ListadoPacientesMenu,
    },
    {
      key: 'consulta',
      titulo: 'Consulta Adm.',
      icon: 'supervisor-account',
      componente: FichaMedicaActivaMenu,
    },
  ];

  const renderBoton = (key: string, icon: string, label: string) => (
    <Pressable
      key={key}
      onPress={() => setBotonActivo(key)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: botonActivo === key ? '#4682B4' : 'transparent',
        borderRadius: 8,
        marginBottom: 10,
      }}
    >
      <MaterialIcons name={icon as any} size={24} color="white" />
      <Text style={{ color: 'white', marginLeft: 10 }}>{label}</Text>
    </Pressable>
  );

  const ComponenteActivo = botones.find((b) => b.key === botonActivo)?.componente;

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {/* Barra Lateral */}
      <View style={{ width: 200, backgroundColor: '#00008B', padding: 20 }}>
        <View style={{ marginBottom: 30 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Usuario: {usuario}</Text>
          <Text style={{ color: 'white', fontSize: 14 }}>Clave: {clave}</Text>
        </View>

        {botones.map(({ key, icon, titulo }) => renderBoton(key, icon, titulo))}

        <Pressable
          onPress={() => router.push('/')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 10,
            backgroundColor: 'darkred',
            borderRadius: 8,
            marginTop: 20,
          }}
        >
          <MaterialIcons name="logout" size={24} color="white" />
          <Text style={{ color: 'white', marginLeft: 10 }}>Cerrar Sesión</Text>
        </Pressable>
      </View>

      {/* Panel Derecho */}
      <View style={{ flex: 1, backgroundColor: '#87CEEB', padding: 20 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {ComponenteActivo ? React.createElement(ComponenteActivo) : <Text>Seleccione una opción</Text>}
        </ScrollView>
      </View>
    </View>
  );
};

export default Pantalla;
