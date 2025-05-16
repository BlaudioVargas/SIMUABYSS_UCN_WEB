import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { ordenarPorCampo } from "@/utils/sortUtils";
import { datosHistorial } from "@/constants/constantes";
import { MaterialIcons } from "@expo/vector-icons";

export default function HistorialMenu() {
	const [ordenCampo, setOrdenCampo] = useState<
		"nombre" | "edad" | "rut" | "prestacion" | "prevision" | "nota"
	>("nombre");
	const [ascendente, setAscendente] = useState(true);

	const pacientesOrdenados = ordenarPorCampo(
		datosHistorial,
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

			{/* Rows */}
			<FlatList
				data={pacientesOrdenados}
				keyExtractor={(_, index) => index.toString()}
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
						<View style={{ width: 40, alignItems: "center" }}>
							<MaterialIcons name="manage-accounts" size={24} color="#007BFF" />
						</View>
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
		</View>
	);
}

const styles = StyleSheet.create({});
