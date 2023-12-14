import React, {useState, useEffect} from 'react';
import {View, Button, Alert, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  uploadLocalDataToFirestore,
  clearLocalData,
} from '../assets/questionnaireFunctions';

export const DataUploadScreen = () => {
  const [dataCount, setDataCount] = useState(0);
  useEffect(() => {
    const getDataCount = async () => {
      const localData = await AsyncStorage.getItem('localData');
      if (localData) {
        const parsedLocalData = JSON.parse(localData);
        setDataCount(parsedLocalData.length);
      }
    };

    getDataCount();
  }, []);

  const handleDataUpload = async () => {
    const localData = await AsyncStorage.getItem('localData');
    if (localData) {
      const parsedLocalData = JSON.parse(localData);
      if (parsedLocalData.length > 0) {
        try {
          await uploadLocalDataToFirestore(parsedLocalData);
          await clearLocalData();
          Alert.alert(
            'Datos subidos exitosamente y almacenamiento local limpiado',
          );
          setDataCount(0);
        } catch (error) {
          Alert.alert('Error al subir los datos a Firestore: ', error);
        }
      } else {
        Alert.alert('No hay datos locales para subir');
      }
    } else {
      Alert.alert('No hay datos locales almacenados');
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={
          styles.dataCountText
        }>{`Cantidad de cuestionarios a subir: ${dataCount}`}</Text>
      <Button title="Subir Datos" onPress={handleDataUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  dataCountText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
