import React from 'react';
import { View, Text } from 'react-native';

export const Seccion = ({ titulo, datos }: { titulo: string, datos: { [key: string]: string } }) => (
  <View style={{ marginTop: 10 }}>
    <Text style={{ fontWeight: 'bold' }}>{titulo}</Text>
    {Object.entries(datos).map(([label, valor]) => (
      <Text key={label}>{formatearLabel(label)}: {valor}</Text>
    ))}
  </View>
);
const formatearLabel = (texto: string) => texto.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
