import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

type CustomDialogProps = {
	visible: boolean;
	title: string;
	message: string;
	onClose: () => void;
};

const AlertDialog: React.FC<CustomDialogProps> = ({ visible, title, message, onClose }) => {
	if (!visible) return null;

	return (
		<Modal
			animationType="fade"
			transparent
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.overlay}>
				<View style={styles.dialog}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.message}>{message}</Text>
					<TouchableOpacity style={styles.button} onPress={onClose}>
						<Text style={styles.buttonText}>Aceptar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: '90%',
    maxWidth: 360,
    minWidth: 280,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#1E3A8A',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default AlertDialog;
