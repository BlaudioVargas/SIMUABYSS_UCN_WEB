import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useAuth } from "@/components/AuthContext";
import { useObtenerEvaluaciones } from "@/hooks/useObtenerEvaluaciones";
import { useRouter } from "expo-router";
import EvaluacionCard from "@/components/EvaluacionCard";

export default function EvaluacionesRealizadas() {
  const { accessToken } = useAuth();
  const { evaluaciones, loading, error } = useObtenerEvaluaciones(accessToken);
  const router = useRouter();

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

  return (
    <View style={styles.container}>
      <FlatList
        data={evaluaciones}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }: { item: any }) => (
          <TouchableOpacity
            onPress={() => router.push(`./VerEvaluacion?id=${item.id}`)}
          >
            <EvaluacionCard evaluacion={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No hay evaluaciones realizadas.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red" },
});
