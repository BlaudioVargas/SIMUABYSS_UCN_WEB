import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from "@/components/AuthContext";
import { useBuscarHistoriaClinica } from "@/hooks/useBuscarHistoriaClinica";
import FichaClinicaCard from "@/components/FichaClinicaCard";
import type { HistoriaClinica } from "@/types/types";


export default function VerFichaClinica() {
  const { user } = useAuth();
  const { historia, buscar, loading, error } = useBuscarHistoriaClinica();

  useEffect(() => {
    if (user?.name) {
      buscar(user.name);
    }
  }, [user]);

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
  if (!historia) {
    return (
      <View style={styles.center}>
        <Text>No se encontró ficha clínica.</Text>
      </View>
    );
  }

  // historia.fichaClinica es el objeto que FichaClinicaCard necesita
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Ficha Clínica</Text>
      <FichaClinicaCard ficha={historia.fichaClinica} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red" },
});
