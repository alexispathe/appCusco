
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { QuestionnaireScreen } from './QuestionnaireScreen';
import {RadioButton, TextInput as PaperTextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const DataUserScreen = () => {
  const [meterNumber, setMeterNumber] = useState('');
  const [questionnaireNumber, setquestionnaireNumber] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [status, setStatus] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false); // Nuevo estado para el indicador de carga

  useEffect(() => {
    checkFormCompletion();
    loadUserData();
  }, [meterNumber]);

  const checkFormCompletion = () => {
    setIsButtonDisabled(meterNumber === '');
  };

  const loadUserData = async() => {
    try {
      try {
        const data = await AsyncStorage.getItem('userResult');
        if (data !== null) {
          // data = JSON.parse(data);
        // console.log(JSON.parse(data))
  
          setquestionnaireNumber(JSON.parse(data).length +1)
        }
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
      // Código para cargar los datos del usuario
      setLoadingQuestions(true); // Indicar que se está cargando la información de las preguntas
      // Simulación de carga de datos (puedes ajustar esta parte según cómo obtengas las preguntas)
      setTimeout(() => {
        // Supongamos que aquí se obtienen las preguntas
        setLoadingQuestions(false); // Cuando se obtienen las preguntas, se desactiva el indicador de carga
      }, 2000); // Simular una carga de 2 segundos
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const handleFormSubmit = () => {
    setStatus(true);
  };
  return (
    <ScrollView>
      <View>
        {!status ? (
          <View style={styles.container}>
            <Text style={styles.title}>Encuesta Cusco</Text>
            <Text style={styles.label}>
              Número Cuestionario: {questionnaireNumber}
            </Text>
            <PaperTextInput
              label="Ingrese el número de medidor"
              value={meterNumber}
              onChangeText={text => setMeterNumber(text)}
              keyboardType="numeric"
              style={styles.input}
            />

            <Button
              title="Continuar"
              onPress={handleFormSubmit}
              disabled={isButtonDisabled}
            />
          </View>
        ) : (
          <QuestionnaireScreen
            meterNumber={meterNumber}
            questionnaireNumber={questionnaireNumber}
            setMeterNumber={setMeterNumber}
            setStatus={setStatus}
            loadingStatus={loadingQuestions} 
            
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black'
  },
  input: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  radioButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
