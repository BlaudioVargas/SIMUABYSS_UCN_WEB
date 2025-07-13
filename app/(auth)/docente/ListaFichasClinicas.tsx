import React from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "@/components/AuthContext";
import { useObtenerFichasClinicas } from "@/hooks/useObtenerFichasClinicas";
import FichaClinicaCard from "@/components/FichaClinicaCard";

export default function ListaFichasClinicas() {
  const { accessToken } = useAuth();
  const { fichas, loading, error } = useObtenerFichasClinicas(accessToken);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fichas clínicas</Text>
      <FlatList
        data={fichas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <FichaClinicaCard ficha={item} />}
        ListEmptyComponent={<Text>No hay fichas clínicas disponibles.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  error: { color: "red", padding: 16 },
});
