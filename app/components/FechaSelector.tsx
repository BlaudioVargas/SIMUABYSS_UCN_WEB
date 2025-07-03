// app/components/FechaSelector.tsx
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Campo = {
  nombre: string;
  valor: string;
  tipo: string;
  seccion?: string;
  obligatorio?: boolean;
};

const obtenerDiasDelMes = (mes: number, anio: number) => {
  return new Date(anio, mes, 0).getDate();
};

const FechaSelector = ({
  campo,
  onChange,
}: {
  campo: Campo;
  onChange: (valor: string) => void;
}) => {
  const fechaActual = new Date();
  const [anio, setAnio] = useState(fechaActual.getFullYear());
  const [mes, setMes] = useState(fechaActual.getMonth() + 1);
  const [dia, setDia] = useState(fechaActual.getDate());

  const anios = Array.from({ length: 120 }, (_, i) => fechaActual.getFullYear() - i);
  const meses = Array.from({ length: 12 }, (_, i) => i + 1);
  const dias = Array.from({ length: obtenerDiasDelMes(mes, anio) }, (_, i) => i + 1);

  useEffect(() => {
    const fechaFormateada = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    onChange(fechaFormateada);
  }, [anio, mes, dia]);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 4 }}>{campo.nombre}:</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Picker selectedValue={anio} style={{ flex: 1 }} onValueChange={(value) => setAnio(value)}>
          {anios.map((y) => (
            <Picker.Item key={y} label={y.toString()} value={y} />
          ))}
        </Picker>

        <Picker
          selectedValue={mes}
          style={{ flex: 1 }}
          onValueChange={(value) => {
            setMes(value);
            const maxDia = obtenerDiasDelMes(value, anio);
            if (dia > maxDia) setDia(maxDia);
          }}
        >
          {meses.map((m) => (
            <Picker.Item key={m} label={m.toString()} value={m} />
          ))}
        </Picker>

        <Picker selectedValue={dia} style={{ flex: 1 }} onValueChange={(value) => setDia(value)}>
          {dias.map((d) => (
            <Picker.Item key={d} label={d.toString()} value={d} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default FechaSelector;
