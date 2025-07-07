import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  fetchFichas,
  fetchPautasMedicas,
  asignarPautaMedica,
} from '../api/api';
import { styles } from '../grafico/grafico';
import { useLocalSearchParams } from 'expo-router';

type CampoMedico = {
  nombre: string;
  valor: string;
  tipo: string;
  seccion: string;
  obligatorio: boolean;
};

const obtenerDiasDelMes = (mes: number, anio: number) => {
  return new Date(anio, mes, 0).getDate();
};

const FechaSelector = ({
  campo,
  onChange,
}: {
  campo: CampoMedico;
  onChange: (valor: string) => void;
}) => {
  const fechaActual = new Date();
  const [anio, setAnio] = useState(fechaActual.getFullYear());
  const [mes, setMes] = useState(fechaActual.getMonth() + 1);
  const [dia, setDia] = useState(fechaActual.getDate());

  const anios = Array.from({ length: 120 }, (_, i) => fechaActual.getFullYear() - i);
  const meses = Array.from({ length: 12 }, (_, i) => i + 1);
  const dias = Array.from({ length: obtenerDiasDelMes(mes, anio) }, (_, i) => i + 1);

  useEffect(() => {
    const fechaFormateada = `${anio}-${mes.toString().padStart(2, '0')}-${dia
      .toString()
      .padStart(2, '0')}`;
    onChange(fechaFormateada);
  }, [anio, mes, dia]);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 4 }}>{campo.nombre}:</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Picker selectedValue={anio} style={{ flex: 1 }} onValueChange={(value) => setAnio(value)}>
          {anios.map((y) => (
            <Picker.Item key={y} label={y.toString()} value={y} />
          ))}
        </Picker>

        <Picker
          selectedValue={mes}
          style={{ flex: 1 }}
          onValueChange={(value) => {
            setMes(value);
            const maxDia = obtenerDiasDelMes(value, anio);
            if (dia > maxDia) setDia(maxDia);
          }}
        >
          {meses.map((m) => (
            <Picker.Item key={m} label={m.toString()} value={m} />
          ))}
        </Picker>

        <Picker selectedValue={dia} style={{ flex: 1 }} onValueChange={(value) => setDia(value)}>
          {dias.map((d) => (
            <Picker.Item key={d} label={d.toString()} value={d} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export const FichaMedicaActivaMenu = () => {
  const { usuario, clave } = useLocalSearchParams();
  const [medicalDataState, setMedicalDataState] = useState<CampoMedico[][]>([]);
  const [documentoSeleccionadoIndex, setDocumentoSeleccionadoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pautas, setPautas] = useState<any[]>([]);
  const [pautaSeleccionadaId, setPautaSeleccionadaId] = useState<string | null>(null);
  const [datosPauta, setDatosPauta] = useState<[string, string, string][]>([]); // [nombre, tipo, valor]

  useEffect(() => {
    if (!usuario || !clave) return;

    console.log(`🚀 Cargando fichas para usuario=${usuario}`);

    fetchFichas(usuario as string, clave as string)
      .then((data) => {
        console.log('📥 Fichas recibidas:', data);
        setMedicalDataState(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('❌ Error cargando fichas médicas:', err);
        setMedicalDataState([]);
      })
      .finally(() => setLoading(false));

    fetchPautasMedicas()
      .then(setPautas)
      .catch((err) => console.warn('⚠️ Error cargando pautas médicas', err));
  }, [usuario, clave]);

  if (loading) return <Text>Cargando ficha médica...</Text>;
  if (medicalDataState.length === 0) return <Text>No hay fichas médicas disponibles.</Text>;

  const documentoActual = medicalDataState[documentoSeleccionadoIndex];

  // Construimos set con nombres de campos editables según datosPauta (que contiene los campos de la pauta)
  // El formato esperado de datosPauta es: [nombreCampo, tipo, valor]
  const camposEditables = new Set(datosPauta.map(([nombre]) => nombre));

  // Organizar campos por seccion y ordenar para que "Anotaciones" esté al final
  const datosPorSeccion: { [key: string]: CampoMedico[] } = {};
  documentoActual.forEach((campo) => {
    if (!datosPorSeccion[campo.seccion]) datosPorSeccion[campo.seccion] = [];
    datosPorSeccion[campo.seccion].push(campo);
  });

  const seccionesOrdenadas = Object.entries(datosPorSeccion).sort(([a], [b]) => {
    if (a === 'Anotaciones') return 1;
    if (b === 'Anotaciones') return -1;
    return a.localeCompare(b);
  });

  const handleValorChange = (nombreCampo: string, nuevoValor: string) => {
    const nuevosDocumentos = [...medicalDataState];
    nuevosDocumentos[documentoSeleccionadoIndex] = nuevosDocumentos[documentoSeleccionadoIndex].map(
      (campo) =>
        campo.nombre === nombreCampo
          ? {
              ...campo,
              valor: nuevoValor,
            }
          : campo
    );
    setMedicalDataState(nuevosDocumentos);
  };

  const handleSave = async () => {
    const rut = (usuario || '').toString();
    const ficha = medicalDataState[documentoSeleccionadoIndex];
    const idFicha = ficha.find((f) => f.nombre === 'ID Documento')?.valor;

    if (!idFicha) {
      console.warn('⚠️ No se encontró ID de ficha');
      return;
    }

    if (pautaSeleccionadaId) {
      try {
        const res = await asignarPautaMedica(rut, idFicha, pautaSeleccionadaId, datosPauta);
        console.log('✅ Pauta médica asignada:', res);
      } catch (error) {
        console.error('❌ Error asignando pauta médica:', error);
      }
    }

    console.log('✅ Documento guardado:', ficha);
  };

  return (
    <ScrollView style={styles.container}>
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

      {/* Mostrar campos por sección */}
      {seccionesOrdenadas.map(([seccionNombre, campos]) => (
        <View key={seccionNombre} style={styles.card}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>{seccionNombre}</Text>
          {campos.map((campo) => {
            const esEditable = camposEditables.has(campo.nombre);
            const matchSeleccion = campo.tipo.match(/^Selección\s*\((.*?)\)$/i);
            const isFecha = campo.tipo.toLowerCase().startsWith('fecha');
            const isTexto = campo.tipo.toLowerCase() === 'texto';
            const isNumerico = campo.tipo.toLowerCase().includes('numérico');

            if (matchSeleccion && esEditable) {
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

            if (isFecha && esEditable) {
              return (
                <FechaSelector
                  key={campo.nombre}
                  campo={campo}
                  onChange={(valor) => handleValorChange(campo.nombre, valor)}
                />
              );
            }

            if (isNumerico && esEditable) {
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

            if (isTexto && esEditable) {
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

            // Campo visible solo (no editable)
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

      {/* Selector de pautas */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>Asignar Pauta Médica:</Text>
        <Picker
          selectedValue={pautaSeleccionadaId}
          onValueChange={(itemValue) => {
            setPautaSeleccionadaId(itemValue);
            const pauta = pautas.find((p) => p.id === itemValue);
            if (pauta) {
              // Suponiendo que pauta.datos es un arreglo con los campos de la pauta [nombre, tipo, valorInicial]
              setDatosPauta(pauta.datos || []);
            } else {
              setDatosPauta([]);
            }
          }}
        >
          <Picker.Item label="Seleccionar pauta..." value={null} />
          {pautas.map((p) => (
            <Picker.Item key={p.id} label={p.nombre} value={p.id} />
          ))}
        </Picker>
      </View>

      {/* Mostrar datos editables de la pauta */}
      {pautaSeleccionadaId && (
        <View style={styles.card}>
          <Text style={{ fontWeight: 'bold' }}>Datos de la pauta</Text>
          {datosPauta.map(([nombre, tipo, valor], index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text>
                {nombre} ({tipo}):
              </Text>
              <TextInput
                value={valor}
                onChangeText={(text) => {
                  const nuevosDatos = [...datosPauta];
                  nuevosDatos[index][2] = text; // Aquí se actualiza el valor
                  setDatosPauta(nuevosDatos);
                }}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 6,
                  padding: 8,
                  borderWidth: 1,
                  borderColor: '#ccc',
                }}
              />
            </View>
          ))}
        </View>
      )}


      <Button title="Guardar Documento" onPress={handleSave} color="#4CAF50" />
    </ScrollView>
  );
};
