import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useCrearAtencion } from "@/hooks/useCrearAtencion";
import { useAuth } from "@/components/AuthContext";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === "web") {
    return <View style={{ flex: 1 }}>{children}</View>;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

interface Props {
  visible: boolean;
  onClose: () => void;
  paciente: { id: number; nombre: string } | null;
  agendaId: number | null;
  docenteId: number | undefined; // si lo tienes en props
  fichaClinicaId: number; // necesitas pasar fichaClinicaId al modal
  animationType?: "none" | "slide" | "fade";
}

export const ModalCrearAtencion = ({
  visible,
  onClose,
  paciente,
  agendaId,
  docenteId,
  fichaClinicaId,
  animationType = "fade",
}: Props) => {
  const { user } = useAuth(); // para obtener estudianteId u otro dato
  const estudianteId = user?.id; // Ajusta según tu contexto
  const { crearAtencion } = useCrearAtencion();

  const [motivo, setMotivo] = useState("");
  const [anamnesis, setAnamnesis] = useState("");
  const [exploracion, setExploracion] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [actuacion, setActuacion] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validarCampos = () => {
    const newErrors: { [key: string]: string } = {};
    if (!motivo.trim()) newErrors.motivo = "Motivo requerido";
    if (!anamnesis.trim()) newErrors.anamnesis = "Anamnesis requerida";
    if (!exploracion.trim()) newErrors.exploracion = "Exploración requerida";
    if (!diagnostico.trim()) newErrors.diagnostico = "Diagnóstico requerido";
    if (!actuacion.trim()) newErrors.actuacion = "Actuación requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setMotivo("");
    setAnamnesis("");
    setExploracion("");
    setDiagnostico("");
    setActuacion("");
    setErrors({});
  };

  const onSubmit = async () => {
    if (!validarCampos()) return;

    if (!agendaId || !paciente || !docenteId || !estudianteId || !fichaClinicaId) {
      Alert.alert("Error", "Faltan datos obligatorios para crear la atención.");
      return;
    }

    try {
      await crearAtencion({
        motivo,
        anamnesis,
        exploracion,
        diagnostico,
        actuacion,
        fichaClinicaId,
        agendaId,
        estudianteId,
        docenteId,
        pacienteId: paciente.id,
      });
      Alert.alert("Éxito", "Atención creada correctamente.");
      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo crear la atención.");
    }
  };

  const cerrarYResetear = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType={animationType}
      transparent={true}
      onRequestClose={cerrarYResetear}
    >
      <View style={styles.overlay}>
        <Wrapper>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.popupContainer}
          >
            <View>
              <Text style={styles.title}>Nueva Atención para {paciente?.nombre}</Text>

              {[
                { label: "Motivo", value: motivo, setter: setMotivo, error: errors.motivo },
                { label: "Anamnesis", value: anamnesis, setter: setAnamnesis, error: errors.anamnesis },
                { label: "Exploración", value: exploracion, setter: setExploracion, error: errors.exploracion },
                { label: "Diagnóstico", value: diagnostico, setter: setDiagnostico, error: errors.diagnostico },
                { label: "Actuación", value: actuacion, setter: setActuacion, error: errors.actuacion },
              ].map(({ label, value, setter, error }) => (
                <View key={label} style={styles.inputGroup}>
                  <TextInput
                    style={styles.input}
                    placeholder={label}
                    value={value}
                    onChangeText={setter}
                    multiline={true}
                    blurOnSubmit={false}
                    textAlignVertical="top"
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect={false}
                  />
                  {error && <Text style={styles.error}>{error}</Text>}
                </View>
              ))}

              <TouchableOpacity onPress={onSubmit} style={styles.btn}>
                <Text style={styles.btnText}>Crear Atención</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cerrarYResetear} style={[styles.btn, styles.btnCancel]}>
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Wrapper>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    width: "90%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignSelf: "center",
    marginTop: 50,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    // Elevación para Android
    elevation: 15,
    // Borde para contorno visible
    borderWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    minHeight: 80,
    textAlignVertical: "top",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
  btn: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  btnCancel: {
    backgroundColor: "#6c757d",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
