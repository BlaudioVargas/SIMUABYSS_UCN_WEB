import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import AlertDialog from '@/app/components/AlertDialog'

import { camposDatosPersonales, camposDireccion, camposAdministrativos, CampoFormulario } from '@/constants/constantes';
import { useEnviarPaciente } from '@/src/conexion_back/paciente-api';
import { calcularEdad } from '@/utils/dateUtils';

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

const opcionesSexo = ['Masculino', 'Femenino'];
const opcionesEstadoCivil = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a'];

export default function CrearPaciente() {
  const [paciente, setPaciente] = useState<Record<string, string>>({});
  const [errores, setErrores] = useState<Record<string, boolean>>({});
  const { enviarPacienteAlBackend } = useEnviarPaciente();

  
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitulo, setDialogTitulo] = useState('');
  const [dialogMensaje, setDialogMensaje] = useState('');



  const [showDatePicker, setShowDatePicker] = useState(false);
  const [campoFechaActivo, setCampoFechaActivo] = useState<string | null>(null);
  
  const mostrarDialogo = (titulo: string, mensaje: string) => {
    setDialogTitulo(titulo);
    setDialogMensaje(mensaje);
    setDialogVisible(true);
  };

  const handleChange = (key: string, value: string) => {
    setPaciente((prev) => ({ ...prev, [key]: value }));
    setErrores((prev) => ({ ...prev, [key]: false }));
  };

  const handleImprimirPaciente = async () => {
    const nuevosErrores: Record<string, boolean> = {};

    for (const campo of camposObligatorios) {
      if (!paciente[campo] || paciente[campo].trim() === '') {
        nuevosErrores[campo] = true;
      }
    }

    if (!opcionesSexo.includes(paciente.sexo || '')) {
      nuevosErrores['sexo'] = true;
    }

    if (!opcionesEstadoCivil.includes(paciente.estadoCivil || '')) {
      nuevosErrores['estadoCivil'] = true;
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    try {
      await enviarPacienteAlBackend(paciente);

      mostrarDialogo('Éxito', 'Paciente guardado exitosamente');
    } catch (error: any) {
      console.log(error);
      mostrarDialogo('Error', 'No se pudo guardar al paciente');
    }
  };

  const renderCampo = ({ key, label }: CampoFormulario) => {
    const mostrarError = errores[key];

    if (key === 'nHistoria' || key === 'edad') {
      return (
        <View key={key} style={styles.inputContainer}>
          <Text style={styles.label}>
            {label}
            {camposObligatorios.has(key) && <Text style={styles.asterisk}> *</Text>}
          </Text>
          <TextInput
            style={[styles.input, mostrarError && styles.errorInput]}
            value={paciente[key] || ''}
            keyboardType="numeric"
            onChangeText={(text) => handleChange(key, text.replace(/[^0-9]/g, ''))}
          />
          {mostrarError && <Text style={styles.errorText}>Este campo es obligatorio</Text>}
        </View>
      );
    }

    if (key === 'fechaNacimiento' || key === 'fechaInscripcion') {
      return (
        <View key={key} style={styles.inputContainer}>
          <Text style={styles.label}>
            {label}
            {camposObligatorios.has(key) && <Text style={styles.asterisk}> *</Text>}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCampoFechaActivo(key);
              setShowDatePicker(true);
            }}
            style={[styles.input, { justifyContent: 'center' }, mostrarError && styles.errorInput]}
          >
            <Text>{paciente[key] || 'Seleccione una fecha'}</Text>
          </TouchableOpacity>
          {mostrarError && <Text style={styles.errorText}>Este campo es obligatorio</Text>}
        </View>
      );
    }

    if (key === 'sexo' || key === 'estadoCivil') {
      const opciones = key === 'sexo' ? opcionesSexo : opcionesEstadoCivil;
      return (
        <View key={key} style={styles.inputContainer}>
          <Text style={styles.label}>
            {label}
            {camposObligatorios.has(key) && <Text style={styles.asterisk}> *</Text>}
          </Text>
          <View style={[styles.pickerContainer, mostrarError && styles.errorInput]}>
            <Picker
              selectedValue={paciente[key] || ''}
              onValueChange={(value) => handleChange(key, value)}
            >
              <Picker.Item label="Seleccione" value="" />
              {opciones.map((opcion) => (
                <Picker.Item key={opcion} label={opcion} value={opcion} />
              ))}
            </Picker>
          </View>
          {mostrarError && <Text style={styles.errorText}>Debe seleccionar una opción</Text>}
        </View>
      );
    }

    return (
      <View key={key} style={styles.inputContainer}>
        <Text style={styles.label}>
          {label}
          {camposObligatorios.has(key) && <Text style={styles.asterisk}> *</Text>}
        </Text>
        <TextInput
          style={[styles.input, mostrarError && styles.errorInput]}
          value={paciente[key] || ''}
          onChangeText={(text) => handleChange(key, text)}
        />
        {mostrarError && <Text style={styles.errorText}>Este campo es obligatorio</Text>}
      </View>
    );
  };

  function renderTwoColumns(
    campos: CampoFormulario[],
    paciente: Record<string, string>,
    handleChange: (key: string, value: string) => void,
    styles: any
  ) {
    const mitad = Math.ceil(campos.length / 2);
    const primeraColumna = campos.slice(0, mitad);
    const segundaColumna = campos.slice(mitad);

    return (
      <View style={styles.row}>
        <View style={styles.column}>{primeraColumna.map(renderCampo)}</View>
        <View style={styles.column}>{segundaColumna.map(renderCampo)}</View>
      </View>
    );
  }

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Datos Personales</Text>
        {renderTwoColumns(camposDatosPersonales, paciente, handleChange, styles)}

        <Text style={styles.sectionTitle}>Dirección Particular</Text>
        {renderTwoColumns(camposDireccion, paciente, handleChange, styles)}

        <Text style={styles.sectionTitle}>Datos Administrativos</Text>
        {renderTwoColumns(camposAdministrativos, paciente, handleChange, styles)}

        <DatePickerModal
          locale="es"
          mode="single"
          visible={showDatePicker}
          onDismiss={() => setShowDatePicker(false)}
          date={paciente[campoFechaActivo || ''] ? new Date(paciente[campoFechaActivo || '']!) : undefined}
          onConfirm={({ date }) => {
            setShowDatePicker(false);
            if (campoFechaActivo && date) {
              const fechaFormateada = date.toISOString().slice(0, 10);
              handleChange(campoFechaActivo, fechaFormateada);

              // Si el campo activo es fechaNacimiento, calcular la edad automáticamente
              if (campoFechaActivo === 'fechaNacimiento') {
                const edadCalculada = calcularEdad(fechaFormateada);
                handleChange('edad', edadCalculada);
              }

              setCampoFechaActivo(null);
            }
          }}

        />
        <AlertDialog
          visible={dialogVisible}
          title={dialogTitulo}
          message={dialogMensaje}
          onClose={()=>setDialogVisible(false)}
        />
        <TouchableOpacity style={styles.boton} onPress={handleImprimirPaciente}>
          <Text style={styles.textoBoton}>Agregar paciente</Text>
        </TouchableOpacity>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
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
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: '#333',
  },
  asterisk: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  errorInput: {
    borderColor: 'red',
  },
  boton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
