
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importar firebase
import { appFirebase } from '../auth/credentials';
import { getFirestore, collection, addDoc, getDoc, doc, deleteDoc, getDocs, setDoc } from 'firebase/firestore'
import { Alert } from 'react-native';
const db = getFirestore(appFirebase)

const generateID = () => {
    // Obtenemos la fecha actual para asegurar unicidad
    const fecha = new Date().getTime();
    // Generamos un número aleatorio entre 0 y 10000
    const numeroAleatorio = Math.random() * 10000;
    // Concatenamos la fecha y el número aleatorio para crear el ID único
    const idUnico = `id-${fecha}-${numeroAleatorio}`;
    return idUnico;
}
export const handleGetData = async () => {
    // Obtener todos los documentos de la colección
    try {
        const datos = await getDocs(collection(db, 'resultadosEncuesta'));
        const docs = []; //aqui se almacena toda la informacion de de los resultados de la encuesta
        datos.forEach((doc) => {
            const { dataType, results,year } = doc.data();
            docs.push(
                {   year,
                    dataType,
                    results
                });
        });
        return docs;
    } catch (err) {
        console.log('Ocurrio un error ', err)
    }
}

export const handleSaveCloudFirestore = async (selectedYear,setMeterNumber, meterNumber, questionnaireNumber, setStatus, questions, selectedOptions, setSelectedOptions, setUserResponses) => {

    try {
        // Guardando los datos en numero 
        const surveyID = generateID();
        const userData = {};
        questions.forEach(section => {
            section.questions.forEach(question => {
                const { questionID, questionType } = question;
                if (selectedOptions[questionID] !== undefined) {
                    // Verifica el tipo de pregunta y guarda el valor adecuado
                    if (questionType === 'numberInput') {
                        userData[questionID] = parseInt(selectedOptions[questionID]);
                    } else if (questionType === 'radioButton') {
                        userData[questionID] = selectedOptions[questionID] + 1;
                    }
                }
            });
        });
        const newUserData = {
            year: selectedYear,
            surveyID,
            dataType: 'numeric',
            results: userData,
            meterNumber,
            questionnaireNumber,
        };
        // Guardando los datos en string
        const userResponseText = {}
        questions.forEach(section => {
            section.questions.forEach(question => {
                const { questionID, questionType, options } = question;
                if (selectedOptions[questionID] !== undefined) {
                    let value2 = question.options[selectedOptions[questionID]];
                    if (questionType === 'numberInput') {
                        userResponseText[questionID] = parseInt(selectedOptions[questionID]);
                    } else if (questionType === 'radioButton') {
                        userResponseText[questionID] = value2;
                    }
                }
            });
        });
        const userDataText = {
            year: selectedYear,
            surveyID,
            dataType: 'written',
            questionnaireNumber,
            meterNumber,
            results: userResponseText

        };
        
        await addDoc(collection(db, 'resultadosEncuesta'), newUserData);
        await addDoc(collection(db, 'resultadosEncuesta'), userDataText);
        Alert.alert('Alerta', 'Datos guardados correctamente')
        setSelectedOptions({});
        setStatus(false);

    } catch (error) {
        Alert.alert("Error", 'Error al guardar los datos:', error);
    }
};

export const handleSaveLocalData = async (selectedYear,setMeterNumber, meterNumber, questionnaireNumber, setStatus, questions, selectedOptions, setSelectedOptions, setUserResponses) => {
    try {
        const surveyID = generateID();
        const userData = {};
        questions.forEach(section => {
            section.questions.forEach(question => {
                const { questionID, questionType } = question;
                if (selectedOptions[questionID] !== undefined) {
                    if (questionType === 'numberInput') {
                        userData[questionID] = parseInt(selectedOptions[questionID]);
                    } else if (questionType === 'radioButton') {
                        userData[questionID] = selectedOptions[questionID] + 1;
                    }
                }
            });
        });

        const newUserData = {
            year: selectedYear,
            surveyID,
            dataType: 'numeric',
            results: userData,
            meterNumber,
            questionnaireNumber,
        };

        const userResponseText = {}
        questions.forEach(section => {
            section.questions.forEach(question => {
                const { questionID, questionType, options } = question;
                if (selectedOptions[questionID] !== undefined) {
                    let value2 = question.options[selectedOptions[questionID]];
                    if (questionType === 'numberInput') {
                        userResponseText[questionID] = parseInt(selectedOptions[questionID]);
                    } else if (questionType === 'radioButton') {
                        userResponseText[questionID] = value2;
                    }
                }
            });
        });
        const userDataText = {
            year: selectedYear,
            surveyID,
            dataType: 'written',
            questionnaireNumber,
            meterNumber,
            results: userResponseText
        };

        let existingData = await AsyncStorage.getItem('localData');
        existingData = existingData ? JSON.parse(existingData) : [];
        
        // Remover datos previamente guardados con el mismo surveyID
        existingData = existingData.filter(item => item.surveyID !== surveyID);

        // Agregar los nuevos datos al array
        existingData.push(newUserData);
        existingData.push(userDataText);

        // Guardar los datos en AsyncStorage
        await AsyncStorage.setItem('localData', JSON.stringify(existingData));

        console.log("Datos localmente", await AsyncStorage.getItem('localData'))     
        await Alert.alert(
            'Sin conexión',
            'No hay conexión a internet. Datos guardados localmente',
          );
        setSelectedOptions({});
        setStatus(false);
    } catch (error) {
        Alert.alert('Error', 'Error al guardar los datos localmente: ' + error);
    }
};

