import React from "react";
import { View, Alert } from "react-native";
import PautaForm from "@/components/PautaForm";
import { useCrearPauta } from "@/hooks/useCrearPauta";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "expo-router";

export default function CrearPauta() {
  const { accessToken } = useAuth();
  const crearPauta = useCrearPauta(accessToken);
  const router = useRouter();

  const handleSubmit = async (data: {
  nombre: string;
  descripcion: string;
  categoria: string;
  nivelAcademicoSugerido: string;
}) => {
  if (!accessToken) {
    Alert.alert("Error", "No autenticado");
    return;
  }
  try {
    // Agregamos estructura y activa con valores por defecto
    const dataConDefaults = {
      ...data,
      estructura: {},     // estructura como objeto vacío
      activa: true        // activa como booleano
    };

    await crearPauta.crear(dataConDefaults);
    Alert.alert("Éxito", "Pauta creada correctamente");
    router.push("./ListaPautas");
  } catch (e: any) {
    Alert.alert("Error", e.message || "No se pudo crear pauta");
  }
};


  return (
    <View style={{ flex: 1 }}>
      <PautaForm onSubmit={handleSubmit} />
    </View>
  );
}
