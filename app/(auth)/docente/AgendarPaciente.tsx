import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
	RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useObtenerPacientes } from "@/hooks/useObtenerPacientes";
import { ordenarPorCampo } from "@/utils/sortUtils";
import { useCrearAgenda } from "@/hooks/useCrearAgenda";
import { useAuth } from "@/components/AuthContext";
import { ModalCrearAtencion } from "@/components/ModalCrearAtencion";

export default function AgendarPaciente() {
	const { pacientes, loading, obtenerPacientes } = useObtenerPacientes();
	const { user } = useAuth();
	const { crearAgenda } = useCrearAgenda();

	const [ordenCampo, setOrdenCampo] = useState<"nombre" | "edad" | "rut">("nombre");
	const [ascendente, setAscendente] = useState(true);

	// Estado para modal y datos
	const [modalVisible, setModalVisible] = useState(false);
	const [pacienteSeleccionado, setPacienteSeleccionado] = useState<any | null>(null);
	const [agendaIdCreada, setAgendaIdCreada] = useState<number | null>(null);

	const pacientesTransformados = pacientes.map((p) => ({
		id: p.id,
		docenteId: user?.id,
		nombre: `${p.nombres ?? ""} ${p.apellidoPaterno ?? ""} ${p.apellidoMaterno ?? ""}`.trim(),
		edad: p.edad,
		prevision: p.prevision,
		rut: p.rut,
		prestacion: p.motivo,
	}));

	const pacientesOrdenados = ordenarPorCampo(pacientesTransformados, ordenCampo, ascendente);

	const cambiarOrden = (campo: "nombre" | "edad" | "rut") => {
		if (ordenCampo === campo) setAscendente(!ascendente);
		else {
			setOrdenCampo(campo);
			setAscendente(true);
		}
	};

	const agendarCita = async (paciente: any) => {
		try {
			const agenda = await crearAgenda({
				userId: paciente.id,
				responsableId: paciente.docenteId,
				pacienteNombre: paciente.nombre,
				edad: paciente.edad,
				prevision: paciente.prevision ?? "Sin previsión",
				documento: paciente.rut,
				prestacion: paciente.prestacion ?? "Consulta general",
			});

			alert("Atención agendada correctamente.");
			setAgendaIdCreada(agenda.id);
			setPacienteSeleccionado(paciente);
			setModalVisible(true); // abrir modal luego de crear agenda
		} catch (error) {
			console.error("error: ", error);
			alert('Error al agendar atención.');
		}
	};

	return (
		<View style={{ padding: 10 }}>
			<Text style={styles.titulo}>Agendar Atención</Text>

			<View style={styles.encabezado}>
				<View style={{ width: 40 }} />
				{[
					{ key: "nombre", label: "Nombre" },
					{ key: "edad", label: "Edad" },
					{ key: "rut", label: "RUT" },
				].map(({ key, label }) => (
					<TouchableOpacity
						key={key}
						style={{ flex: 1, alignItems: "center" }}
						onPress={() => cambiarOrden(key as any)}
					>
						<Text style={{ fontWeight: ordenCampo === key ? "bold" : "normal" }}>
							{label}
							{ordenCampo === key ? (ascendente ? " ↑" : " ↓") : ""}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			{loading ? (
				<ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
			) : (
				<FlatList
					data={pacientesOrdenados}
					keyExtractor={(item) => item.id.toString()}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={obtenerPacientes} />}
					renderItem={({ item }) => (
						<View style={styles.item}>
							<View style={{ width: 40, alignItems: "center" }}>
								<TouchableOpacity onPress={() => agendarCita(item)}>
									<MaterialIcons name="event-available" size={24} color="#007BFF" />
								</TouchableOpacity>
							</View>
							<View style={{ flex: 1, alignItems: "center" }}>
								<Text>{item.nombre}</Text>
							</View>
							<View style={{ flex: 1, alignItems: "center" }}>
								<Text>{item.edad}</Text>
							</View>
							<View style={{ flex: 1, alignItems: "center" }}>
								<Text>{item.rut}</Text>
							</View>
						</View>
					)}
				/>
			)}

			{/* Modal externo para crear atención */}
			<ModalCrearAtencion
				fichaClinicaId={1/* hay que cambiarlo ahora */}
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				paciente={pacienteSeleccionado}
				agendaId={agendaIdCreada}
				docenteId={user?.id}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	titulo: {
		fontSize: 22,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
	},
	encabezado: {
		flexDirection: "row",
		backgroundColor: "#E0E0E0",
		paddingVertical: 8,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: "#999",
	},
	item: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderColor: "#ccc",
		paddingVertical: 10,
		alignItems: "center",
	},
});
