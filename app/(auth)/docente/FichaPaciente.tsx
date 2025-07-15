import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Button,
    Alert,
    TextInput,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useObtenerFichaPaciente } from '@/hooks/useObtenerFichaPaciente';
import { useObtenerEstudiantes } from '@/hooks/useObtenerEstudiantes';
import { useAgendarAtencion } from '@/hooks/useAgendarAtencion';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'expo-router';
import AlertDialog from '@/app/components/AlertDialog';


export default function FichaPaciente() {
    const { user } = useAuth();
    const { rut } = useLocalSearchParams<{ rut: string }>();
    const { ficha, loading, error } = useObtenerFichaPaciente(rut);
    const { estudiantes, loading: loadingEstudiantes } = useObtenerEstudiantes();
    const { agendar, loading: loadingAgendar } = useAgendarAtencion();

    const [seleccionados, setSeleccionados] = useState<number[]>([]);
    const [motivo, setMotivo] = useState('');
    const [anamnesis, setAnamnesis] = useState('');
    const [exploracion, setExploracion] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [actuacion, setActuacion] = useState('');
    const router = useRouter();
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');


    if (loading || loadingEstudiantes)
        return <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#007AFF" />;
    if (error) return <Text style={styles.error}>Error: {error}</Text>;
    if (!ficha) return <Text style={styles.error}>No se encontró la ficha</Text>;

    const paciente = ficha;

    const toggleSeleccion = (id: number) => {
        setSeleccionados((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleAgendar = async () => {
        try {
            await agendar({
                fichaClinicaId: ficha.id,
                estudiantesIds: seleccionados,
                responsableId: user!.userId,
                motivoAtencion: motivo,
                // incluir MEADA si corresponde
            });
            setDialogMessage('Atención agendada correctamente');
            setDialogVisible(true);
        } catch (e) {
            setDialogMessage('Hubo un problema al agendar');
            setDialogVisible(true);
        }
    };


    return (

        <ScrollView style={styles.container}>
            <AlertDialog
                visible={dialogVisible}
                title="SimuAbyss"
                message={dialogMessage}
                onClose={() => {
                    setDialogVisible(false);
                    if (dialogMessage === 'Atención agendada correctamente') {
                        router.replace('/docente/HistorialMenu'); // 👈 redirección al historial
                    }
                }}
            />


            {/* Información del Paciente */}
            <View style={styles.pacienteInfo}>
                <Text style={styles.subtitulo}>Paciente</Text>
                <View style={styles.filaPaciente}>
                    <Text style={styles.valor}>{paciente.nombres} {paciente.apellidoPaterno} {paciente.apellidoMaterno}</Text>
                </View>
                <View style={styles.filaPaciente}>
                    <Text style={styles.valor}>{paciente.rut}</Text>
                </View>
                <View style={styles.filaPaciente}>
                    <Text style={styles.valor}>20</Text>
                </View>
            </View>

            {/* Contenido dividido horizontalmente */}
            <View style={styles.horizontalSplit}>
                {/* Izquierda: Estudiantes */}
                <View style={styles.columnaIzquierda}>
                    <Text style={styles.subtitulo}>Asignar estudiantes</Text>
                    {estudiantes.map((est) => (
                        <View key={est.id} style={styles.filaEstudiante}>
                            <Button
                                title={seleccionados.includes(est.id) ? '✓' : '○'}
                                onPress={() => toggleSeleccion(est.id)}
                            />
                            <Text style={{ marginLeft: 10 }}>{est.name}</Text>
                        </View>
                    ))}
                </View>

                {/* Derecha: MEADA editable */}
                <View style={styles.columnaDerecha}>
                    <Text style={styles.subtitulo}>MEADA</Text>
                    <View style={styles.meadaBox}>
                        <TextInput style={styles.input} placeholder="Motivo" value={motivo} onChangeText={setMotivo} multiline />
                        <TextInput style={styles.input} placeholder="Anamnesis" value={anamnesis} onChangeText={setAnamnesis} multiline />
                        <TextInput style={styles.input} placeholder="Exploración" value={exploracion} onChangeText={setExploracion} multiline />
                        <TextInput style={styles.input} placeholder="Diagnóstico" value={diagnostico} onChangeText={setDiagnostico} multiline />
                        <TextInput style={styles.input} placeholder="Actuación" value={actuacion} onChangeText={setActuacion} multiline />
                    </View>
                </View>
            </View>

            {/* Botón de agendar */}
            <View style={styles.acciones}>
                <Button title="Agendar Atención" onPress={handleAgendar} disabled={loadingAgendar} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    pacienteInfo: {
        marginBottom: 20,
        backgroundColor: '#EEF2FF',
        padding: 12,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        gap: "15%"
    },
    horizontalSplit: {
        flexDirection: 'row',
        gap: 16,
    },
    columnaIzquierda: {
        flex: 1,
        paddingRight: 8,
    },
    columnaDerecha: {
        flex: 1,
        paddingLeft: 8,
    },
    filaEstudiante: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 10,
        borderRadius: 6,
        backgroundColor: '#fff',
        minHeight: 60,
        textAlignVertical: 'top',
    },
    acciones: {
        marginTop: 24,
        marginRight: "auto"
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },

    filaPaciente: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    valor: {
        flex: 1,
        color: '#1E3A8A',
    },
    meadaBox: {
        backgroundColor: '#DBEAFE', // azul suave
        padding: 12,
        borderRadius: 10,
    },
});
