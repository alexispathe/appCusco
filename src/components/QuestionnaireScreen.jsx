import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {QuestionnaireStyles as styles, PickerStyles} from '../styles/styles';
import {RadioButton, TextInput as PaperTextInput} from 'react-native-paper';
import {requestExternalStoragePermission} from '../assets/permissions';
import {preguntasCusco as questions} from '../database/preguntasCuscoDB';
import {
  handleSaveDataStorage,
  handleSaveCloudFirestore,
} from '../assets/questionnaireFunctions';
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
  const scrollViewRef = useRef(null);
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
  };
  const handleOptionSelect = (questionID, index) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionID]: index,
    });
    console.log(selectedOptions);
  };
  // Función para obtener las respuestas ordenadas
  const getOrderedResponses = () => {
    const orderedResponses = {};

    // Obtiene las claves (questionID) del objeto selectedOptions
    const keys = Object.keys(selectedOptions);

    // Ordena las claves (questionID) según el número de pregunta (id)
    keys.sort((a, b) => {
      const idA = parseInt(a); // Convierte la clave a número entero
      const idB = parseInt(b); // Convierte la clave a número entero
      return idA - idB;
    });

    // Construye un nuevo objeto ordenado según el número de pregunta
    keys.forEach(key => {
      orderedResponses[key] = selectedOptions[key];
    });

    return orderedResponses;
  };


  const checkAllOptionsSelected = () => {
    const allQuestionsAnswered = questions.every(section =>
      section.questions.every(
        question => selectedOptions[question.questionID] !== undefined,
      ),
    );
    setIsButtonDisabled(!allQuestionsAnswered);
  };

  const handleScroll = ({nativeEvent}) => {
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
    const paddingToBottom = 20;

    if (
      layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom &&
      !loading // Agregar una verificación para evitar la carga mientras ya está cargando
    ) {
      setLoading(true);
      alert('Scrroll');
      // Calcula la nueva página de preguntas a cargar
      const newStartIndex = startIndex + pageSize;
      const additionalQuestions = questions.slice(
        newStartIndex,
        newStartIndex + pageSize,
      );

      // Simula un retraso para mostrar la lógica de carga
      setTimeout(() => {
        setVisibleQuestions(prevQuestions =>
          prevQuestions.concat(additionalQuestions),
        );
        setStartIndex(newStartIndex);
        setLoading(false);
      }, 1000); // Simula una carga, podrías ajustar este tiempo según tus necesidades
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollViewContainer}
      onScroll={({nativeEvent}) => handleScroll({nativeEvent})}
      scrollEventThrottle={400}>
      {loadingStatus ? (
        <View style={styles.loadingContainer}>
          <Text>Cargando preguntas....</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          {visibleQuestions.map((section, sectionIndex) => (
            <View key={sectionIndex} style={PickerStyles.sectionContainer}>
              {/* Contenedor del picker */}
              <View style={PickerStyles.container}>
                <View style={PickerStyles.pickerContainer}>
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
                    {/* Agregar más años si es necesario */}
                  </Picker>
                </View>
              </View>
              {/* Fin del contenedor Picker */}
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.questions.map((question, questionIndex) => (
                <View
                  key={question.questionID}
                  style={styles.questionContainer}>
                  <Text style={styles.questionTitle}>
                    {question.id} {question.title}
                  </Text>
                  {question.questionType === 'numberInput' ? (
                    <PaperTextInput
                      label={question.title}
                      value={selectedOptions[question.questionID]}
                      onChangeText={text =>
                        handleOptionSelect(question.questionID, text)
                      }
                      keyboardType="numeric"
                      style={styles.input}
                    />
                  ) : (
                    <ScrollView contentContainerStyle={styles.optionsContainer}>
                      {question.options.map((option, optionIndex) => (
                        <View
                          key={optionIndex}
                          style={styles.radioButtonContainer}>
                          <RadioButton.Android
                            value={optionIndex}
                            status={
                              selectedOptions[question.questionID] ===
                              optionIndex
                                ? 'checked'
                                : 'unchecked'
                            }
                            onPress={() =>
                              handleOptionSelect(
                                question.questionID,
                                optionIndex,
                              )
                            }
                            color="#6200EE"
                          />
                          <Text style={styles.optionText}>{option}</Text>
                        </View>
                      ))}
                    </ScrollView>
                  )}
                </View>
              ))}
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
      {/* <Button title="Descargar Excel" onPress={requestExternalStoragePermission} /> */}
    </ScrollView>
  );
};
