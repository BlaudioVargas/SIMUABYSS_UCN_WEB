import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../../styles/grafico';
import { medicalData } from '../../constants/constantes';
import { FechaSelector } from '../../components/FechaSelector';

export type CampoMedico = {
  nombre: string;
  valor: string;
  tipo: string;
  seccion: string;
  obligatorio: boolean;
};

const FichaMedicaActivaMenu = () => {
  const [documentoSeleccionadoIndex, setDocumentoSeleccionadoIndex] = useState(0);
  const [medicalDataState, setMedicalDataState] = useState<CampoMedico[][]>(medicalData);

  const documentoActual = medicalDataState[documentoSeleccionadoIndex];

  const handleValorChange = (nombreCampo: string, nuevoValor: string) => {
    const nuevosDocumentos = [...medicalDataState];
    nuevosDocumentos[documentoSeleccionadoIndex] = nuevosDocumentos[documentoSeleccionadoIndex].map((campo) =>
      campo.nombre === nombreCampo ? { ...campo, valor: nuevoValor } : campo
    );
    setMedicalDataState(nuevosDocumentos);
  };

  const handleSave = () => {
    console.log('Documento guardado:', medicalDataState[documentoSeleccionadoIndex]);
  };

  const datosPorSeccion: { [key: string]: CampoMedico[] } = {};
  documentoActual.forEach((campo) => {
    if (!datosPorSeccion[campo.seccion]) datosPorSeccion[campo.seccion] = [];
    datosPorSeccion[campo.seccion].push(campo);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ficha Médica</Text>

      <View style={{ marginBottom: 20 }}>
        <Text>Seleccionar Documento:</Text>
        <Picker
          selectedValue={documentoSeleccionadoIndex}
          onValueChange={(itemValue) => setDocumentoSeleccionadoIndex(itemValue)}
          style={{ backgroundColor: '#f0f0f0', borderRadius: 6 }}
        >
          {medicalDataState.map((documento, index) => {
            const apellido = documento.find((c) => c.nombre === 'Apellido Paterno')?.valor || 'Apellido';
            const nombre = documento.find((c) => c.nombre === 'Nombres')?.valor || 'Nombre';
            const fechaRaw = documento.find((c) => c.nombre === 'Fecha de Inscripción')?.valor || '0000-00-00';

            const [yyyy, mm, dd] = fechaRaw.split('-');
            const fechaFormateada = `${yyyy?.slice(2) || '00'}/${mm || '00'}/${dd || '00'}`;

            const etiqueta = `${fechaFormateada} - ${apellido}, ${nombre}`;

            return <Picker.Item key={index} label={etiqueta} value={index} />;
          })}
        </Picker>
      </View>

      {Object.entries(datosPorSeccion).map(([seccionNombre, campos]) => (
        <View key={seccionNombre} style={styles.card}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>{seccionNombre}</Text>
          {campos.map((campo) => {
            const matchSeleccion = campo.tipo.match(/^Selección\s*\((.*?)\)$/i);
            const isFecha = campo.tipo.toLowerCase().startsWith('fecha');
            const isTexto = campo.tipo.toLowerCase() === 'texto';
            const isNumerico = campo.tipo.toLowerCase().includes('numérico');

            if (matchSeleccion) {
              const opciones = matchSeleccion[1].split('/').map((opt) => opt.trim());
              return (
                <View key={campo.nombre} style={{ marginBottom: 10 }}>
                  <Text style={{ marginBottom: 4 }}>{campo.nombre}:</Text>
                  <Picker
                    selectedValue={campo.valor}
                    onValueChange={(itemValue) => handleValorChange(campo.nombre, itemValue)}
                    style={{ backgroundColor: '#f0f0f0', borderRadius: 6 }}
                  >
                    {opciones.map((opcion) => (
                      <Picker.Item key={opcion} label={opcion} value={opcion} />
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
                  onChange={(valor) => handleValorChange(campo.nombre, valor)}
                />
              );
            }

            if (isNumerico) {
              return (
                <View key={campo.nombre} style={{ marginBottom: 10 }}>
                  <Text style={{ marginBottom: 4 }}>{campo.nombre}:</Text>
                  <TextInput
                    keyboardType="numeric"
                    value={campo.valor}
                    onChangeText={(text) => handleValorChange(campo.nombre, text.replace(/[^0-9]/g, ''))}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 6,
                      padding: 8,
                      borderWidth: 1,
                      borderColor: '#ccc',
                    }}
                  />
                </View>
              );
            }

            if (isTexto) {
              return (
                <View key={campo.nombre} style={{ marginBottom: 10 }}>
                  <Text style={{ marginBottom: 4 }}>{campo.nombre}:</Text>
                  <TextInput
                    value={campo.valor}
                    onChangeText={(text) => handleValorChange(campo.nombre, text)}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 6,
                      padding: 8,
                      borderWidth: 1,
                      borderColor: '#ccc',
                    }}
                  />
                </View>
              );
            }

            return (
              <View key={campo.nombre} style={{ marginBottom: 6 }}>
                <Text>
                  {campo.nombre}: {campo.valor}
                </Text>
              </View>
            );
          })}
        </View>
      ))}

      <Button title="Guardar Documento" onPress={handleSave} color="#4CAF50" />
    </View>
  );
};
export default FichaMedicaActivaMenu;