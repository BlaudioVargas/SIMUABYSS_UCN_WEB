import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, Slot } from "expo-router";
import { useAuth } from "@/components/AuthContext";

export default function AuthLayout() {
  const { user, logout } = useAuth();
  const [botonActivo, setBotonActivo] = useState("login");

  const botones = [
    {
      key: "HistorialMenu",
      titulo: "Historial",
      icon: "person-search",
      roles: ["docente"],
    },
    {
      key: "CrearPaciente",
      titulo: "Paciente",
      icon: "person-add",
      roles: ["docente"], // solo para docentes
    },
    {
      key: "AgendarPaciente",
      titulo: "Agendar",
      icon: "event-available",
      roles: ["docente"], // solo para docentes
    },
    {
      key: "AtenderPaciente",
      titulo: "Atender",
      icon: "medical-services",
      roles: ["estudiante"], // visible para ambos
    },
  ];

  const handleLogOut = () => {
    logout();
    router.push("/");
  };

  const handlePress = (key: string) => {
    setBotonActivo(key);
    console.log(router.push(`./${key}`));
  };

  const renderButton = (key: string, icon: string, label: string) => (
    <Pressable
      key={key}
      onPress={() => handlePress(key)}
      style={[styles.boton, botonActivo === key && styles.botonActivo]}
    >
      <MaterialIcons name={icon as any} size={24} color="white" />
      <Text style={styles.botonTexto}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={styles.contenedor}>
      <View style={styles.lateral}>

        {/* Título con logo y texto */}
        <View style={styles.tituloContainer}>
          <Image
            source={{
              uri: "https://ucnold.ucn.cl/wp-content/uploads/2018/05/Escudo-UCN-Full-Color.png",
            }}
            style={styles.logoUCN}
            resizeMode="contain"
          />
          <Text style={styles.titulo}>
            Simuabyss <Text style={styles.rolText}>{user?.role.toUpperCase()}</Text>
          </Text>
        </View>

        {botones
          .filter(({ roles }) => !roles || roles.includes(user?.role ?? "estudiante")) // 👈 filtra según rol
          .map(({ key, icon, titulo }) => renderButton(key, icon, titulo))}
        <Pressable
          onPress={handleLogOut}
          style={[styles.boton, { backgroundColor: "darkred", marginTop: 30 }]}
        >
          <MaterialIcons name="logout" size={24} color="white" />
          <Text style={styles.botonTexto}>Cerrar Sesión</Text>
        </Pressable>
      </View>
      <View style={styles.contenido}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: "row",
  },
  lateral: {
    width: 200,
    backgroundColor: "#1E3A8A",
    padding: 20,
    justifyContent: "flex-start",
  },
  tituloContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoUCN: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  titulo: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  rolText: {
    fontWeight: "normal",
  },
  boton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    borderRadius: 8,
    marginBottom: 10,
  },
  botonActivo: {
    backgroundColor: "#4682B4",
  },
  botonTexto: {
    color: "white",
    marginLeft: 10,
  },
  contenido: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
});
