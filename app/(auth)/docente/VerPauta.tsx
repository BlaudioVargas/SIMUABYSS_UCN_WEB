import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/components/AuthContext";
import { useState, useEffect } from "react";
import { obtenerPautaPorId } from "@/app/api/api";

export default function VerPauta() {
  const { id } = useLocalSearchParams();
  const { accessToken } = useAuth();
  const [pauta, setPauta] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!id || !accessToken) return;

    setLoading(true);
    obtenerPautaPorId(accessToken, Number(id))
      .then(setPauta)
      .catch((e) => setError(e.message || "Error al obtener pauta"))
      .finally(() => setLoading(false));
  }, [id, accessToken]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  if (error) return <Text style={{ color: "red" }}>{error}</Text>;
  if (!pauta) return <Text>No se encontró la pauta</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pauta.nombre}</Text>
      <Text style={styles.label}>Descripción:</Text>
      <Text>{pauta.descripcion}</Text>
      <Text style={styles.label}>Categoría:</Text>
      <Text>{pauta.categoria}</Text>
      <Text style={styles.label}>Nivel Académico Sugerido:</Text>
      <Text>{pauta.nivelAcademicoSugerido}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontWeight: "bold", fontSize: 20, marginBottom: 10 },
  label: { fontWeight: "bold", marginTop: 12, marginBottom: 4 },
});
