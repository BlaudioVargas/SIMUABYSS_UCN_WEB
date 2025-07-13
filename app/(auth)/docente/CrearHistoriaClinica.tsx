import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "@/components/AuthContext";
import { crearHistoriaClinica } from "@/app/api/api";

export default function CrearHistoriaClinica() {
  const { accessToken } = useAuth();
  const [fichaId, setFichaId] = useState("");

  const handleCrear = async () => {
    if (!accessToken || !fichaId) {
      Alert.alert("Error", "Debe ingresar el ID de una ficha clínica");
      return;
    }

    try {
      await crearHistoriaClinica(accessToken, Number(fichaId));
      Alert.alert("Éxito", "Historia clínica creada correctamente.");
      setFichaId("");
    } catch (error: any) {
      Alert.alert("Error", error.message || "No se pudo crear la historia clínica.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID de Ficha Clínica:</Text>
      <TextInput
        style={styles.input}
        value={fichaId}
        onChangeText={setFichaId}
        keyboardType="numeric"
        placeholder="Ej: 123"
      />
      <Button title="Crear Historia Clínica" onPress={handleCrear} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { marginBottom: 8, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 16,
  },
});
