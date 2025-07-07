import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/components/AuthContext";
import { router, Slot } from "expo-router";

export default function EstudianteLayout() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user?.role !== "estudiante") {
      router.replace("/"); // redirige si no es estudiante
    }
  }, [user, loading]);

  if (loading || !user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Slot />;
}
