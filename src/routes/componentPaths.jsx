import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { preguntas as questions  } from '../database/preguntasCuscoDB';
export const QuestionnaireScreen = () => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelect = (questionID, index) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionID]: index,
    });
  };

  const handleSaveData = () => {
    // Mostrar datos seleccionados por consola
    console.log('Selected Options:', selectedOptions);
  };

  return (
    <View style={styles.container}>
      {questions.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.questions.map((question, questionIndex) => (
            <View key={question.questionID} style={styles.questionContainer}>
              <Text style={styles.questionTitle}>{question.title}</Text>
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
                  <Text>{option}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
      <Button title="Guardar" onPress={handleSaveData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionContainer: {
    marginBottom: 10,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});
