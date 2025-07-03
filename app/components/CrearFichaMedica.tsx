// src/components/CrearFichaMedica.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { crearFicha } from '../api/api';
import FechaSelector from './FechaSelector';

const camposBase = [
  { nombre: 'ID Persona', tipo: 'numérico', obligatorio: true, seccion: 'Datos Personales' },
  { nombre: 'N1 de Historia', tipo: 'texto', obligatorio: true, seccion: 'Datos Personales' },
  { nombre: 'Documento (RUT)', tipo: 'texto', obligatorio: true, seccion: 'Datos Personales' },
  { nombre: 'Nombres', tipo: 'texto', obligatorio: true, seccion: 'Datos Personales' },
  { nombre: 'Apellido Paterno', tipo: 'texto', obligatorio: true, seccion: 'Datos Personales' },
  { nombre: 'Apellido Materno', tipo: 'texto', obligatorio: false, seccion: 'Datos Personales' },
  { nombre: 'Fecha de Nacimiento', tipo: 'fecha', obligatorio: true, seccion: 'Datos Personales' },
  { nombre: 'Edad', tipo: 'numérico', obligatorio: true, seccion: 'Datos Personales' },
  { nombre: 'Sexo', tipo: 'Selección (Varón/Mujer)', obligatorio: true, seccion: 'Datos Personales' },
  { nombre: 'Profesional Asignado', tipo: 'texto', obligatorio: false, seccion: 'Datos Administrativos' },
  { nombre: 'Centro', tipo: 'texto', obligatorio: false, seccion: 'Centro' },
  { nombre: 'Fecha de Inscripción', tipo: 'fecha', obligatorio: true, seccion: 'Datos Administrativos' },
  { nombre: 'Fecha de Inicio', tipo: 'fecha', obligatorio: true, seccion: 'Datos Administrativos' },
  { nombre: 'Hora de Inicio', tipo: 'texto', obligatorio: true, seccion: 'Datos Administrativos' }, // ⏰ nuevo campo
  { nombre: 'Tiempo para Termino (Horas)', tipo: 'numérico', obligatorio: true, seccion: 'Datos Administrativos' }
];


const CrearFichaMedica = ({ onGuardado }: { onGuardado?: () => void }) => {
  const [ficha, setFicha] = useState(
    camposBase.map((campo) => ({ ...campo, valor: '' }))
  );

  const handleChange = (nombreCampo: string, nuevoValor: string) => {
    const nuevaFicha = ficha.map((campo) =>
      campo.nombre === nombreCampo ? { ...campo, valor: nuevoValor } : campo
    );
    setFicha(nuevaFicha);
  };

  const handleGuardar = async () => {
    await crearFicha(ficha);
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 16 }}>
        Crear Nueva Ficha Médica
      </Text>
      {ficha.map((campo) => {
        const matchSeleccion = campo.tipo.match(/^Selección\s*\((.*?)\)$/i);
        const isFecha = campo.tipo.toLowerCase().startsWith('fecha');
        const isTexto = campo.tipo.toLowerCase() === 'texto';
        const isNumerico = campo.tipo.toLowerCase().includes('numérico');

        if (matchSeleccion) {
          const opciones = matchSeleccion[1].split('/').map((opt) => opt.trim());
          return (
            <View key={campo.nombre} style={{ marginBottom: 10 }}>
              <Text>{campo.nombre}:</Text>
              <Picker
                selectedValue={campo.valor}
                onValueChange={(val) => handleChange(campo.nombre, val)}
              >
                {opciones.map((op) => (
                  <Picker.Item key={op} label={op} value={op} />
                ))}
              </Picker>
            </View>
          );
        }

        if (isFecha) {
          return (
            <FechaSelector
              key={campo.nombre}
              campo={campo}
              onChange={(val) => handleChange(campo.nombre, val)}
            />
          );
        }

        if (isNumerico) {
          return (
            <View key={campo.nombre} style={{ marginBottom: 10 }}>
              <Text>{campo.nombre}:</Text>
              <TextInput
                keyboardType="numeric"
                value={campo.valor}
                onChangeText={(text) => handleChange(campo.nombre, text.replace(/[^0-9]/g, ''))}
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6 }}
              />
            </View>
          );
        }

        if (isTexto) {
          return (
            <View key={campo.nombre} style={{ marginBottom: 10 }}>
              <Text>{campo.nombre}:</Text>
              <TextInput
                value={campo.valor}
                onChangeText={(text) => handleChange(campo.nombre, text)}
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6 }}
              />
            </View>
          );
        }

        return null;
      })}

      <Button title="Guardar Ficha" onPress={handleGuardar} color="#4CAF50" />
    </ScrollView>
  );
};

export default CrearFichaMedica;
