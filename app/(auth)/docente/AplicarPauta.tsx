import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useAuth } from "@/components/AuthContext";
import {
  obtenerAtenciones,
  obtenerPautas,
  obtenerItemsClinicos,
  crearPautaAplicada,
} from "@/app/api/api";
import ModalAplicarPauta from "@/components/ModalAplicarPauta";
import FichaClinicaCard from "@/components/FichaClinicaCard";

// Define interfaz para los items clínicos
interface ItemClinico {
  id: number;
  enunciado: string;
  puntaje: number;
  pauta?: {
    id: number;
  };
}

export default function AplicarPauta() {
  const { accessToken } = useAuth();

  const [atenciones, setAtenciones] = useState<any[]>([]);
  const [pautas, setPautas] = useState<any[]>([]);
  const [itemsClinicos, setItemsClinicos] = useState<ItemClinico[]>([]); // <-- tipado aquí

  const [loadingAtenciones, setLoadingAtenciones] = useState(true);
  const [loadingPautas, setLoadingPautas] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);

  const [selectedAtencion, setSelectedAtencion] = useState<number | null>(null);
  const [selectedPauta, setSelectedPauta] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    setLoadingAtenciones(true);
    obtenerAtenciones(accessToken)
      .then(setAtenciones)
      .catch((e) => Alert.alert("Error", e.message || "No se pudieron cargar atenciones"))
      .finally(() => setLoadingAtenciones(false));

    setLoadingPautas(true);
    obtenerPautas(accessToken)
      .then(setPautas)
      .catch((e) => Alert.alert("Error", e.message || "No se pudieron cargar pautas"))
      .finally(() => setLoadingPautas(false));
  }, [accessToken]);

  useEffect(() => {
    if (selectedPauta === null) return;

    setLoadingItems(true);
    obtenerItemsClinicos()
      .then((items: ItemClinico[]) => {
        // aquí tipas el parámetro 'i' para quitar el any implícito
        const itemsDePauta = items.filter((i: ItemClinico) => i.pauta?.id === selectedPauta);
        setItemsClinicos(itemsDePauta);
      })
      .catch((e) => Alert.alert("Error", e.message || "No se pudieron cargar items clínicos"))
      .finally(() => setLoadingItems(false));
  }, [selectedPauta]);

  const handleAplicar = () => {
    if (selectedAtencion === null || selectedPauta === null) {
      Alert.alert("Error", "Seleccione una atención y una pauta");
      return;
    }
    setModalVisible(true);
  };

  const handleEnviarRespuestas = async (
    respuestas: { itemId: number; valor: number; comentario?: string }[]
  ) => {
    if (!accessToken || selectedAtencion === null || selectedPauta === null) return;
    try {
      await crearPautaAplicada(accessToken, {
        pautaId: selectedPauta,
        atencionId: selectedAtencion,
        respuestas,
      });
      Alert.alert("Éxito", "Pauta aplicada correctamente");
      setModalVisible(false);
    } catch (e: any) {
      Alert.alert("Error", e.message || "Error al aplicar pauta");
    }
  };

  if (loadingAtenciones || loadingPautas) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.label}>Seleccione atención:</Text>
      <FlatList
        data={atenciones}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selectedAtencion === item.id && styles.itemSelected,
            ]}
            onPress={() => setSelectedAtencion(item.id)}
          >
            {item.fichaClinica ? (
              <FichaClinicaCard ficha={item.fichaClinica} />
            ) : (
              <Text>Atención #{item.id}</Text>
            )}
            <Text>Motivo: {item.motivo}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No hay atenciones disponibles.</Text>}
        style={{ maxHeight: 200 }}
      />

      <Text style={styles.label}>Seleccione pauta:</Text>
      <FlatList
        data={pautas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selectedPauta === item.id && styles.itemSelected,
            ]}
            onPress={() => setSelectedPauta(item.id)}
          >
            <Text>{item.nombre}</Text>
            <Text>{item.categoria}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No hay pautas disponibles.</Text>}
        style={{ maxHeight: 200, marginBottom: 10 }}
      />

      <Button title="Aplicar pauta" onPress={handleAplicar} />

      <ModalAplicarPauta
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        pautaId={selectedPauta || 0}
        atencionId={selectedAtencion || 0}
        items={itemsClinicos}
        onSubmit={handleEnviarRespuestas}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: "bold", marginTop: 12, marginBottom: 8, fontSize: 16 },
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    marginBottom: 8,
  },
  itemSelected: {
    backgroundColor: "#cce5ff",
    borderColor: "#004085",
  },
});
