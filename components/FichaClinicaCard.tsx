import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Ficha = {
  id: number;
  user: { nombres: string; apellidoPaterno: string; rut: string };
  observacionesGenerales?: string;
  fechaCreacion: string;
  fechaUltimaAtencion?: string;
};

export default function FichaClinicaCard({ ficha }: { ficha: Ficha }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{`${ficha.user.nombres} ${ficha.user.apellidoPaterno}`}</Text>
      <Text>RUT: {ficha.user.rut}</Text>
      {!!ficha.observacionesGenerales && <Text>Obs.: {ficha.observacionesGenerales}</Text>}
      <Text>Creada: {new Date(ficha.fechaCreacion).toLocaleDateString()}</Text>
      {!!ficha.fechaUltimaAtencion && (
        <Text>Última atención: {new Date(ficha.fechaUltimaAtencion).toLocaleDateString()}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, borderColor: "#aaa", borderRadius: 6, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
});
