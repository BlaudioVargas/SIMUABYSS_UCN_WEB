import React from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useObtenerPautas } from "@/hooks/useObtenerPautas";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "expo-router";

export default function ListaPautas() {
  const { accessToken } = useAuth();
  const pautasQuery = useObtenerPautas(accessToken || "");
  const router = useRouter();

  if (pautasQuery.loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }
    if (pautasQuery.error) {
    return <Text>Error al cargar pautas: {String(pautasQuery.error)}</Text>;
    }


  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={pautasQuery.pautas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => router.push(`./VerPauta?id=${item.id}`)}
          >
            <Text style={styles.title}>{item.nombre}</Text>
            <Text>{item.categoria}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No hay pautas creadas.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
