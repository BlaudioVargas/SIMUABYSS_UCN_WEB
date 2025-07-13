import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Evaluacion = {
  id: number;
  puntaje_total: number;
  retroalimentacion: string;
  estudiante: { name?: string; email?: string };
  docente: { name?: string; email?: string };
  atencion: { id: number };
  createdAt: string;
  finalizada: boolean;
};

export default function EvaluacionCard({ evaluacion }: { evaluacion: Evaluacion }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Evaluación #{evaluacion.id}</Text>
      <Text>Puntaje: {evaluacion.puntaje_total}</Text>
      <Text>Estudiante: {evaluacion.estudiante.name ?? evaluacion.estudiante.email}</Text>
      <Text>Docente: {evaluacion.docente.name ?? evaluacion.docente.email}</Text>
      <Text>Finalizada: {evaluacion.finalizada ? "Sí" : "No"}</Text>
      <Text style={styles.feedback}>{evaluacion.retroalimentacion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, borderColor: "#ddd", borderRadius: 6, marginBottom: 12 },
  title: { fontWeight: "bold", marginBottom: 4 },
  feedback: { marginTop: 6, fontStyle: "italic" },
});
