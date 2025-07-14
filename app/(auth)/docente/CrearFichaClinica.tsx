import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "@/components/AuthContext";
import { crearFichaClinica } from "@/app/api/api";
import { useObtenerPacientes } from "@/hooks/useObtenerPacientes";
import { MaterialIcons } from "@expo/vector-icons";

export default function CrearFichaClinica() {
  const { accessToken } = useAuth();
  const { pacientes } = useObtenerPacientes();

  const [rutInput, setRutInput] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [mostrarLista, setMostrarLista] = useState(false);

  const handleCrear = async () => {
    const pacienteSeleccionado = pacientes.find((p) => p.rut === rutInput);

    if (!accessToken || !pacienteSeleccionado) {
      Alert.alert("Error", "Debes seleccionar un RUT válido.");
      return;
    }

    try {
      await crearFichaClinica(accessToken, {
        userId: pacienteSeleccionado.id,
        observacionesGenerales: observaciones,
      });
      Alert.alert("Éxito", "Ficha clínica creada correctamente.");
      setRutInput("");
      setObservaciones("");
    } catch (error: any) {
      Alert.alert("Error", error.message || "No se pudo crear la ficha clínica.");
    }
  };

  const rutsFiltrados = pacientes.filter((p) =>
    p.rut.toLowerCase().includes(rutInput.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>RUT del Paciente:</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={rutInput}
          onChangeText={(text) => {
            setRutInput(text);
            setMostrarLista(true);
          }}
          placeholder="Ingrese RUT"
        />
        <TouchableOpacity onPress={() => setMostrarLista((prev) => !prev)}>
          <MaterialIcons name="arrow-drop-down" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {mostrarLista && (
        <FlatList
          data={rutInput ? rutsFiltrados : pacientes}
          keyExtractor={(item) => item.rut}
          style={styles.lista}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setRutInput(item.rut);
                setMostrarLista(false);
              }}
            >
              <Text style={styles.itemLista}>{item.rut} - {item.nombres} {item.apellidoPaterno}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Text style={styles.label}>Observaciones generales:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={observaciones}
        onChangeText={setObservaciones}
        multiline
      />

      <Button title="Crear ficha clínica" onPress={handleCrear} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { marginBottom: 4, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  lista: {
    maxHeight: 150,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  itemLista: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
