import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

type PautaFormProps = {
  onSubmit: (data: {
    nombre: string;
    descripcion: string;
    categoria: string;
    nivelAcademicoSugerido: string;
  }) => Promise<any>;
  initialData?: {
    nombre: string;
    descripcion: string;
    categoria: string;
    nivelAcademicoSugerido: string;
  };
};

export default function PautaForm({ onSubmit, initialData }: PautaFormProps) {
  const [nombre, setNombre] = useState(initialData?.nombre ?? "");
  const [descripcion, setDescripcion] = useState(initialData?.descripcion ?? "");
  const [categoria, setCategoria] = useState(initialData?.categoria ?? "");
  const [nivel, setNivel] = useState(initialData?.nivelAcademicoSugerido ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await onSubmit({ nombre, descripcion, categoria, nivelAcademicoSugerido: nivel });
    } catch (err: any) {
      setError(err.message || "Error al guardar pauta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {!!error && <Text style={styles.error}>{error}</Text>}
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} style={styles.input} multiline />
      <TextInput placeholder="Categoría" value={categoria} onChangeText={setCategoria} style={styles.input} />
      <TextInput placeholder="Nivel Académico" value={nivel} onChangeText={setNivel} style={styles.input} />
      <Button title={loading ? "Guardando..." : "Guardar"} onPress={handleSubmit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 4, padding: 8, marginBottom: 12 },
  error: { color: "red", marginBottom: 8 },
});
