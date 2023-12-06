import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { columns } from '../database/preguntasCuscoDB';
export const handleSaveDataStorage = async (meterNumber,questionnaireNumber,setStatus,questions, selectedOptions, setSelectedOptions, setUserResponses) => {
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
        await handleSaveDataXlSX(questionnaireNumber,questions, selectedOptions, setSelectedOptions,setStatus)
      } else {
        await AsyncStorage.setItem('userResult', JSON.stringify([newUserData]));
        setUserResponses(newUserData);
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };
  
 
  const handleSaveDataXlSX = async (questionnaireNumber, questions, selectedOptions, setSelectedOptions,setStatus) => {
    try {
      const filePath = `${RNFS.DownloadDirectoryPath}/cusco.xlsx`;
      let workbook = null;
      let existingData = null;
  
      if (await RNFS.exists(filePath)) {
        existingData = await RNFS.readFile(filePath, 'base64');
        workbook = XLSX.read(existingData, { type: 'base64' });
      } else {
        workbook = XLSX.utils.book_new();
      }
  
      let sheetName = 'Datos';
      let worksheet = workbook.Sheets[sheetName];
  
      if (!worksheet) {
        worksheet = XLSX.utils.aoa_to_sheet([columns]);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      }
      const userData = [questionnaireNumber];
  
      questions.forEach(section => {
        section.questions.forEach(question => {
          const { questionID, questionType } = question;
          if (selectedOptions[questionID] !== undefined) {
            let value = selectedOptions[questionID];
  
            if (questionType === 'numberInput') {
              value = parseInt(value);
            } else if (questionType === 'radioButton') {
              value = parseInt(value) + 1;
            }
  
            userData.push(value);
          }
        });
      });
      console.log(userData)

      const lastRow = XLSX.utils.sheet_add_json(worksheet, [userData], {
        header: ['ID'],
        skipHeader: true,
        origin: -1,
      });
  
      
      XLSX.utils.sheet_add_json(worksheet, [userData], {
        skipHeader: true,
        origin: lastRow + 1,
      });
  
      const newExcelData = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'base64',
      });
  
      await RNFS.writeFile(filePath, newExcelData, 'base64');
  
      handleSaveDataXlSXString(questionnaireNumber, questions, selectedOptions, setSelectedOptions, setStatus);
    } catch (error) {
      console.error('Error al guardar datos en Excel:', error);
    }
  };
  const handleSaveDataXlSXString = async (questionnaireNumber, questions, selectedOptions,setSelectedOptions,setStatus) => {
    try {
      const filePath = `${RNFS.DownloadDirectoryPath}/cusco_v2.xlsx`;
      let workbook = null;
      let existingData = null;
  
      if (await RNFS.exists(filePath)) {
        existingData = await RNFS.readFile(filePath, 'base64');
        workbook = XLSX.read(existingData, { type: 'base64' });
      } else {
        workbook = XLSX.utils.book_new();
      }
  
      let sheetName = 'Datos';
      let worksheet = workbook.Sheets[sheetName];
  
      if (!worksheet) {
        worksheet = XLSX.utils.aoa_to_sheet([columns]);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      }
      const userData = [questionnaireNumber];
  
      questions.forEach(section => {
        section.questions.forEach(question => {
          const { questionID, questionType,options } = question;
          if (selectedOptions[questionID] !== undefined) {
            let value;
            let value2 = question.options[selectedOptions[questionID]];

            if (questionType === 'numberInput') {

              value = selectedOptions[questionID];
              value = parseInt(value);
            } else if (questionType === 'radioButton') {
              value = value2;
            }
  
            userData.push(value);
          }
        });
      });
      console.log(userData)

      const lastRow = XLSX.utils.sheet_add_json(worksheet, [userData], {
        header: ['ID'],
        skipHeader: true,
        origin: -1,
      });
  
      
      XLSX.utils.sheet_add_json(worksheet, [userData], {
        skipHeader: true,
        origin: lastRow + 1,
      });
  
      const newExcelData = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'base64',
      });
  
      await RNFS.writeFile(filePath, newExcelData, 'base64');
  
      alert('Datos guardados correctamente.');
      setSelectedOptions({});
      setStatus(false);
    } catch (error) {
      console.error('Error al guardar datos en Excel:', error);
    }
  };


 // Funcion para guardar los datos en la carpeta de descargas
 const handleDownloadExcel = async () => {
    const sourcePath = `${RNFS.DocumentDirectoryPath}/cusco_v2.xlsx`;
    const destinationPath = `${RNFS.DownloadDirectoryPath}/cusco_v2_descarga.xlsx`;

    try {
      const exists = await RNFS.exists(sourcePath);
      if (!exists) {
        console.log('El archivo Excel no existe en la ubicación especificada.');
        return;
      }

      await RNFS.copyFile(sourcePath, destinationPath);
      alert('Archivo  descargado correctamente');
    } catch (error) {
      console.error('Error al descargar el archivo Excel:', error);
    }
  };
