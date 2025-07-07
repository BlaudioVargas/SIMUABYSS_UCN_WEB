import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { crearFicha } from '../api/api';
import FechaSelector from './FechaSelector';

const camposBase = [
  //{ nombre: 'ID Documento', tipo: 'numérico', obligatorio: true, seccion: 'Datos Personales' },
  { nombre: 'N° de Historia', tipo: 'texto', obligatorio: true, seccion: 'Datos Personales' }, // corregido aquí
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

const CrearFichaMedica = ({ rut, onGuardado }: { rut: string;onGuardado?: () => void }) => {
  const [ficha, setFicha] = useState(
    camposBase.map((campo) => ({ ...campo, valor: '' }))
  );
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  // Definición del handleChange corregido
  const handleChange = (nombreCampo: string, nuevoValor: string) => {
    setFicha((prevFicha) =>
      prevFicha.map((campo) =>
        campo.nombre === nombreCampo ? { ...campo, valor: nuevoValor } : campo
      )
    );
  };

  const handleGuardar = async () => {
    try {
      setGuardando(true);
      setMensaje('Validando datos...');

      const camposFaltantes = ficha.filter(
        campo => campo.obligatorio && !campo.valor.trim()
      );

      if (camposFaltantes.length > 0) {
        setMensaje(`Faltan campos obligatorios: ${camposFaltantes.map(c => c.nombre).join(', ')}`);
        return;
      }

      setMensaje('Guardando ficha...');

      const fichaParaEnviar = ficha.map(campo => ({
        nombre: campo.nombre,
        valor: campo.valor,
        tipo: campo.tipo,
        seccion: campo.seccion,
        obligatorio: campo.obligatorio,
      }));

      const resultado = await crearFicha(fichaParaEnviar, rut); // ✅ aquí se agrega el usuario

      setMensaje('¡Ficha guardada correctamente!');
      Alert.alert('Éxito', 'Ficha médica creada correctamente');
      setFicha(camposBase.map((campo) => ({ ...campo, valor: '' })));

      if (onGuardado) onGuardado();
    } catch (error) {
      console.error('Error al guardar ficha:', error);
      setMensaje('Error al guardar la ficha');
      Alert.alert('Error', 'No se pudo guardar la ficha médica');
    } finally {
      setGuardando(false);
    }
  };


  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 16 }}>
        Crear Nueva Ficha Médica
      </Text>

      {/* Mostrar mensaje de estado */}
      {mensaje ? (
        <View
          style={{
            padding: 10,
            marginBottom: 15,
            backgroundColor: guardando ? '#FFF3CD' : '#D4EDDA',
            borderRadius: 5,
          }}
        >
          <Text style={{ color: guardando ? '#856404' : '#155724' }}>
            {mensaje}
          </Text>
        </View>
      ) : null}

      {ficha.map((campo) => {
        const matchSeleccion = campo.tipo.match(/^Selección\s*\((.*?)\)$/i);
        const isFecha = campo.tipo.toLowerCase() === 'fecha';
        const isTexto = campo.tipo.toLowerCase() === 'texto';
        const isNumerico = campo.tipo.toLowerCase() === 'numérico';

        if (matchSeleccion) {
          const opciones = matchSeleccion[1].split('/').map((opt) => opt.trim());
          return (
            <View key={campo.nombre} style={{ marginBottom: 10 }}>
              <Text>{campo.nombre}:</Text>
              <Picker
                selectedValue={campo.valor}
                onValueChange={(val) => handleChange(campo.nombre, val)}
              >
                <Picker.Item label="Seleccione una opción..." value="" />
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

      <Button
        title={guardando ? 'Guardando...' : 'Guardar Ficha'}
        onPress={handleGuardar}
        color="#4CAF50"
        disabled={guardando}
      />
    </ScrollView>
  );
};

export default CrearFichaMedica;
