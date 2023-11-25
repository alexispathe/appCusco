import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {RadioButton, TextInput as PaperTextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QuestionnaireScreen} from './QuestionnaireScreen';
export const DataUserScreen = () => {
  const [meterNumber, setMeterNumber] = useState('');
  const [questionnaireNumber, setquestionnaireNumber] = useState(1);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [status, setStatus] = useState(false); //Si el usuario ya relleno el formulario enteonces mostara el otro componente
  useEffect(() => {
    checkFormCompletion();
    loadUserData();
  }, [meterNumber]);

  // Funcion que permite validar primero que el usuario llene el formulario
  const checkFormCompletion = async () => {
    if (meterNumber !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  // Funcion que busca los datos en el AsyncStorage para guardarlos en UserData
  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userResult');
      if (data !== null) {
        // data = JSON.parse(data);
      console.log(JSON.parse(data))

        setquestionnaireNumber(JSON.parse(data).length +1)
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };
  // Funcion para guardar datos
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
            setStatus={setStatus}
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
