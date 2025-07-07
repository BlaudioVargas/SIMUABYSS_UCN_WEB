import { useState } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground, StyleSheet, useWindowDimensions,Dimensions  } from 'react-native';
import { useRouter } from 'expo-router';
import { validarCredenciales } from './src/validacion';

class BlackBox {
  private usuario: string;
  private clave: string;

  constructor() {
    this.usuario = '';
    this.clave = '';
  }

  setUsuario(usuario: string) {
    this.usuario = usuario;
  }

  setClave(clave: string) {
    this.clave = clave;
  }

  getUsuario(): string {
    return this.usuario;
  }

  getClave(): string {
    return this.clave;
  }
}

const blackbox = new BlackBox();

export default function HomeScreen() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const router = useRouter();
  
  // Obtener dimensiones de la ventana para determinar la orientación
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;  // Si la altura es mayor que el ancho, estamos en vertical

  const iniciarSesion = async () => {
    blackbox.setUsuario(usuario);
    blackbox.setClave(clave);

    try {
      const resultado = await validarCredenciales(blackbox.getUsuario(), blackbox.getClave());

      if (resultado === 1) {
        setMensajeError('');
        router.push({
          pathname: '/layout',
          params: { usuario: blackbox.getUsuario(), clave: blackbox.getClave() }
        });
      } else if (resultado === 2) {
        setMensajeError("Usuario incorrecto");
      } else if (resultado === 3) {
        setMensajeError("Contraseña incorrecta");
      }
    } catch (error) {
      setMensajeError("Error inesperado al iniciar sesión");
      console.error("Error en la autenticación:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Cambiar el orden de las vistas según la orientación */}
      {isPortrait ? (
        // Pantalla vertical
        <View style={{ flex: 1 }}>
          {/* Parte superior - Celeste */}
          <ImageBackground
              source={{ uri: 'https://www.noticias.ucn.cl/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-21-at-1.44.47-PM.jpeg' }}
              style={{
                width: '100%',   // Ocupa todo el ancho de la pantalla
                height: 300,     // Altura fija
                justifyContent: 'center', // Asegura que el contenido se centre en la pantalla
              }}
              resizeMode="cover"
            >
              {/* Overlay translúcido celeste */}
              <View style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(135, 206, 250, 0.6)',  // Color translúcido
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 50, // Asegura que el contenido no quede pegado a la parte superior
              }}>
                {/* Escudo en la esquina superior izquierda */}
                <Image
                  source={{ uri: 'https://ucnold.ucn.cl/wp-content/uploads/2018/05/Escudo-UCN-Full-Color.png' }}
                  style={{
                    width: 100,               // Ancho del escudo
                    height: 100,              // Alto del escudo
                    resizeMode: 'contain',    // Asegura que no se distorsione
                    position: 'absolute',     // Posiciona la imagen libremente
                    top: 0,                   // En la parte superior
                    left: 0,                  // A la izquierda
                  }}
                />

                {/* Texto ajustable al 80% del ancho */}
                <Text style={{
                  fontSize: width * 0.1,     // Ajusta el tamaño del texto al 10% del ancho de la pantalla
                  fontWeight: 'bold',
                  color: 'white',
                  marginTop: 120,            // Espacio desde el escudo
                  textAlign: 'center',      // Centra el texto
                  width: '80%',             // El texto ocupará el 80% del ancho
                }}>
                  SimuAbyssUCN
                </Text>
              </View>
            </ImageBackground>

          {/* Parte inferior - Azul con imagen */}
          <View style={{ flex: 1, backgroundColor: '#00008B', justifyContent: 'center', alignItems: 'center' }}>
            
            <TextInput
              placeholder="Usuario"
              value={usuario}
              onChangeText={setUsuario}
              style={{ width: 200, height: 40, borderBottomWidth: 1, marginBottom: 10, backgroundColor: 'white' }}
            />
            <TextInput
              placeholder="Clave"
              value={clave}
              onChangeText={setClave}
              secureTextEntry
              style={{ width: 200, height: 40, borderBottomWidth: 1, marginBottom: 10, backgroundColor: 'white' }}
            />
            {mensajeError !== '' && <Text style={{ color: 'red', marginBottom: 10 }}>{mensajeError}</Text>}
            {/* Botón con estilo personalizado */}
            <View style={{ width: 250, backgroundColor: 'gray', borderRadius: 5 }}>
              <Button title="LOGIN" onPress={iniciarSesion} color="grey" />
            </View>
          </View>
        </View>
        
      ) : (
        // Pantalla horizontal
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {/* Parte izquierda - Azul */}
          <View style={{ flex: 0.9, backgroundColor: '#00008B', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', color: 'white', marginBottom: 20 ,width: '80%', }}>SimuAbyssUCN</Text>
            <TextInput
              placeholder="Usuario"
              value={usuario}
              onChangeText={setUsuario}
              style={{ width: 200, height: 40, borderBottomWidth: 1, marginBottom: 10, backgroundColor: 'white' }}
            />
            <TextInput
              placeholder="Clave"
              value={clave}
              onChangeText={setClave}
              secureTextEntry
              style={{ width: 200, height: 40, borderBottomWidth: 1, marginBottom: 10, backgroundColor: 'white' }}
            />
            {mensajeError !== '' && <Text style={{ color: 'red', marginBottom: 10 }}>{mensajeError}</Text>}
            {/* Botón con estilo personalizado */}
            <View style={{ width: 250, backgroundColor: 'gray', borderRadius: 5 }}>
              <Button title="LOGIN" onPress={iniciarSesion} color="grey" />
            </View>
          </View>

          {/* Parte derecha - Fondo con imagen y overlay celeste + escudo */}
          <ImageBackground
            source={{ uri: 'https://www.noticias.ucn.cl/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-21-at-1.44.47-PM.jpeg' }}
            style={{ flex: 1 }}
            resizeMode="cover"
          >
            {/* Overlay translúcido celeste */}
            <View style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(135, 206, 250, 0.6)',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {/* Escudo centrado */}
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
