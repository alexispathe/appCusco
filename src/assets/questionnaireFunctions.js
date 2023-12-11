
import AsyncStorage from '@react-native-async-storage/async-storage';
import { columns } from '../database/preguntasCuscoDB';
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
        console.error('Error al guardar los datos:', error);
    }
};
export const handleSaveDataStorage = async (setMeterNumber, meterNumber, questionnaireNumber, setStatus, questions, selectedOptions, setSelectedOptions, setUserResponses) => {
    const userData = {};
    questions.forEach(section => {
        section.questions.forEach(question => {
            const { questionID, questionType } = question;
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
            await handleSaveDataXlSX(setMeterNumber, questionnaireNumber, questions, selectedOptions, setSelectedOptions, setStatus)
        } else {
            await AsyncStorage.setItem('userResult', JSON.stringify([newUserData]));
            setUserResponses(newUserData);
        }
    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
};


