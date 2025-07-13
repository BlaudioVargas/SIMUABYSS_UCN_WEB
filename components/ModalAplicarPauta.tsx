import React, { useState } from "react";
import { Modal, View, Text, Button, TextInput, ScrollView, StyleSheet } from "react-native";

type ItemClinico = { id: number; enunciado: string; puntaje: number };
type ModalAplicarPautaProps = {
  visible: boolean;
  onClose: () => void;
  pautaId: number;
  atencionId: number;
  items: ItemClinico[];
  onSubmit: (respuestas: { itemId: number; valor: number; comentario?: string }[]) => Promise<any>;
};

export default function ModalAplicarPauta({
  visible,
  onClose,
  pautaId,
  atencionId,
  items,
  onSubmit,
}: ModalAplicarPautaProps) {
  const [respuestas, setRespuestas] = useState<{ [key: number]: any }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (id: number, field: string, value: string) => {
    setRespuestas((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleEnviar = async () => {
    const arr = items.map((it) => ({
      itemId: it.id,
      valor: Number(respuestas[it.id]?.valor ?? 0),
      comentario: respuestas[it.id]?.comentario ?? "",
    }));

    setLoading(true);
    await onSubmit(arr);
    setLoading(false);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.header}>
        <Text style={styles.title}>Aplicar pauta #{pautaId}</Text>
      </View>
      <ScrollView style={styles.body}>
        {items.map((it) => (
          <View key={it.id} style={styles.item}>
            <Text style={styles.enunciado}>{it.enunciado}</Text>
            <TextInput
              placeholder="Valor"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={(t) => handleChange(it.id, "valor", t)}
            />
            <TextInput
              placeholder="Comentario (opcional)"
              multiline
              style={styles.input}
              onChangeText={(t) => handleChange(it.id, "comentario", t)}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Cancelar" onPress={onClose} />
        <Button title={loading ? "Enviando..." : "Enviar"} onPress={handleEnviar} disabled={loading} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: { padding: 16, backgroundColor: "#1976D2" },
  title: { color: "#fff", fontSize: 18 },
  body: { padding: 16 },
  item: { marginBottom: 16 },
  enunciado: { marginBottom: 8, fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 4, padding: 8, marginBottom: 8 },
  footer: { flexDirection: "row", justifyContent: "space-around", padding: 16 },
});
