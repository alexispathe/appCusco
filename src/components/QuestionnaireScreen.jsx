import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {RadioButton, TextInput as PaperTextInput} from 'react-native-paper';
import { requestExternalStoragePermission } from '../assets/permissions';
import {prueba as questions} from '../database/preguntasCuscoDB';
import { handleSaveDataStorage } from '../assets/questionnaireFunctions';
export const QuestionnaireScreen = ({ meterNumber,questionnaireNumber,setStatus,loadingStatus,}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [userResponses, setUserResponses] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const [visibleQuestions, setVisibleQuestions] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const initialQuestions = questions.slice(startIndex, startIndex + pageSize);
    setVisibleQuestions(initialQuestions);
  }, [startIndex]);

  useEffect(() => {
    checkAllOptionsSelected();
  }, [selectedOptions]);

  const permissions= async()=>{
    const permissionsStatus = await requestExternalStoragePermission()
    if(permissionsStatus) handleSaveDataStorage(meterNumber,questionnaireNumber,setStatus,questions, selectedOptions, setSelectedOptions, setUserResponses)
  }
  const handleOptionSelect = (questionID, index) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionID]: index,
    });
  };

  const checkAllOptionsSelected = () => {
    const allQuestionsAnswered = questions.every(section =>
      section.questions.every(
        question => selectedOptions[question.questionID] !== undefined,
      ),
    );
    setIsButtonDisabled(!allQuestionsAnswered);
  };
  

  

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
  
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom &&
      !loading // Agregar una verificación para evitar la carga mientras ya está cargando
    ) {
      setLoading(true);
      alert("Scrroll")
      // Calcula la nueva página de preguntas a cargar
      const newStartIndex = startIndex + pageSize;
      const additionalQuestions = questions.slice(newStartIndex, newStartIndex + pageSize);
  
      // Simula un retraso para mostrar la lógica de carga
      setTimeout(() => {
        setVisibleQuestions(prevQuestions => prevQuestions.concat(additionalQuestions));
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
            <View key={sectionIndex} style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.questions.map((question, questionIndex) => (
                <View
                  key={question.questionID}
                  style={styles.questionContainer}>
                  <Text style={styles.questionTitle}>{question.title}</Text>
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
const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  sectionContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    // marginBottom: 20,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200EE',
  },
  questionContainer: {},
  questionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  optionsContainer: {
    // marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  optionText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});