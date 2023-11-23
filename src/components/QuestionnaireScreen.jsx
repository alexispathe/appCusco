import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { preguntas as questions } from '../database/preguntasCuscoDB';

export const QuestionnaireScreen = ({ userID }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [userResponses, setUserResponses] = useState(null);

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
    const allQuestionsAnswered = questions.every((section) =>
      section.questions.every((question) => selectedOptions[question.questionID] !== undefined)
    );
    setIsButtonDisabled(!allQuestionsAnswered);
  };

  const handleSaveData = () => {
    const userData = {};
    questions.forEach((section) => {
      section.questions.forEach((question) => {
        const { questionID } = question;
        if (selectedOptions[questionID] !== undefined) {
          userData[questionID] = selectedOptions[questionID]+1;
        }
      });
    });
    const userResult = {
      results: userData,
      userID: userID,
    };
    setUserResponses(userResult);
    setSelectedOptions({});
  };

  console.log('User Responses:', userResponses);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {questions.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.questions.map((question, questionIndex) => (
            <View key={question.questionID} style={styles.questionContainer}>
              <Text style={styles.questionTitle}>{question.title}</Text>
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
                      onPress={() => handleOptionSelect(question.questionID, optionIndex)}
                      color="#6200EE"
                    />
                    <Text style={styles.optionText}>{option}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          ))}
        </View>
      ))}
      <Button title="Guardar" onPress={handleSaveData} disabled={isButtonDisabled} />
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
  questionContainer: {
  },
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

