import { StyleSheet } from "react-native";

  
 export  const QuestionnaireStyles = StyleSheet.create({
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

export const DataUserStyles = StyleSheet.create({
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