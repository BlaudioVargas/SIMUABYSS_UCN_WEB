import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, Slot } from "expo-router";
import { useAuth } from "@/components/AuthContext";
import AyudaOverlay from "../components/AyudaOverlay";

export default function AuthLayout() {
  const { user, logout } = useAuth();
  const [botonActivo, setBotonActivo] = useState("login");
  const [ayudaVisible, setAyudaVisible] = useState(false); // ✅ Estado para mostrar la ayuda

  const botones = [
    // === DOCENTE ===
    { key: "HistorialMenu", titulo: "Historial", icon: "person-search", roles: ["docente"] },
    { key: "CrearPaciente", titulo: "Paciente", icon: "person-add", roles: ["docente"] },
    ////{ key: "ListarPacientes", titulo: "Paciente", icon: "person-add", roles: ["docente"] },
    //{ key: "AgendarPaciente", titulo: "Agendar", icon: "event-available", roles: ["docente"] },
    ////{ key: "CrearPauta", titulo: "Crear Pauta", icon: "assignment", roles: ["docente"] },
    ////{ key: "ListaPautas", titulo: "Ver Pautas", icon: "list", roles: ["docente"] },
    
    //{ key: "AplicarPauta", titulo: "Aplicar Pauta", icon: "fact-check", roles: ["docente"] },
    
    { key: "EvaluacionesRealizadas", titulo: "Evaluaciones", icon: "grading", roles: ["docente"] },
    
    { key: "FichaClinicaManager", titulo: "Fichas Clinicas", icon: "person-add", roles: ["docente"] },

    //{ key: "CrearFichaClinica", titulo: "Crear Ficha Clínica", icon: "note-add", roles: ["docente"] },
    //{ key: "ListaFichasClinicas", titulo: "Fichas Clínicas", icon: "folder-shared", roles: ["docente"] },
    //{ key: "CrearHistoriaClinica", titulo: "Historia Clínica", icon: "library-add", roles: ["docente"] },
    // === AMBOS ===
    //{ key: "BuscarFichaMedicaActivaMenu", titulo: "Buscar Ficha Médica", icon: "search", roles: ["estudiante", "docente"] },
    // === ESTUDIANTE ===
    { key: "AtenderPaciente", titulo: "Atender", icon: "medical-services", roles: ["estudiante"] },
    { key: "VerFichaClinica", titulo: "Mi Ficha Clínica", icon: "folder-open", roles: ["estudiante"] },
    { key: "VerAtencion", titulo: "Mis Atenciones", icon: "medical-information", roles: ["estudiante"] },
    { key: "EvaluacionesRecibidas", titulo: "Mis Evaluaciones", icon: "emoji-events", roles: ["estudiante"] },
    { key: "VerPautaAplicada", titulo: "Detalle Evaluación", icon: "assignment-turned-in", roles: ["estudiante"] },
    { key: "BuscarFichaMedicaActivaMenu", titulo: "Buscar Ficha Médica", icon: "search", roles: ["estudiante"] },
  ];

  const handleLogOut = () => {
    logout();
    router.push("/");
  };

  const handlePress = (key: string) => {
    setBotonActivo(key);
    router.push(`./${key}`);
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
          .filter(({ roles }) => !roles || roles.includes(user?.role ?? "estudiante"))
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

        {/* Botón flotante "?" */}
        <TouchableOpacity
          onPress={() => setAyudaVisible(true)}
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: "#000",
            borderRadius: 25,
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            elevation: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 24 }}>?</Text>
        </TouchableOpacity>

        {/* Overlay de ayuda */}
        <Modal visible={ayudaVisible} animationType="slide" transparent={true}>
          <AyudaOverlay onCerrar={() => setAyudaVisible(false)} />
        </Modal>
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
