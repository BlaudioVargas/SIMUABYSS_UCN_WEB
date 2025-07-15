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
import { ordenarPorCampo } from "@/utils/sortUtils";
import { MaterialIcons } from "@expo/vector-icons";
import { useObtenerPacientes } from "@/hooks/useObtenerPacientes";
import { router } from "expo-router";


export default function HistorialMenu() {
	const { pacientes, loading, obtenerPacientes } = useObtenerPacientes();
	const [ordenCampo, setOrdenCampo] = useState<
		"nombre" | "edad" | "rut" | "prestacion" | "prevision" | "nota"
	>("nombre");
	const [ascendente, setAscendente] = useState(true);

	const pacientesTransformados = pacientes.map((p) => ({
	nombre: `${p.nombres ?? ""} ${p.apellidoPaterno ?? ""} ${p.apellidoMaterno ?? ""}`.trim(),
	edad: p.edad,
	rut: p.rut,
	prestacion: p.motivo,
	prevision: p.prevision,
	nota: p.comentarios ?? "", // "comentario" del backend se usa como "nota"
	}));

	// Ordenar pacientes con la misma lógica que antes
	const pacientesOrdenados = ordenarPorCampo(
		pacientesTransformados,
		ordenCampo,
		ascendente
	);

	const cambiarOrden = (
		campo: "nombre" | "edad" | "rut" | "prestacion" | "prevision" | "nota"
	) => {
		if (ordenCampo === campo) setAscendente(!ascendente);
		else {
			setOrdenCampo(campo);
			setAscendente(true);
		}
	};

	const campos = [
		{ key: "nombre", label: "Nombre" },
		{ key: "edad", label: "Edad" },
		{ key: "rut", label: "RUT" },
		{ key: "prestacion", label: "Prestación" },
		{ key: "prevision", label: "Previsión" },
		{ key: "nota", label: "Nota" },
	];

	return (
		<View style={{ padding: 10 }}>
			<Text
				style={{
					fontSize: 22,
					fontWeight: "bold",
					textAlign: "center",
					marginBottom: 10,
				}}
			>
				Historial de Pacientes
			</Text>

			{/* Header */}
			<View
				style={{
					flexDirection: "row",
					backgroundColor: "#E0E0E0",
					paddingVertical: 8,
					borderTopWidth: 1,
					borderBottomWidth: 1,
					borderColor: "#999",
				}}
			>
				<View style={{ width: 40 }} />
				<View style={{ width: 40 }} />
				{campos.map(({ key, label }) => (
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
					keyExtractor={(_, index) => index.toString()}
					refreshControl={
						<RefreshControl refreshing={loading} onRefresh={obtenerPacientes} />
					}
					renderItem={({ item }) => (
						<View
							style={{
								flexDirection: "row",
								borderBottomWidth: 1,
								borderColor: "#ccc",
								paddingVertical: 10,
								alignItems: "center",
							}}
						>
							<TouchableOpacity
								style={{ width: 40, alignItems: "center" }}
								onPress={() => router.push(`./FichaPaciente?rut=${item.rut}`)}
							>
								<MaterialIcons name="manage-accounts" size={24} color="#007BFF" />
							</TouchableOpacity>
							<View style={{ width: 40, alignItems: "center" }}>
								<MaterialIcons name="person-search" size={24} color="#28A745" />
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
							<View style={{ flex: 1, alignItems: "center" }}>
								<Text>{item.prestacion}</Text>
							</View>
							<View style={{ flex: 1, alignItems: "center" }}>
								<Text>{item.prevision}</Text>
							</View>
							<View style={{ flex: 1, alignItems: "center" }}>
								<Text>{item.nota}</Text>
							</View>
						</View>
					)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({});
