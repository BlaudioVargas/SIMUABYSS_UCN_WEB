import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';

import { camposDatosPersonales, camposDireccion, camposAdministrativos, CampoFormulario } from '@/constants/constantes';
import { useEnviarPaciente } from '@/src/conexion_back/paciente-api';
// cambiar de lugar estos campos
const camposObligatorios = new Set([
  'nHistoria',
  'rut',
  'nombres',
  'apellidoPaterno',
  'apellidoMaterno',
  'fechaNacimiento',
  'edad',
  'sexo',
  'motivo',
  'prevision',
]);

function renderTwoColumns(
  campos: CampoFormulario[],
  paciente: Record<string, string>,
  handleChange: (key: string, value: string) => void,
  styles: any
) {
  const mitad = Math.ceil(campos.length / 2);
  const primeraColumna = campos.slice(0, mitad);
  const segundaColumna = campos.slice(mitad);

  const renderCampo = ({ key, label }: CampoFormulario) => (
    <View key={key} style={styles.inputContainer}>
      <Text style={styles.label}>
        {label}
        {camposObligatorios.has(key) && <Text style={styles.asterisk}> *</Text>}
      </Text>
      <TextInput
        style={styles.input}
        value={paciente[key] || ''}
        onChangeText={text => handleChange(key, text)}
      />
    </View>
  );

  return (
    <View style={styles.row}>
      <View style={styles.column}>
        {primeraColumna.map(renderCampo)}
      </View>
      <View style={styles.column}>
        {segundaColumna.map(renderCampo)}
      </View>
    </View>
  );
}

export default function CrearPaciente() {
  const [paciente, setPaciente] = useState<Record<string, string>>({});
  const {enviarPacienteAlBackend} = useEnviarPaciente();

  const handleImprimirPaciente = async () => {
    try {
      await enviarPacienteAlBackend(paciente);
    } catch (error: any) {
      console.log('Error: ', error)
    }
    console.log('Datos del paciente:', paciente);
  };

  const handleChange = (key: string, value: string) => {
    setPaciente(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Datos Personales</Text>
      {renderTwoColumns(camposDatosPersonales, paciente, handleChange, styles)}

      <Text style={styles.sectionTitle}>Dirección Particular</Text>
      {renderTwoColumns(camposDireccion, paciente, handleChange, styles)}

      <Text style={styles.sectionTitle}>Datos Administrativos</Text>
      {renderTwoColumns(camposAdministrativos, paciente, handleChange, styles)}

      
      <TouchableOpacity style={styles.boton} onPress={handleImprimirPaciente}>
        <Text style={styles.textoBoton}>Agregar paciente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputContainer: {
    marginBottom: 12
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: '#333'
  },
  asterisk: {
    color: 'red'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  boton: {
  backgroundColor: '#007AFF',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 20
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
