import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useBuscarHistoriaClinica } from "@/hooks/useBuscarHistoriaClinica";
import FichaClinicaCard from "@/components/FichaClinicaCard";

export default function BuscarFichaMedicaActivaMenu() {
  const [rut, setRut] = useState("");
  const { historia, buscar, loading, error } = useBuscarHistoriaClinica();

  const handleBuscar = () => {
    if (rut.trim() !== "") {
      buscar(rut.trim());
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Text style={styles.title}>Buscar Ficha Médica por RUT</Text>

      <TextInput
        placeholder="Ingrese RUT (Ej: 12.345.678-9)"
        value={rut}
        onChangeText={setRut}
        style={styles.input}
        autoCapitalize="characters"
      />

      <Button title="Buscar" onPress={handleBuscar} disabled={loading || rut.trim() === ""} />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

      {error && <Text style={styles.error}>{error}</Text>}

      {historia?.fichaClinica && (
        <View style={{ marginTop: 24 }}>
          <FichaClinicaCard ficha={historia.fichaClinica} />
        </View>
      )}

      {!historia && !loading && rut.trim() !== "" && !error && (
        <Text style={{ marginTop: 20 }}>No se encontró ficha asociada a ese RUT.</Text>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  error: { color: "red", marginTop: 16 },
});
