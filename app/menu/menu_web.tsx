import React, { useState , useEffect } from 'react';
import { View, Text, Button, ScrollView , StyleSheet, TextInput, Platform, Pressable, TouchableOpacity, FlatList} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../grafico/grafico';

const datosHistorial = [
  { nombre: 'Juan Pérez', rut: '12.345.678-9', fecha: '2025-03-21' },
  { nombre: 'Ana Soto', rut: '11.223.334-5', fecha: '2025-01-15' },
  { nombre: 'Carlos Ruiz', rut: '20.111.222-3', fecha: '2024-12-02' },
  // Agrega más pacientes si lo deseas
];

const ordenarPorCampo = (lista: any[], campo: string, asc: boolean) => {
  return [...lista].sort((a, b) => {
    if (campo === 'fecha') {
      const fechaA = new Date(a[campo]);
      const fechaB = new Date(b[campo]);
      return asc ? fechaA.getTime() - fechaB.getTime() : fechaB.getTime() - fechaA.getTime();
    }

    return asc
      ? a[campo].localeCompare(b[campo])
      : b[campo].localeCompare(a[campo]);
  });
};

const obtenerDiasDelMes = (mes: number, anio: number) => {
  return new Date(anio, mes, 0).getDate(); // mes 1-12
};

const FechaSelector = ({ campo, onChange }: { campo: any; onChange: (valor: string) => void }) => {
  const fechaActual = new Date();

  const [anio, setAnio] = useState(fechaActual.getFullYear());
  const [mes, setMes] = useState(fechaActual.getMonth() + 1); // 1-12
  const [dia, setDia] = useState(fechaActual.getDate());

  const anios = Array.from({ length: 120 }, (_, i) => fechaActual.getFullYear() - i);
  const meses = Array.from({ length: 12 }, (_, i) => i + 1);
  const dias = Array.from({ length: obtenerDiasDelMes(mes, anio) }, (_, i) => i + 1);

  useEffect(() => {
    // actualizar valor completo en formato ISO cuando cambie algo
    const fechaFormateada = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    onChange(fechaFormateada);
  }, [anio, mes, dia]);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 4 }}>{campo.nombre}:</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Picker
          selectedValue={anio}
          style={{ flex: 1 }}
          onValueChange={(value) => setAnio(value)}
        >
          {anios.map((y) => (
            <Picker.Item key={y} label={y.toString()} value={y} />
          ))}
        </Picker>

        <Picker
          selectedValue={mes}
          style={{ flex: 1 }}
          onValueChange={(value) => {
            setMes(value);
            // si el día actual no existe en el nuevo mes, ajustarlo
            const maxDia = obtenerDiasDelMes(value, anio);
            if (dia > maxDia) setDia(maxDia);
          }}
        >
          {meses.map((m) => (
            <Picker.Item key={m} label={m.toString()} value={m} />
          ))}
        </Picker>

        <Picker
          selectedValue={dia}
          style={{ flex: 1 }}
          onValueChange={(value) => setDia(value)}
        >
          {dias.map((d) => (
            <Picker.Item key={d} label={d.toString()} value={d} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

type CampoMedico = {
  nombre: string;
  valor: string;
  tipo: string;
  seccion: string;
  obligatorio: boolean;
 };

const medicalData: CampoMedico[][] = [
  // Documento 1
  [
  { nombre: "ID Persona", valor: "123456", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "N° de Historia", valor: "78910", tipo: "Numérico", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Documento (RUT)", valor: "12.345.678-9", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Nombres", valor: "Juan", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Apellido Paterno", valor: "Pérez", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Apellido Materno", valor: "Gutiérrez", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Fecha de Nacimiento", valor: "1985-03-15", tipo: "Fecha", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Edad", valor: "40", tipo: "Numérico", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Sexo", valor: "Varón", tipo: "Selección(Varón/Mujer)", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Profesional Asignado", valor: "Dr. Alfredo González", tipo: "Selección", seccion: "Datos Administrativos", obligatorio: true },
  { nombre: "Centro", valor: "CESFAM Central", tipo: "Selección", seccion: "Centro", obligatorio: true },
  { nombre: "Fecha de Inscripción", valor: "2022-10-01", tipo: "Fecha", seccion: "Datos Administrativos", obligatorio: true },
  ],
  // Documento 2
  [
  { nombre: "ID Persona", valor: "789123", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "N° de Historia", valor: "11223", tipo: "Numérico", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Documento (RUT)", valor: "98.765.432-1", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Nombres", valor: "María", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Apellido Paterno", valor: "Fernández", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Apellido Materno", valor: "López", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Fecha de Nacimiento", valor: "1990-07-22", tipo: "Fecha", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Edad", valor: "34", tipo: "Numérico", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Sexo", valor: "Mujer", tipo: "Selección(Varón/Mujer)", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Profesional Asignado", valor: "Dra. Patricia Vega", tipo: "Selección", seccion: "Datos Administrativos", obligatorio: true },
  { nombre: "Centro", valor: "CESFAM Norte", tipo: "Selección", seccion: "Centro", obligatorio: true },
  { nombre: "Fecha de Inscripción", valor: "2023-02-12", tipo: "Fecha", seccion: "Datos Administrativos", obligatorio: true },
  ],
  // Documento 3
  [
  { nombre: "ID Persona", valor: "456321", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "N° de Historia", valor: "99887", tipo: "Numérico", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Documento (RUT)", valor: "11.222.333-4", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Nombres", valor: "Carlos", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Apellido Paterno", valor: "Rojas", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Apellido Materno", valor: "Morales", tipo: "Texto", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Fecha de Nacimiento", valor: "1978-11-30", tipo: "Fecha", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Edad", valor: "46", tipo: "Numérico", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Sexo", valor: "Varón", tipo: "Selección(Varón/Mujer)", seccion: "Datos Personales", obligatorio: true },
  { nombre: "Profesional Asignado", valor: "Dr. Matías Ruiz", tipo: "Selección", seccion: "Datos Administrativos", obligatorio: true },
  { nombre: "Centro", valor: "CESFAM Oriente", tipo: "Selección", seccion: "Centro", obligatorio: true },
  { nombre: "Fecha de Inscripción", valor: "2021-06-08", tipo: "Fecha", seccion: "Datos Administrativos", obligatorio: true },
  ]
  ];


interface Props {
  titulo: string;
  datos: { [key: string]: string };
}

export const Seccion = ({ titulo, datos }: Props) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontWeight: 'bold' }}>{titulo}</Text>
      {Object.entries(datos).map(([label, valor]) => (
        <Text key={label}>
          {formatearLabel(label)}: {valor}
        </Text>
      ))}
    </View>
  );
};

const formatearLabel = (texto: string) => {
  return texto
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

const clientes = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'Ana Gómez' },
  { id: 3, nombre: 'Carlos Díaz' },
  { id: 4, nombre: 'María Rodríguez' },
  { id: 5, nombre: 'Luis Fernández' },
  { id: 6, nombre: 'Patricia López' },
  { id: 7, nombre: 'Javier Martínez' },
  { id: 8, nombre: 'Laura Sánchez' },
];


/////////////////////////////////////////////////////////////////////////////////////////////////////////

export const HistorialMenu = () => {
  const [ordenCampo, setOrdenCampo] = useState<'nombre' | 'rut' | 'fecha'>('fecha');
  const [ascendente, setAscendente] = useState(true);

  const pacientesOrdenados = ordenarPorCampo(datosHistorial, ordenCampo, ascendente);

  const cambiarOrden = (campo: 'nombre' | 'rut' | 'fecha') => {
    if (ordenCampo === campo) {
      setAscendente(!ascendente); // Alterna si ya está seleccionado
    } else {
      setOrdenCampo(campo);
      setAscendente(true);
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Historial de Pacientes</Text>

      {/* Encabezado con botones de ordenamiento */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        {['nombre', 'rut', 'fecha'].map((campo) => (
          <TouchableOpacity key={campo} onPress={() => cambiarOrden(campo as any)}>
            <Text style={{ fontWeight: ordenCampo === campo ? 'bold' : 'normal' }}>
              {campo.charAt(0).toUpperCase() + campo.slice(1)}
              {ordenCampo === campo ? (ascendente ? ' ↑' : ' ↓') : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de pacientes */}
      <FlatList
        data={pacientesOrdenados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text><Text style={{ fontWeight: 'bold' }}>Nombre:</Text> {item.nombre}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>RUT:</Text> {item.rut}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Fecha:</Text> {item.fecha}</Text>
          </View>
        )}
      />
    </View>
  );
};

// 👉 Funciones externas para mostrar contenido en la izquierda
export const ListadoPacientesMenu = () => {
  // Listado de clientes (nombres aleatorios)
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Listado de Clientes</Text>
    <ScrollView style={styles.scroll}>
      {clientes.map(cliente => (
        <View key={cliente.id} style={styles.clienteItem}>
          <Text style={styles.clienteNombre}>{cliente.nombre}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
  );
};

export const FichaMedicaActivaMenu = () => {
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

  // Organizar campos por secciones
  const datosPorSeccion: { [key: string]: CampoMedico[] } = {};
  documentoActual.forEach((campo) => {
    if (!datosPorSeccion[campo.seccion]) datosPorSeccion[campo.seccion] = [];
    datosPorSeccion[campo.seccion].push(campo);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ficha Médica</Text>

      {/* Selector de documento */}
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
                    onChangeText={(text) =>
                      handleValorChange(campo.nombre, text.replace(/[^0-9]/g, ''))
                    }
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
