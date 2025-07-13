import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "@/components/AuthContext";
import { crearFichaClinica } from "@/app/api/api";

export default function CrearFichaClinica() {
  const { accessToken, user } = useAuth();
  const [userId, setUserId] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const handleCrear = async () => {
    if (!accessToken || !userId) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      await crearFichaClinica(accessToken, {
        userId: Number(userId),
        observacionesGenerales: observaciones,
      });
      Alert.alert("Éxito", "Ficha clínica creada correctamente.");
      setUserId("");
      setObservaciones("");
    } catch (error: any) {
      Alert.alert("Error", error.message || "No se pudo crear la ficha clínica.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID de Usuario del Paciente:</Text>
      <TextInput
        style={styles.input}
        value={userId}
        onChangeText={setUserId}
        keyboardType="numeric"
      />

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
});
