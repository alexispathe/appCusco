import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import  RNFS  from 'react-native-fs';
import Share from 'react-native-share';

export const OpenExcelFile = () => {
  const selectedYear = '2023'; // Aquí deberías obtener el año seleccionado

  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'black', fontSize: 20 }}>Abrir archivo de Excel</Text>
      <Button title="Abrir archivo" onPress={handleOpenExcelFile} />
    </View>
  );
};

