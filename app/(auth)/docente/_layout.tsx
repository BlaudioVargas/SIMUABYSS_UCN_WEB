import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "@/components/AuthContext";
import { router, Slot } from "expo-router";

export default function DocenteLayout() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user?.role !== "docente") {
      router.replace("/"); // redirige a inicio o login si no es docente
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
