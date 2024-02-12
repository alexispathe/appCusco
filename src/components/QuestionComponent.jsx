// Componente que sirve para renderizar cada una de las preguntas que se encuentran en la base de datos
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RadioButton, TextInput as PaperTextInput } from 'react-native-paper';

export const QuestionComponent = ({
  section,
  selectedOptions,
  handleOptionSelect,
  styles,
}) => {
  return (
    <View>
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
  );
};
