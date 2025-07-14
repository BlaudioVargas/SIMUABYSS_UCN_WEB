import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Ficha = {
  id: number;
  user: {
    id: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno?: string;
    rut: string;
    fechaNacimiento?: string;
    edad?: number;
    sexo?: string;
    estadoCivil?: string;
    direccion?: string;
    telefonoPersonal?: string;
    email?: string;
    prevision?: string;
  };
  observacionesGenerales?: string;
  fechaCreacion: string;
  fechaUltimaAtencion?: string;
};

export default function FichaClinicaCard({ ficha }: { ficha: Ficha }) {
  const { user } = ficha;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{`${user.nombres} ${user.apellidoPaterno} ${user.apellidoMaterno || ""}`}</Text>
      <Text>ID: {user.id}</Text>
      <Text>RUT: {user.rut}</Text>
      {user.fechaNacimiento && <Text>Fecha Nacimiento: {new Date(user.fechaNacimiento).toLocaleDateString()}</Text>}
      {user.edad && <Text>Edad: {user.edad}</Text>}
      {user.sexo && <Text>Sexo: {user.sexo}</Text>}
      {user.estadoCivil && <Text>Estado Civil: {user.estadoCivil}</Text>}
      {user.direccion && <Text>Dirección: {user.direccion}</Text>}
      {user.telefonoPersonal && <Text>Teléfono: {user.telefonoPersonal}</Text>}
      {user.email && <Text>Email: {user.email}</Text>}
      {user.prevision && <Text>Previsión: {user.prevision}</Text>}

      {!!ficha.observacionesGenerales && <Text>Obs.: {ficha.observacionesGenerales}</Text>}
      <Text>Creada: {new Date(ficha.fechaCreacion).toLocaleDateString()}</Text>
      {!!ficha.fechaUltimaAtencion && (
        <Text>Última atención: {new Date(ficha.fechaUltimaAtencion).toLocaleDateString()}</Text>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, borderColor: "#aaa", borderRadius: 6, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
});
