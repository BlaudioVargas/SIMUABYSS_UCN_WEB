import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Platform } from 'react-native';

export default function CrearPaciente() {
  const [nHistoria, setNHistoria] = useState('');
  const [rut, setRut] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Sección: Datos Personales */}
      <Text style={styles.sectionTitle}>Datos Personales</Text>
      <View style={styles.section}>
        <TextInput style={styles.input} placeholder="Número de Historia" value={nHistoria} onChangeText={setNHistoria} />
        <TextInput style={styles.input} placeholder="RUT" value={rut} onChangeText={setRut} />
        <TextInput style={styles.input} placeholder="Nombres" value={nombres} onChangeText={setNombres} />
        <TextInput style={styles.input} placeholder="Apellido Paterno" value={apellidoPaterno} onChangeText={setApellidoPaterno} />
        <TextInput style={styles.input} placeholder="Apellido Materno" value={apellidoMaterno} onChangeText={setApellidoMaterno} />
        <TouchableOpacity style={styles.input}>
          <Text>Seleccionar Fecha de Nacimiento</Text>
          {/* Aquí iría la lógica del selector de fecha */}
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Edad" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Sexo" />
        <TextInput style={styles.input} placeholder="Identidad de Género" />
        <TextInput style={styles.input} placeholder="Estado Civil" />
        <TextInput style={styles.input} placeholder="Nacionalidad" />
        <TextInput style={styles.input} placeholder="País de Nacimiento" />
        <TextInput style={styles.input} placeholder="Previsión" />
        <TextInput style={styles.input} placeholder="Escolaridad" />
        <TextInput style={styles.input} placeholder="Lenguaje" />
        <TextInput style={styles.input} placeholder="Etnia" />
        <TextInput style={styles.input} placeholder="Descendencia" />
        <TextInput style={styles.input} placeholder="Ocupación" />
        <TextInput style={styles.input} placeholder="Religión" />
      </View>

      {/* Sección: Dirección Particular */}
      <Text style={styles.sectionTitle}>Dirección Particular</Text>
      <View style={styles.section}>
        <TextInput style={styles.input} placeholder="Región" />
        <TextInput style={styles.input} placeholder="Provincia" />
        <TextInput style={styles.input} placeholder="Comuna" />
        <TextInput style={styles.input} placeholder="Ciudad" />
        <TextInput style={styles.input} placeholder="Villa/Población" />
        <TextInput style={styles.input} placeholder="Calle" />
        <TextInput style={styles.input} placeholder="Número Domicilio" />
        <TextInput style={styles.input} placeholder="Departamento" />
        <TextInput style={styles.input} placeholder="Sector" />
        <TextInput style={styles.input} placeholder="Unidad Vecinal" />
        <TextInput style={styles.input} placeholder="Teléfono Personal" keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Celular" keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" />
      </View>

      {/* Sección: Datos Administrativos */}
      <Text style={styles.sectionTitle}>Datos Administrativos</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.input}>
          <Text>Seleccionar Fecha de Inscripción</Text>
          {/* Aquí iría la lógica del selector de fecha */}
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Profesional Asignado" />
        <TextInput style={styles.input} placeholder="Motivo" />
        <TextInput style={styles.input} placeholder="Estado" />
        <TextInput style={styles.input} placeholder="Causa" />
        <TextInput style={styles.input} placeholder="Comentarios" multiline numberOfLines={3} />
      </View>
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
  section: {
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  }
});
