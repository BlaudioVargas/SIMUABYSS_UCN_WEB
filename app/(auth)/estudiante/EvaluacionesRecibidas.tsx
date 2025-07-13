import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useAuth } from "@/components/AuthContext";
import { useObtenerEvaluaciones } from "@/hooks/useObtenerEvaluaciones";
import EvaluacionCard from "@/components/EvaluacionCard";

export default function EvaluacionesRecibidas() {
  const { accessToken, user } = useAuth();
  const { evaluaciones, loading, error } = useObtenerEvaluaciones(accessToken);

  if (loading) return <ActivityIndicator style={styles.center} />;
  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );

  // Filtrar solo las evaluaciones donde el estudiante sea el usuario actual
  const recibidas = evaluaciones.filter(
    (ev: any) => ev.estudiante?.id === user?.id
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Evaluaciones</Text>
      <FlatList
        data={recibidas}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }: { item: any }) => (
          <EvaluacionCard evaluacion={item} />
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No tienes evaluaciones aún.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red" },
});
