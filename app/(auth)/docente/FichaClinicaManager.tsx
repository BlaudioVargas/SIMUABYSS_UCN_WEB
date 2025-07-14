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
  ActivityIndicator,
} from "react-native";
import { useAuth } from "@/components/AuthContext";
import { crearFichaClinica, crearHistoriaClinica } from "@/app/api/api";
import { useObtenerPacientes } from "@/hooks/useObtenerPacientes";
import { useObtenerFichasClinicas } from "@/hooks/useObtenerFichasClinicas";
import { useIdDisponible } from "@/hooks/useIdDisponible";
import FichaClinicaCard from "@/components/FichaClinicaCard";
import { MaterialIcons } from "@expo/vector-icons";

export default function FichaClinicaManager() {
  const { accessToken } = useAuth();

  const [seccionActiva, setSeccionActiva] = useState<"crearFicha" | "listaFichas">("crearFicha");

  // Estados para crear ficha
  const { pacientes } = useObtenerPacientes();
  const { fichas, loading: loadingFichas, error: errorFichas } = useObtenerFichasClinicas(accessToken);

  const [rutInput, setRutInput] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [mostrarLista, setMostrarLista] = useState(false);

  // Hook para obtener un ID único disponible
  const idDisponible = useIdDisponible(fichas);

  const handleCrearFicha = async () => {
    if (!accessToken) {
        Alert.alert("Error", "No hay token de acceso.");
        return;
    }
    const pacienteSeleccionado = pacientes.find((p) => p.rut === rutInput);

    if (!pacienteSeleccionado) {
        Alert.alert("Error", "Debes seleccionar un RUT válido.");
        return;
    }

    const fichasPaciente = fichas.filter((f) => f.user.rut === pacienteSeleccionado.rut);
    console.log("fichasPaciente" , fichasPaciente);
    console.log("fichasPaciente.length" , fichasPaciente.length);
    try {
        if (fichasPaciente.length === 0) {
            console.log("fichasPaciente.length === 0",fichasPaciente.length === 0);
            const fichaCreada = await crearFichaClinica(accessToken, {
                userId: pacienteSeleccionado.id, // correcto
                observacionesGenerales: observaciones,
            });

            if (!fichaCreada?.id) {
                Alert.alert("Error", "No se pudo obtener el ID de la ficha creada.");
                return;
            }

            await crearHistoriaClinica(accessToken, fichaCreada.id);
            Alert.alert("Éxito", "Ficha clínica y historia clínica creadas correctamente.");
        } else {
            console.log("**fichasPaciente.length === 0",fichasPaciente.length === 0);
            const fichaExistenteId = fichasPaciente[0].id;
            console.log("**fichasPaciente.length",fichasPaciente.length++);
            await crearHistoriaClinica(accessToken, fichaExistenteId);
            Alert.alert(
                "Éxito",
                `Historia clínica creada para la ficha del paciente con RUT ${pacienteSeleccionado.rut}.`
            );
        }
        setRutInput("");
        setObservaciones("");
    } catch (error: any) {
        Alert.alert("Error", error.message || "No se pudo completar la operación.");
    }
    };


  const rutsFiltrados = pacientes.filter((p) =>
    p.rut.toLowerCase().includes(rutInput.toLowerCase())
  );

  const fichasOrdenadas = [...fichas].sort((a, b) => {
    if (a.user.rut < b.user.rut) return -1;
    if (a.user.rut > b.user.rut) return 1;
    return 0;
  });

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      {/* Menú de pestañas */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, seccionActiva === "crearFicha" && styles.tabActivo]}
          onPress={() => setSeccionActiva("crearFicha")}
        >
          <Text style={styles.tabTexto}>Crear Ficha Clínica</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, seccionActiva === "listaFichas" && styles.tabActivo]}
          onPress={() => setSeccionActiva("listaFichas")}
        >
          <Text style={styles.tabTexto}>Lista Fichas</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido por sección */}
      <View style={{ flex: 1, padding: 16 }}>
        {seccionActiva === "crearFicha" && (
          <>
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
                autoCapitalize="characters"
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
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setRutInput(item.rut);
                      setMostrarLista(false);
                    }}
                  >
                    <Text style={styles.itemLista}>
                      {item.rut} - {item.nombres} {item.apellidoPaterno}
                    </Text>
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
            <Button title="Crear ficha clínica" onPress={handleCrearFicha} />
          </>
        )}

        {seccionActiva === "listaFichas" && (
          <>
            <Text style={styles.title}>Fichas clínicas</Text>
            {loadingFichas && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
            {errorFichas && <Text style={styles.error}>Error: {errorFichas}</Text>}
            {!loadingFichas && !errorFichas && (
              <FlatList
                data={fichasOrdenadas}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <FichaClinicaCard ficha={item} />}
                ListEmptyComponent={<Text>No hay fichas clínicas disponibles.</Text>}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#eee",
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tabActivo: {
    backgroundColor: "#007AFF",
  },
  tabTexto: {
    fontWeight: "bold",
    color: "#000",
  },
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  lista: {
    maxHeight: 150,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  itemLista: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  error: { color: "red", padding: 16 },
});
