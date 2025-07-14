import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
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

// Hook para buscar ficha clínica por ID (inline)
function useBuscarFichaClinicaPorId() {
  const { accessToken } = useAuth();
  const [ficha, setFicha] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buscarPorId(id: string | number) {
    if (!accessToken) {
      setError("No autorizado: token no disponible.");
      return;
    }
    setLoading(true);
    setError(null);
    setFicha(null);

    try {
      const res = await fetch(`http://localhost:3000/ficha-clinica/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || "Error al buscar ficha clínica");
      }

      const data = await res.json();
      setFicha(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { ficha, buscarPorId, loading, error };
}

// Interfaz items clínicos
interface ItemClinico {
  id: number;
  enunciado: string;
  puntaje: number;
  pauta?: { id: number };
}

export default function BuscarYAplicarPauta() {
  const { accessToken } = useAuth();

  // Estado búsqueda ficha
  const [id, setId] = useState("");
  const { ficha, buscarPorId, loading: loadingFicha, error: errorFicha } = useBuscarFichaClinicaPorId();

  // Estados para pautas y items
  const [pautas, setPautas] = useState<any[]>([]);
  const [itemsClinicos, setItemsClinicos] = useState<ItemClinico[]>([]);

  const [loadingPautas, setLoadingPautas] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);

  // Selecciones y modal
  const [selectedPauta, setSelectedPauta] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Respuestas para crear pauta aplicada: {itemId, valor, comentario?}
  const [respuestas, setRespuestas] = useState<
    { itemId: number; valor: number | null; comentario?: string }[]
  >([]);

  // Cargar pautas al inicio
  useEffect(() => {
    if (!accessToken) return;

    setLoadingPautas(true);
    obtenerPautas(accessToken)
      .then(setPautas)
      .catch((e) => Alert.alert("Error", e.message || "No se pudieron cargar pautas"))
      .finally(() => setLoadingPautas(false));
  }, [accessToken]);

  // Cuando cambia pauta seleccionada, cargar items clínicos y reiniciar respuestas
  useEffect(() => {
    if (selectedPauta === null) {
      setItemsClinicos([]);
      setRespuestas([]);
      return;
    }

    setLoadingItems(true);
    obtenerItemsClinicos()
      .then((items: ItemClinico[]) => {
        console.log("Todos los items clínicos recibidos:", items);
        console.log("selectedPauta:", selectedPauta);

        // Ajusta esta línea si la estructura es diferente
        const itemsDePauta = items.filter((i) => i.pauta?.id === selectedPauta);

        console.log("Items filtrados por pauta", selectedPauta, ":", itemsDePauta);

        setItemsClinicos(itemsDePauta);

        setRespuestas(
          itemsDePauta.map((item) => ({
            itemId: item.id,
            valor: null,
            comentario: "",
          }))
        );
      })
      .catch((e) => Alert.alert("Error", e.message || "No se pudieron cargar items clínicos"))
      .finally(() => setLoadingItems(false));
  }, [selectedPauta]);

  const handleBuscar = () => {
    if (id.trim() === "") return;
    buscarPorId(id.trim());
  };

  // Actualizar valor o comentario de respuesta para un item clínico
  const handleCambiarRespuesta = (
    itemId: number,
    campo: "valor" | "comentario",
    valor: any
  ) => {
    setRespuestas((old) =>
      old.map((r) => (r.itemId === itemId ? { ...r, [campo]: valor } : r))
    );
  };

  // Enviar pauta aplicada al backend
  const handleAplicar = async () => {
    if (!accessToken) return;

    if (!ficha) {
      Alert.alert("Error", "Primero debe buscar una ficha clínica válida");
      return;
    }

    if (selectedPauta === null) {
      Alert.alert("Error", "Seleccione una pauta");
      return;
    }

    if (itemsClinicos.length === 0) {
      Alert.alert("Error", "No hay items clínicos para esta pauta");
      return;
    }

    if (respuestas.length === 0) {
      Alert.alert("Error", "No hay respuestas para enviar");
      return;
    }

    console.log("Items clínicos antes de enviar:", itemsClinicos);
    console.log("Respuestas antes de enviar:", respuestas);

    // Validar que todos los valores estén asignados y no null
    for (const r of respuestas) {
      if (r.valor === null || r.valor === undefined || r.valor === "") {
        Alert.alert("Error", "Debe ingresar valor para todas las respuestas");
        return;
      }
    }

    try {
      await crearPautaAplicada(accessToken, {
        pautaId: selectedPauta,
        atencionId: ficha.id, // Suponemos que atencionId = ficha.id (o adapta según tu API)
        respuestas: respuestas.map(({ itemId, valor, comentario }) => ({
          itemId,
          valor: Number(valor),
          comentario: comentario?.trim() || undefined,
        })),
      });
      Alert.alert("Éxito", "Pauta aplicada correctamente");
      // Limpiar o resetear formulario si quieres
      setSelectedPauta(null);
      setItemsClinicos([]);
      setRespuestas([]);
      setId("");
    } catch (e: any) {
      Alert.alert("Error", e.message || "Error al aplicar pauta");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Buscar ficha clínica por ID */}
      <Text style={styles.title}>Buscar Ficha Clínica por ID</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Ingrese ID de ficha clínica"
          keyboardType="numeric"
          value={id}
          onChangeText={setId}
          style={styles.input}
        />
        <Button title="Buscar" onPress={handleBuscar} disabled={loadingFicha || id.trim() === ""} />
      </View>

      {loadingFicha && <ActivityIndicator style={{ marginTop: 20 }} />}

      {errorFicha && <Text style={styles.error}>{errorFicha}</Text>}

      {ficha && <FichaClinicaCard ficha={ficha} />}

      {!ficha && !loadingFicha && !errorFicha && id.trim() !== "" && (
        <Text style={{ marginTop: 20 }}>No se encontró ficha clínica con ese ID.</Text>
      )}

      {/* Seleccionar pauta */}
      <Text style={styles.label}>Seleccione pauta:</Text>
      {loadingPautas ? (
        <ActivityIndicator size="small" />
      ) : (
        <FlatList
          data={pautas}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.item, selectedPauta === item.id && styles.itemSelected]}
              onPress={() => setSelectedPauta(item.id)}
            >
              <Text>{item.nombre}</Text>
              <Text>{item.categoria}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text>No hay pautas disponibles.</Text>}
          style={{ maxHeight: 200, marginBottom: 10 }}
        />
      )}

      {/* Formulario para crear pauta aplicada */}
      {selectedPauta !== null && (
        <View style={{ marginTop: 16 }}>
          <Text style={styles.label}>Pauta Aplicada - Respuestas</Text>

          {loadingItems ? (
            <ActivityIndicator size="small" />
          ) : itemsClinicos.length === 0 ? (
            <Text>No hay items clínicos para esta pauta.</Text>
          ) : (
            <FlatList
              data={itemsClinicos}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => {
                const respuesta = respuestas.find((r) => r.itemId === item.id);
                return (
                  <View key={item.id} style={styles.respuestaItem}>
                    <Text style={{ fontWeight: "bold" }}>{item.enunciado}</Text>
                    <TextInput
                      placeholder="Ingrese valor (numérico)"
                      keyboardType="numeric"
                      style={styles.inputSmall}
                      value={respuesta?.valor !== null && respuesta?.valor !== undefined ? String(respuesta.valor) : ""}
                      onChangeText={(text) =>
                        handleCambiarRespuesta(item.id, "valor", text.replace(/[^0-9]/g, ""))
                      }
                    />
                    <TextInput
                      placeholder="Comentario (opcional)"
                      style={styles.inputSmall}
                      value={respuesta?.comentario || ""}
                      onChangeText={(text) => handleCambiarRespuesta(item.id, "comentario", text)}
                    />
                  </View>
                );
              }}
            />
          )}
        </View>
      )}

      {/* Botón aplicar pauta */}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Aplicar Pauta"
          onPress={handleAplicar}
          disabled={
            loadingFicha ||
            loadingPautas ||
            loadingItems ||
            selectedPauta === null ||
            !ficha
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  searchContainer: { flexDirection: "row", marginBottom: 16, alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginRight: 8,
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 6,
    borderRadius: 6,
    marginTop: 4,
    marginBottom: 8,
  },
  error: { color: "red", marginTop: 16 },
  label: { fontWeight: "bold", marginTop: 16, marginBottom: 8, fontSize: 16 },
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
  respuestaItem: {
    marginBottom: 12,
  },
});
