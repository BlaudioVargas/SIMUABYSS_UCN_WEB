import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { useAuth } from "@/components/AuthContext";
import { useLocalSearchParams } from "expo-router";
import { obtenerPautaAplicadaPorId } from "@/app/api/api";

export default function VerPautaAplicada() {
  const { accessToken } = useAuth();
  const { id } = useLocalSearchParams();
  const [pautaAp, setPautaAp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken || !id) return;
    setLoading(true);
    obtenerPautaAplicadaPorId(accessToken, Number(id))
      .then((data) => setPautaAp(data))
      .catch((e) => setError(e.message || "Error al cargar pauta aplicada"))
      .finally(() => setLoading(false));
  }, [accessToken, id]);

  if (loading) return <ActivityIndicator style={styles.center} />;
  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  if (!pautaAp)
    return (
      <View style={styles.center}>
        <Text>Pauta aplicada no encontrada.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Pauta #{pautaAp.pauta.id} aplicada a Atención #{pautaAp.atencion.id}
      </Text>
      <FlatList
        data={pautaAp.respuestas}
        keyExtractor={(r: any) => String(r.id)}
        renderItem={({ item }: { item: any }) => (
          <View style={styles.item}>
            <Text style={styles.enunciado}>{item.item.enunciado}</Text>
            <Text>
              Valor: {item.valor} — Comentario: {item.comentario || "—"}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text>No hay respuestas.</Text>}
      />
      <Text style={styles.footer}>
        Finalizada: {pautaAp.finalizada ? "Sí" : "No"}{" "}
        <Text style={styles.date}>
          ({new Date(pautaAp.fechaAplicacion).toLocaleDateString()})
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 10,
  },
  enunciado: { fontWeight: "bold", marginBottom: 4 },
  footer: { marginTop: 16, fontStyle: "italic" },
  date: { fontWeight: "normal" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red" },
});
