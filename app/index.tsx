import { useState } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUsuario } from '../src/conexion_back/conexion';

export default function HomeScreen() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;

  const iniciarSesion = async () => {
    try {
      const respuesta = await loginUsuario(usuario, clave);
      setMensajeError('');

      // Aquí podrías guardar el token en un store/context/AsyncStorage
      // Por ahora solo redirige con los datos
      router.push({
        pathname: '/layout',
        params: { token: respuesta.access_token, email: respuesta.user.email }
      });

    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      const mensaje = error.message.includes('401') 
        ? 'Credenciales incorrectas' 
        : 'Error inesperado al iniciar sesión';
      setMensajeError(mensaje);
    }
  };

  const renderFormulario = () => (
    <View style={{ flex: 1, backgroundColor: '#00008B', justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
      />
      <TextInput
        placeholder="Clave"
        value={clave}
        onChangeText={setClave}
        secureTextEntry
        style={styles.input}
      />
      {mensajeError !== '' && <Text style={styles.errorText}>{mensajeError}</Text>}
      <View style={styles.boton}>
        <Button title="LOGIN" onPress={iniciarSesion} color="grey" />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {isPortrait ? (
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={{ uri: 'https://www.noticias.ucn.cl/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-21-at-1.44.47-PM.jpeg' }}
            style={styles.imageBackground}
            resizeMode="cover"
          >
            <View style={styles.overlay}>
              <Image
                source={{ uri: 'https://ucnold.ucn.cl/wp-content/uploads/2018/05/Escudo-UCN-Full-Color.png' }}
                style={styles.logo}
              />
              <Text style={{ ...styles.titulo, fontSize: width * 0.1 }}>SimuAbyssUCN</Text>
            </View>
          </ImageBackground>
          {renderFormulario()}
        </View>
      ) : (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {renderFormulario()}
          <ImageBackground
            source={{ uri: 'https://www.noticias.ucn.cl/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-21-at-1.44.47-PM.jpeg' }}
            style={{ flex: 1 }}
            resizeMode="cover"
          >
            <View style={styles.overlay}>
              <Image
                source={{ uri: 'https://ucnold.ucn.cl/wp-content/uploads/2018/05/Escudo-UCN-Full-Color.png' }}
                style={{ width: width * 0.4, height: 700, resizeMode: 'contain' }}
              />
            </View>
          </ImageBackground>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  boton: {
    width: 250,
    backgroundColor: 'gray',
    borderRadius: 5
  },
  errorText: {
    color: 'red',
    marginBottom: 10
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(135, 206, 250, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  imageBackground: {
    width: '100%',
    height: 300,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    left: 0
  },
  titulo: {
    fontWeight: 'bold',
    color: 'white',
    marginTop: 120,
    textAlign: 'center',
    width: '80%'
  }
});
