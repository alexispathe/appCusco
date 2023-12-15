import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import  RNFS  from 'react-native-fs';

export const OpenExcelFile = () => {
  const selectedYear = '2023'; // Aquí deberías obtener el año seleccionado

  const handleOpenExcelFile = async () => {
    const filePath = `${RNFS.ExternalDirectoryPath}/archivos/cusco_string_${selectedYear}.xlsx`;

    try {
      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        const options = {
          title: 'Abrir con...',
          url: `file://${filePath}`,
        };
        await Share.open(options);
      } else {
        Alert.alert('Archivo no encontrado', 'El archivo no existe en la ruta especificada.');
      }
    } catch (error) {
      Alert.alert('Error al abrir el archivo', error.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'black', fontSize: 20 }}>Abrir archivo de Excel</Text>
      <Button title="Abrir archivo" onPress={handleOpenExcelFile} />
    </View>
  );
};

