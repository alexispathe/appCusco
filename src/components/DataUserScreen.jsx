
import React, { useState, useEffect } from 'react';
import { View, Text, Button,  ScrollView, } from 'react-native';
import { DataUserStyles as styles } from '../styles/styles';
import { QuestionnaireScreen } from './QuestionnaireScreen';
import { TextInput as PaperTextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleSaveDataXlSXNumeric } from '../assets/questionnaireFunctions';
import { FileDownloaderScreen } from './FileDownloaderScreen';
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
            <FileDownloaderScreen/>
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

