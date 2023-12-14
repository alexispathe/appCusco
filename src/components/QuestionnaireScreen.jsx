import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {QuestionnaireStyles as styles, PickerStyles} from '../styles/styles';
import {requestExternalStoragePermission} from '../assets/permissions';
import {prueba as questions} from '../database/preguntasCuscoDB';
import {QuestionComponent} from './QuestionComponent';
import {
  handleSaveCloudFirestore,
  handleSaveLocalData,
} from '../assets/questionnaireFunctions';
import NetInfo from '@react-native-community/netinfo'; //Verificar si hay internet
import {Picker} from '@react-native-picker/picker';
export const QuestionnaireScreen = ({
  setMeterNumber,
  meterNumber,
  questionnaireNumber,
  setStatus,
  loadingStatus,
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [userResponses, setUserResponses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleQuestions, setVisibleQuestions] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState('2023'); // Año seleccionado por defecto
  const pageSize = 10;

  useEffect(() => {
    const initialQuestions = questions.slice(startIndex, startIndex + pageSize);
    setVisibleQuestions(initialQuestions);
  }, [startIndex]);

  useEffect(() => {
    checkAllOptionsSelected();
  }, [selectedOptions]);

  const permissions = async () => {
    const netInfoState = await NetInfo.fetch();
    if (!netInfoState.isConnected) {
      // Si no hay conexión, muestra una alerta al usuario
      
      handleSaveLocalData(
        selectedYear,
        setMeterNumber,
        meterNumber,
        questionnaireNumber,
        setStatus,
        questions,
        selectedOptions,
        setSelectedOptions,
        setUserResponses,
      );
    } else {
      handleSaveCloudFirestore(
        selectedYear,
        setMeterNumber,
        meterNumber,
        questionnaireNumber,
        setStatus,
        questions,
        selectedOptions,
        setSelectedOptions,
        setUserResponses,
      );
      setIsButtonDisabled(true);
    }
  };
  const handleOptionSelect = (questionID, index) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionID]: index,
    });
    console.log(selectedOptions);
  };

  const checkAllOptionsSelected = () => {
    const allQuestionsAnswered = questions.every(section =>
      section.questions.every(
        question => selectedOptions[question.questionID] !== undefined,
      ),
    );
    setIsButtonDisabled(!allQuestionsAnswered);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {loadingStatus ? (
        <View style={styles.loadingContainer}>
          <Text>Cargando preguntas....</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <View style={PickerStyles.container}>
            <Text style={PickerStyles.label}>
              Selecciona el año de la encuesta:
            </Text>
            <Picker
              selectedValue={selectedYear}
              style={PickerStyles.picker}
              onValueChange={itemValue => setSelectedYear(itemValue)}>
              <Picker.Item label="2023" value="2023" />
              <Picker.Item label="2024" value="2024" />
              <Picker.Item label="2025" value="2025" />
              <Picker.Item label="2026" value="2026" />
              <Picker.Item label="2027" value="2027" />
              <Picker.Item label="2028" value="2028" />
            </Picker>
          </View>
          {visibleQuestions.map((section, sectionIndex) => (
            <View key={sectionIndex} style={PickerStyles.sectionContainer}>
              <QuestionComponent
                section={section}
                selectedOptions={selectedOptions}
                handleOptionSelect={handleOptionSelect}
                styles={styles}
              />
            </View>
          ))}
        </>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <Button
        title="Guardar cuestionario"
        onPress={permissions}
        disabled={isButtonDisabled}
      />
    </ScrollView>
  );
};
