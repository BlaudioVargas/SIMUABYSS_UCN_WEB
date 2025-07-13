import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Button } from 'react-native';

const CalculadoraRiesgo = () => {
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState<'M' | 'F'>('M');
  const [fumador, setFumador] = useState(false);
  const [colesterolTotal, setColesterolTotal] = useState('');
  const [hdl, setHDL] = useState('');
  const [pas, setPAS] = useState('');
  const [tratamiento, setTratamiento] = useState(false);
  const [riesgo, setRiesgo] = useState<string | null>(null);

  const calcularRiesgo = () => {
    // Esto es una simplificación muy básica basada en puntajes de Framingham
    const edadNum = parseInt(edad);
    const colesterol = parseInt(colesterolTotal);
    const hdlNum = parseInt(hdl);
    const pasNum = parseInt(pas);

    if (isNaN(edadNum) || isNaN(colesterol) || isNaN(hdlNum) || isNaN(pasNum)) {
      setRiesgo("Por favor complete todos los campos numéricos.");
      return;
    }

    let puntaje = 0;
    if (sexo === 'M') {
      if (edadNum >= 35) puntaje += 2;
      if (colesterol > 240) puntaje += 2;
      if (hdlNum < 40) puntaje += 2;
      if (fumador) puntaje += 2;
      if (pasNum > 140) puntaje += tratamiento ? 2 : 1;
    } else {
      if (edadNum >= 35) puntaje += 3;
      if (colesterol > 240) puntaje += 2;
      if (hdlNum < 40) puntaje += 2;
      if (fumador) puntaje += 2;
      if (pasNum > 140) puntaje += tratamiento ? 3 : 1;
    }

    const riesgoEstimado = Math.min(30, puntaje * 3); // ejemplo: 0–30%
    setRiesgo(`Riesgo estimado a 10 años: ${riesgoEstimado}%`);
  };

return (
  <View style={{ padding: 10 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
      Calculadora de Riesgo Vascular (Framingham)
    </Text>

    {/* Edad */}
    <View style={{ marginBottom: 12 }}>
      <Text>Edad:</Text>
      <TextInput
        keyboardType="numeric"
        value={edad}
        onChangeText={setEdad}
        placeholder="Ej: 50"
        style={{
          backgroundColor: '#f9f9f9',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 6,
        }}
      />
    </View>

    {/* Sexo */}
    <View style={{ marginBottom: 12 }}>
      <Text>Sexo:</Text>
      <View style={{ flexDirection: 'row', gap: 20, marginTop: 6 }}>
        <TouchableOpacity onPress={() => setSexo('M')}>
          <Text style={{
            fontWeight: 'bold',
            color: sexo === 'M' ? '#007AFF' : '#333'
          }}>Masculino</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSexo('F')}>
          <Text style={{
            fontWeight: 'bold',
            color: sexo === 'F' ? '#007AFF' : '#333'
          }}>Femenino</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Fumador */}
    <View style={{ marginBottom: 12 }}>
      <Text>¿Fumador?</Text>
      <TouchableOpacity onPress={() => setFumador(!fumador)} style={{ marginTop: 6 }}>
        <Text style={{ color: fumador ? 'green' : '#333', fontWeight: 'bold' }}>
          {fumador ? 'Sí' : 'No'}
        </Text>
      </TouchableOpacity>
    </View>

    {/* Colesterol Total */}
    <View style={{ marginBottom: 12 }}>
      <Text>Colesterol Total (mg/dL):</Text>
      <TextInput
        keyboardType="numeric"
        value={colesterolTotal}
        onChangeText={setColesterolTotal}
        placeholder="Ej: 200"
        style={{
          backgroundColor: '#f9f9f9',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 6,
        }}
      />
    </View>

    {/* HDL */}
    <View style={{ marginBottom: 12 }}>
      <Text>HDL (mg/dL):</Text>
      <TextInput
        keyboardType="numeric"
        value={hdl}
        onChangeText={setHDL}
        placeholder="Ej: 45"
        style={{
          backgroundColor: '#f9f9f9',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 6,
        }}
      />
    </View>

    {/* Presión Sistólica */}
    <View style={{ marginBottom: 12 }}>
      <Text>Presión Arterial Sistólica:</Text>
      <TextInput
        keyboardType="numeric"
        value={pas}
        onChangeText={setPAS}
        placeholder="Ej: 130"
        style={{
          backgroundColor: '#f9f9f9',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 6,
        }}
      />
    </View>

    {/* Tratamiento antihipertensivo */}
    <View style={{ marginBottom: 16 }}>
      <Text>¿Está en tratamiento antihipertensivo?</Text>
      <TouchableOpacity onPress={() => setTratamiento(!tratamiento)} style={{ marginTop: 6 }}>
        <Text style={{ color: tratamiento ? 'green' : '#333', fontWeight: 'bold' }}>
          {tratamiento ? 'Sí' : 'No'}
        </Text>
      </TouchableOpacity>
    </View>

    {/* Botón calcular */}
    <Button title="Calcular Riesgo" onPress={calcularRiesgo} color="#007AFF" />

    {/* Resultado */}
    {riesgo && (
      <Text style={{ marginTop: 16, fontWeight: 'bold', fontSize: 16, color: '#d32f2f' }}>
        {riesgo}
      </Text>
    )}
  </View>
);

};
