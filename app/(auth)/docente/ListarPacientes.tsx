import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '@/components/AuthContext'; // Asumo que tienes este hook para obtener token
import { obtenerUsuarios } from '@/app/api/api'; // Ajusta la ruta según tu estructura

export default function ListarPacientes() {
  const { accessToken } = useAuth();

  const [pacientes, setPacientes] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar pacientes
  const cargarPacientes = async () => {
    if (!accessToken) {
      setError('No se encontró token de acceso');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerUsuarios(accessToken);
      setPacientes(data);
    } catch (e: any) {
      setError(e.message || 'Error al cargar pacientes');
      Alert.alert('Error', error || 'Error al cargar pacientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPacientes();
  }, [accessToken]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.nombre}>
        {item.nombres} {item.apellidoPaterno} {item.apellidoMaterno || ''}
      </Text>
      <Text style={styles.rut}>RUT: {item.rut}</Text>
      <Text>Fecha de nacimiento: {item.fechaNacimiento}</Text>
      {/* Aquí puedes agregar más campos */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pacientes</Text>
      {loading && <ActivityIndicator size="large" color="#007AFF" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && (
        <FlatList
          data={pacientes}
          keyExtractor={(item) => item.id?.toString() || item.rut}
          renderItem={renderItem}
          contentContainerStyle={pacientes.length === 0 ? styles.emptyContainer : undefined}
          ListEmptyComponent={<Text>No hay pacientes registrados.</Text>}
          refreshing={loading}
          onRefresh={cargarPacientes}
        />
      )}

      <TouchableOpacity style={styles.boton} onPress={cargarPacientes}>
        <Text style={styles.textoBoton}>Refrescar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
  },
  rut: {
    color: '#555',
    marginBottom: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
