import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {RadioButton, TextInput as PaperTextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QuestionnaireScreen} from './QuestionnaireScreen';
export const DataUserScreen = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [userData, setUserData] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [userID, setUserID] = useState(''); //Una vez capturada la informacion, aqui guardaremos solo el ID del usuario generado
  const [status, setStatus] = useState(false); //Si el usuario ya relleno el formulario enteonces mostara el otro componente
  useEffect(() => {
    loadUserData();
    checkFormCompletion();
  }, [age, gender, maritalStatus]);
  // Funcion para capturar los datos
  const saveUserData = async () => {
    const newUser = {
      age,
      gender,
      maritalStatus,
      userID: generateUserID(),
    };
    setUserID(newUser.userID);
    const updatedData = [...userData, newUser];

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
      setUserData(updatedData);
      clearForm();
      setStatus(true);
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };
  // Funcion que permite validar primero que el usuario llene el formulario
  const checkFormCompletion = () => {
    if (age !== '' && gender !== '' && maritalStatus !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  // Funcion que busca los datos en el AsyncStorage para guardarlos en UserData
  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data !== null) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };
  // Funcion para borrar el formulario
  const clearForm = () => {
    setAge('');
    setGender('');
    setMaritalStatus('');
  };
  // Funcion para generar un ID unico
  const generateUserID = () => {
    return Date.now().toString();
  };
  // Funcion para guardar datos
  const handleFormSubmit = () => {
    saveUserData();
  };

  return (
    <ScrollView>
      <View >
        {!status ? (
          <View style={styles.container}>
            <Text style={styles.title}>Encuesta Cusco</Text>
            <PaperTextInput
              label="Ingrese su edad"
              value={age}
              onChangeText={text => setAge(text)}
              keyboardType="numeric"
              style={styles.input}
            />

            <Text style={styles.label}>Género:</Text>
            <View style={styles.radioButtonContainer}>
              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="Hombre"
                  status={gender === 'Hombre' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('Hombre')}
                  color="#6200EE"
                />
                <Text>Hombre</Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="Mujer"
                  status={gender === 'Mujer' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('Mujer')}
                  color="#6200EE"
                />
                <Text>Mujer</Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="Otro"
                  status={gender === 'Otro' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('Otro')}
                  color="#6200EE"
                />
                <Text>Otro</Text>
              </View>
            </View>

            <Text style={styles.label}>Estado Civil:</Text>
            <View style={styles.radioButtonContainer}>
              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="Soltero"
                  status={maritalStatus === 'Soltero' ? 'checked' : 'unchecked'}
                  onPress={() => setMaritalStatus('Soltero')}
                  color="#6200EE"
                />
                <Text>Soltero</Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="Casado"
                  status={maritalStatus === 'Casado' ? 'checked' : 'unchecked'}
                  onPress={() => setMaritalStatus('Casado')}
                  color="#6200EE"
                />
                <Text>Casado</Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="Divorciado"
                  status={
                    maritalStatus === 'Divorciado' ? 'checked' : 'unchecked'
                  }
                  onPress={() => setMaritalStatus('Divorciado')}
                  color="#6200EE"
                />
                <Text>Divorciado</Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="Viudo"
                  status={maritalStatus === 'Viudo' ? 'checked' : 'unchecked'}
                  onPress={() => setMaritalStatus('Viudo')}
                  color="#6200EE"
                />
                <Text>Viudo</Text>
              </View>

              <View style={styles.radioButton}>
                <RadioButton.Android
                  value="Unión libre"
                  status={
                    maritalStatus === 'Unión libre' ? 'checked' : 'unchecked'
                  }
                  onPress={() => setMaritalStatus('Unión libre')}
                  color="#6200EE"
                />
                <Text>Unión libre</Text>
              </View>
            </View>

            <Button
              title="Guardar"
              onPress={handleFormSubmit}
              disabled={isButtonDisabled}
            />
          </View>
        ) : (
          <QuestionnaireScreen userID={userID} />
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
  },
  input: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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
