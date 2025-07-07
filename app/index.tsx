import { useAuth } from '@/components/AuthContext';
import { router } from 'expo-router';
import React, { useState , useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const { user, login } = useAuth();
  const { promptAsync, request } = useGoogleAuth();

  const handleLogin = async () => {
    await login(username, password);
    setLoggedIn(true);
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
  };


  const handleGoogleLogin = async () => {
    await promptAsync();
    setLoggedIn(true);
  }


  const GoogleLoginButton = () => (
    <TouchableOpacity
      style={[styles.googleButton, !request && styles.disabled]}
      onPress={handleGoogleLogin}
      disabled={!request}
    >
      <Image
        source={{
          uri: 'https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000',
        }}
        style={styles.googleIcon}
      />
      <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
    </TouchableOpacity>
  );



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Parte Izquierda */}
      <ImageBackground
        source={{
          uri: 'https://www.noticias.ucn.cl/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-21-at-1.44.47-PM.jpeg',
        }}
        style={styles.leftPanel}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Image
            source={{
              uri: 'https://ucnold.ucn.cl/wp-content/uploads/2018/05/Escudo-UCN-Full-Color.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>
            Bienvenido a SIMUABYSS UCN{"\n"}
            El motivo de esta aplicación es familiarizar a los estudiantes de medicina de la UCN con
            el uso de sistemas clínicos reales como AVIS, mediante una simulación práctica y educativa.
          </Text>
        </View>
      </ImageBackground>

      {/* Parte Derecha */}
      <View style={styles.rightPanel}>
        <View style={styles.card}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="ejemplo@alumnos.ucn.cl o ejemplo@ucn.cl"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Botón de Google */}
          <GoogleLoginButton />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: width >= 768 ? 'row' : 'column',
  },
  leftPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  tagline: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#4682B4',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  disabled: {
    opacity: 0.5,
  },
});
