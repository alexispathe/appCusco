import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Button, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {RadioButton, TextInput as PaperTextInput} from 'react-native-paper';
import {preguntasCusco as questions} from '../database/preguntasCuscoDB';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const QuestionnaireScreen = ({
  meterNumber,
  questionnaireNumber,
  setStatus,
}) => {
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
  }, []);

  useEffect(() => {
    checkAllOptionsSelected();
  }, [selectedOptions]);

  
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

  const handleSaveData = async () => {
    const userData = {};
    questions.forEach(section => {
      section.questions.forEach(question => {
        const {questionID, questionType} = question;
        if (selectedOptions[questionID] !== undefined) {
          // Verifica el tipo de pregunta y guarda el valor adecuado
          if (questionType === 'numberInput') {
            userData[questionID] = parseInt(selectedOptions[questionID]) + 1;
          } else if (questionType === 'radioButton') {
            userData[questionID] = selectedOptions[questionID] + 1;
          }
        }
      });
    });

    const newUserData = {
      results: userData,
      meterNumber,
      questionnaireNumber,
    };

    try {
      const existingData = await AsyncStorage.getItem('userResult');
      if (existingData !== null) {
        const parsedExistingData = JSON.parse(existingData);
        const updatedData = [...parsedExistingData, newUserData];
        await AsyncStorage.setItem('userResult', JSON.stringify(updatedData));
        setUserResponses(newUserData);
        setSelectedOptions({});
        setStatus(false);
      } else {
        await AsyncStorage.setItem('userResult', JSON.stringify([newUserData]));
        setUserResponses(newUserData);
        setSelectedOptions({});
        setStatus(false);
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };
  
  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      setLoading(true);
      setStartIndex((prevStartIndex) => prevStartIndex + pageSize);
      setLoading(false);
    }
  };
  return (
    <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContainer}
        onScroll={({ nativeEvent }) => handleScroll({ nativeEvent })}
        scrollEventThrottle={400}
    >
      {visibleQuestions.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.questions.map((question, questionIndex) => (
            <View key={question.questionID} style={styles.questionContainer}>
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
                    <View key={optionIndex} style={styles.radioButtonContainer}>
                      <RadioButton.Android
                        value={optionIndex}
                        status={
                          selectedOptions[question.questionID] === optionIndex
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() =>
                          handleOptionSelect(question.questionID, optionIndex)
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
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <Button
        title="Guardar"
        onPress={handleSaveData}
        disabled={isButtonDisabled}
      />
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
