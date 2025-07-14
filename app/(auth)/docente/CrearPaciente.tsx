import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DatePickerModal } from 'react-native-paper-dates';
import { Provider as PaperProvider } from 'react-native-paper';
import { registerTranslation } from 'react-native-paper-dates';
import { es } from 'date-fns/locale';

//registerTranslation('es', es);


import { camposDatosPersonales, camposDireccion, camposAdministrativos, CampoFormulario } from '@/constants/constantes';
import { useEnviarPaciente } from '@/hooks/useEnviarPaciente';


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

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [campoFechaActivo, setCampoFechaActivo] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setPaciente((prev) => ({ ...prev, [key]: value }));
    setErrores((prev) => ({ ...prev, [key]: false }));
  };

  const handleImprimirPaciente = async () => {
    console.log("Paciente a enviar:", paciente);
    console.log("enviarPacienteAlBackend existe?", !!enviarPacienteAlBackend);
    
    const nuevosErrores: Record<string, boolean> = {};

    if (paciente.rut && !validarRUT(paciente.rut)) {
      nuevosErrores.rut = true;
      Alert.alert('Error', 'El RUT ingresado no es válido');
    }

    for (const campo of camposObligatorios) {
      if (!paciente[campo] || paciente[campo].trim() === '') {
        nuevosErrores[campo] = true;
      }
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    try {
      const sexoBackend = paciente.sexo === 'Masculino' ? 'M' : 'F';
      const pacienteParaBackend = {
        ...paciente,
        sexo: sexoBackend,
        rut: paciente.rut,
      };

      await enviarPacienteAlBackend(pacienteParaBackend);
      Alert.alert('Éxito', 'Paciente guardado exitosamente');
    } catch (error: any) {
      console.log('Error: ', error);
      Alert.alert('Error', 'No se pudo guardar el paciente');
    }
  };




  const renderCampo = ({ key, label }: CampoFormulario) => {
    const mostrarError = errores[key];

    // Cambiar en renderCampo para 'rut'
    if (key === 'rut') {
      return (
        <View key={key} style={styles.inputContainer}>
          <Text style={styles.label}>
            {label}
            {camposObligatorios.has(key) && <Text style={styles.asterisk}> *</Text>}
          </Text>
          <TextInput
            style={[styles.input, mostrarError && styles.errorInput]}
            value={formatearRUT(paciente[key] || '')}
            onChangeText={(text) => {
              const limpio = text.replace(/[^0-9kK]/g, '').toUpperCase();
              handleChange(key, limpio);
            }}
            placeholder="Ej: 12.345.678-9"
          />
          {mostrarError && <Text style={styles.errorText}>Ingrese un RUT válido</Text>}
        </View>
      );
    }






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
    <PaperProvider>
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
              setCampoFechaActivo(null);
            }
          }}
        />

        <TouchableOpacity style={styles.boton} onPress={handleImprimirPaciente}>
          <Text style={styles.textoBoton}>Agregar paciente</Text>
        </TouchableOpacity>
      </ScrollView>
    </PaperProvider>
  );
}

function limpiarRUT(rut: string): string {
  return rut.replace(/\./g, '').replace(/-/g, '');
}



export function validarRUT(rut: string): boolean {
  // Eliminar puntos y guion y convertir a mayúscula
  rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

  // Debe tener al menos 2 caracteres (cuerpo + DV)
  if (rut.length < 2) return false;

  // Separar cuerpo y dígito verificador
  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);

  // Validar que cuerpo sea solo números
  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplo = 2;

  // Calcular suma para el cuerpo
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo.charAt(i)) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const resto = suma % 11;
  const dvEsperado = 11 - resto;

  let dvCalculado = '';
  if (dvEsperado === 11) dvCalculado = '0';
  else if (dvEsperado === 10) dvCalculado = 'K';
  else dvCalculado = dvEsperado.toString();

  return dvCalculado === dv.toUpperCase();
}

export function limpiarYValidarRUT(rut: string): boolean {
  const limpio = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
  return validarRUT(limpio);
}

function formatearRUT(rut: string): string {
  rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
  if (rut.length < 2) return rut;

  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1);

  const cuerpoConPuntos = cuerpo
    .split('')
    .reverse()
    .join('')
    .replace(/(\d{3})(?=\d)/g, '$1.')
    .split('')
    .reverse()
    .join('');

  return `${cuerpoConPuntos}-${dv}`;
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
