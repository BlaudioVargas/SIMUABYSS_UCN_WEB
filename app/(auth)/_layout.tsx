import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function AuthLayout() {
	return (
		<View>
			<View>
				<Text>AuthLayout</Text>
                <MaterialIcons name="logout"/>
			</View>
            <Slot/>
		</View>
	);
}

const styles = StyleSheet.create({
    layout: {

    }
});
