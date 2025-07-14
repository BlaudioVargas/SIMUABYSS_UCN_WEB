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

import { useBuscarFichaClinicaPorId } from "@/hooks/useBuscarFichaClinicaPorId";
import FichaClinicaCard from "@/components/FichaClinicaCard";

export default function BuscarFichaClinicaPorId() {
  const [id, setId] = useState("");
  const { ficha, buscarPorId, loading, error } = useBuscarFichaClinicaPorId();

  const handleBuscar = () => {
    if (id.trim() === "") return;
    buscarPorId(id.trim());
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Buscar Ficha Clínica por ID</Text>

      <TextInput
        placeholder="Ingrese ID de ficha clínica"
        keyboardType="numeric"
        value={id}
        onChangeText={setId}
        style={styles.input}
      />

      <Button title="Buscar" onPress={handleBuscar} disabled={loading || id.trim() === ""} />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

      {error && <Text style={styles.error}>{error}</Text>}

      {ficha && <FichaClinicaCard ficha={ficha} />}

      {!ficha && !loading && !error && id.trim() !== "" && (
        <Text style={{ marginTop: 20 }}>No se encontró ficha clínica con ese ID.</Text>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 16,
  },
  error: { color: "red", marginTop: 16 },
});
