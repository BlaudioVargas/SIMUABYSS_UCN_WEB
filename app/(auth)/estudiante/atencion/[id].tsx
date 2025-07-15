// app/docente/atencion/[id].tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Button,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/components/AuthContext";

export default function AtencionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [atencion, setAtencion] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAtencion = async () => {
      try {
        const res = await fetch(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/atencion/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Error al obtener la atención");
        }

        const data = await res.json();
        setAtencion(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAtencion();
  }, [id]);

  if (loading)
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#007AFF" />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;
  if (!atencion) return <Text style={styles.error}>Atención no encontrada</Text>;

  const paciente = atencion.agenda.fichaClinica.user;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Ficha de Atención</Text>

      {/* Info del Paciente */}
      <View style={styles.section}>
        <Text style={styles.label}>Nombre:</Text>
        <Text>{paciente.name}</Text>

        <Text style={styles.label}>RUT:</Text>
        <Text>{paciente.rut || "-"}</Text>

        <Text style={styles.label}>Edad:</Text>
        <Text>{paciente.fechaNacimiento || "-"}</Text>
      </View>

      {/* MEAP */}
      <View style={styles.section}>
        <Text style={styles.label}>Motivo:</Text>
        <Text>{atencion.motivo || "-"}</Text>

        <Text style={styles.label}>Anamnesis:</Text>
        <Text>{atencion.anamnesis || "-"}</Text>

        <Text style={styles.label}>Exploración:</Text>
        <Text>{atencion.exploracion || "-"}</Text>

        <Text style={styles.label}>Diagnóstico:</Text>
        <Text>{atencion.diagnostico || "-"}</Text>

        <Text style={styles.label}>Actuación:</Text>
        <Text>{atencion.actuacion || "-"}</Text>
      </View>

      {/* Botón Aplicar Pauta */}
      <Button
        title="Aplicar Pauta"
        onPress={() => router.push(`/`)} //cambiar
        color="#007AFF"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
    backgroundColor: "#EEF2FF",
    padding: 12,
    borderRadius: 8,
  },
  label: {
    fontWeight: "bold",
    marginTop: 6,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
