import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, Slot } from "expo-router";
import { useAuth } from "@/components/AuthContext";

export default function AuthLayout() {
	const {logout} = useAuth();
	const [botonActivo, setBotonActivo] = useState("login");

	const botones = [
		{
			key: "HistorialMenu",
			titulo: "Historial",
			icon: "person-search",
		},
		{
			key: "CrearPaciente",
			titulo: "Paciente",
			icon: "person-add",
		},
	];

	const handleLogOut= () => {
		logout();
		router.push('/');
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
				<Text style={styles.titulo}>Simuabyss DOCENTE</Text>
				{botones.map(({ key, icon, titulo }) => renderButton(key, icon, titulo))}
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
	titulo: {
		color: "white",
		fontWeight: "bold",
		fontSize: 18,
		marginBottom: 20,
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
