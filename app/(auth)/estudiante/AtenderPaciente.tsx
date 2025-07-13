// screens/AtenderPaciente.tsx
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useObtenerAgendas } from "@/hooks/useObtenerAgendas";
import { MaterialIcons } from "@expo/vector-icons";

export default function AtenderPaciente() {
  const { agendas, loading, obtenerAgendas } = useObtenerAgendas();

  const iniciarAtencion = (agenda: any) => {
    console.log("🩺 Iniciando atención de:", agenda.user.nombres);
    // Navegar a pantalla de atención o abrir formulario clínico
  };

  return (
    <View style={{ padding: 10 }}>
      <Text style={styles.titulo}>Pacientes Agendados</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={agendas}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={obtenerAgendas} />
          }
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={{ width: 40, alignItems: "center" }}>
                <TouchableOpacity onPress={() => iniciarAtencion(item)}>
                  <MaterialIcons name="medical-services" size={24} color="#28a745" />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>{`${item.user.nombres} ${item.user.apellidoPaterno}`}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>{item.user.edad}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>{item.user.rut}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>{new Date(item.hora).toLocaleString()}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    alignItems: "center",
  },
});
