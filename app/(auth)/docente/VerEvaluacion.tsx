import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useAuth } from "@/components/AuthContext";
import { useLocalSearchParams  } from "expo-router";
import { obtenerEvaluacionPorId } from "@/app/api/api";
import EvaluacionCard from "@/components/EvaluacionCard";

export default function VerEvaluacion() {
  const { accessToken } = useAuth();
  const { id } = useLocalSearchParams (); // CORRECTO: useSearchParams
  const [evaluacion, setEvaluacion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken || !id) return;
    setLoading(true);
    obtenerEvaluacionPorId(accessToken, Number(id))
      .then((data) => setEvaluacion(data))
      .catch((e) => setError(e.message || "Error al cargar evaluación"))
      .finally(() => setLoading(false));
  }, [accessToken, id]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.center} />;
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }
  if (!evaluacion) {
    return (
      <View style={styles.center}>
        <Text>Evaluación no encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <EvaluacionCard evaluacion={evaluacion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red" },
});
