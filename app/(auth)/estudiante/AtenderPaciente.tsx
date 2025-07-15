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
import React, { useState } from "react";
import { useObtenerAgendas } from "@/hooks/useObtenerAgendas";
import { MaterialIcons } from "@expo/vector-icons";
import AlertDialog from "@/app/components/AlertDialog";
import { router } from "expo-router";
import { useIniciarAtencion } from "@/hooks/useIniciarAtencion";

export default function AtenderPaciente() {
  const { agendas, loading, obtenerAgendas } = useObtenerAgendas();
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const { iniciarAtencion } = useIniciarAtencion();

  const iniciarAtencionPaciente = async (agenda: any) => {
    const response = await iniciarAtencion({
      agendaId: agenda.id,
    });

    if (response) {
      router.push(`/estudiante/atencion/${response.id}`);
    }
  };

  const handleAgendar = async () => {
    try {
      await obtenerAgendas();
    } catch (e) {
      setDialogMessage('Hubo un problema en los datos');
      setDialogVisible(true);
    }
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
            <RefreshControl refreshing={loading} onRefresh={handleAgendar} />
          }
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={{ width: 40, alignItems: "center" }}>
                <TouchableOpacity onPress={() => iniciarAtencionPaciente(item)}>
                  <MaterialIcons name="medical-services" size={24} color="#28a745" />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>{`${item.fichaClinica.user?.nombres} ${item.fichaClinica.user?.apellidoPaterno}`}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>{item.fichaClinica.user?.rut}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>{new Date(item.createdAt).toLocaleString()}</Text>
              </View>
            </View>
          )}
        />
      )}
      <AlertDialog
        visible={dialogVisible}
        title="SimuAbyss"
        message={dialogMessage}
        onClose={() => {
          setDialogVisible(false);
        }}
      />
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
