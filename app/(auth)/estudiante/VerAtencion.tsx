import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/components/AuthContext";
import { obtenerAtencionPorId } from "@/app/api/api";

export default function VerAtencion() {
  const { accessToken } = useAuth();
  const { id } = useLocalSearchParams();
  const [atencion, setAtencion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken || !id) return;
    setLoading(true);
    obtenerAtencionPorId(accessToken, Number(id))
      .then((data) => setAtencion(data))
      .catch((e) => setError(e.message || "Error al cargar atención"))
      .finally(() => setLoading(false));
  }, [accessToken, id]);

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  if (!atencion)
    return (
      <View style={styles.center}>
        <Text>Atención no encontrada.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de Atención #{atencion.id}</Text>
      <Text style={styles.label}>Motivo:</Text>
      <Text style={styles.value}>{atencion.motivo}</Text>
      <Text style={styles.label}>Anamnesis:</Text>
      <Text style={styles.value}>{atencion.anamnesis}</Text>
      <Text style={styles.label}>Exploración:</Text>
      <Text style={styles.value}>{atencion.exploracion}</Text>
      <Text style={styles.label}>Diagnóstico:</Text>
      <Text style={styles.value}>{atencion.diagnostico}</Text>
      <Text style={styles.label}>Actuación:</Text>
      <Text style={styles.value}>{atencion.actuacion}</Text>
      <Text style={styles.label}>Fecha:</Text>
      <Text style={styles.value}>
        {new Date(atencion.fecha).toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  label: { fontWeight: "bold", marginTop: 12 },
  value: { marginTop: 4 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red" },
});
