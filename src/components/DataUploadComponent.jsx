// Componente que sirve para subir los datos almacenados localemente al Firestore
import React, {useState, useEffect} from 'react';
import {View, Button, Alert, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  uploadLocalDataToFirestore,
  clearLocalData,
} from '../assets/questionnaireFunctions';
import NetInfo from '@react-native-community/netinfo'; //Verificar si hay internet
import { useNavigation } from '@react-navigation/native';

export const DataUploadScreen = () => {
    const [dataCount, setDataCount] = useState(0);
    const [hasDataToUpload, setHasDataToUpload] = useState(false);
    const navigation = useNavigation();
  
    useEffect(() => {
      const getDataCount = async () => {
        const localData = await AsyncStorage.getItem('localData');
        if (localData) {
          const parsedLocalData = JSON.parse(localData);
          setDataCount(parsedLocalData.length);
          setHasDataToUpload(true);
        }
      };
  
      getDataCount();
    }, []);
  
    const handleDataUpload = async () => {
      const netInfoState = await NetInfo.fetch();
      if (!netInfoState.isConnected) {
        Alert.alert('Sin conexión', 'Revise la conexión a internet para subir los datos');
      } else {
        if (hasDataToUpload) {
          const localData = await AsyncStorage.getItem('localData');
          if (localData) {
            const parsedLocalData = JSON.parse(localData);
            try {
              await uploadLocalDataToFirestore(parsedLocalData);
              await clearLocalData();
              await Alert.alert('Aviso', 'Datos subidos exitosamente y almacenamiento local limpiado');
              setDataCount(0);
              setHasDataToUpload(false);
              await navigation.navigate('Home');
            } catch (error) {
              Alert.alert('Error', 'Error al subir los datos a la nube: ', error);
            }
          } else {
            Alert.alert('Error', 'No hay datos locales almacenados');
          }
        } else {
          Alert.alert('Aviso', 'No hay datos para subir a la nube');
        }
      }
    };
  
    return (
      <View style={styles.container}>
        {hasDataToUpload ? (
          <Text style={styles.dataCountText}>{`Cantidad de cuestionarios a subir: ${dataCount}`}</Text>
        ) : (
          <Text style={styles.noDataText}>Por el momento no hay datos para subir</Text>
        )}
        {hasDataToUpload && (
          <Button title="Subir Datos" onPress={handleDataUpload} />
        )}
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
      color: 'black',
      fontWeight: 'bold'
    },
    noDataText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold'
    },
  });
  