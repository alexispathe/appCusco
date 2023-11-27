import React, {useState, useEffect, useRef} from 'react';
import {PermissionsAndroid} from 'react-native';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {RadioButton, TextInput as PaperTextInput} from 'react-native-paper';
import {prueba as questions} from '../database/preguntasCuscoDB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
export const QuestionnaireScreen = ({
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
  const pageSize = 10;

  useEffect(() => {
    const initialQuestions = questions.slice(startIndex, startIndex + pageSize);
    setVisibleQuestions(initialQuestions);
  }, [startIndex]);

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

  const handleSaveDataStorage = async () => {
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
        handleSaveDataXlSX(); // Llamar a la función para guardar los datos en excel
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };
  // Permisos para acceder a los archivos del celular
  const requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permiso de escritura en almacenamiento externo',
          message:
            'Se requiere acceso a la carpeta de descargas para guardar archivos.',
          buttonPositive: 'Aceptar',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(
          'Permiso de escritura en almacenamiento externo concedido.',
        );
        handleSaveDataStorage()
      } else {
        console.log('Permiso de escritura en almacenamiento externo denegado.');
      }
    } catch (error) {
      console.error(
        'Error al solicitar permiso de escritura en almacenamiento externo:',
        error,
      );
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

  const handleSaveDataXlSX = async () => {
    const filePath = `${RNFS.DownloadDirectoryPath}/cusco_v6.xlsx`;

    try {
      let workbook = null;
      let existingData = null;

      if (await RNFS.exists(filePath)) {
        existingData = await RNFS.readFile(filePath, 'base64');
        workbook = XLSX.read(existingData, {type: 'base64'});
      } else {
        workbook = XLSX.utils.book_new();

        const sheetName = 'Datos';
        const columns = [
          'ID',
          'Edad',
          'Sexo',
          'Edo_Civil',
          'Techo_Vivienda',
          'Paredes_Muros_Vivienda',
          'Pisos_Vivienda',
          'Combustible_Para_Cocinar',
          'Luz_Electrica',
          'Agua_Entubada',
          'Drenaje_Vivienda',
          'Basura_Vivienda',
          'Grado_Estudios',
          'Edo_Salud',
          'Problemas_Salud_Atencion',
          'Seguro_Social',
          'Atención_Medica',
          'Revision_Preventiva',
          'Solicitud_Atención_Salud',
          'Necesidad_Atención',
          'Cartilla_Actualizada',
          'Vacuna_Tetanos',
          'Vacuna_Influenza',
          'Vacuna_COVID',
          'Proteccion_Vehiculo',
          'Actividad_Fisica',
          'Ejemplos_Actividades_Físicas',
          'Peso_Aprox',
          'Medicion_Aprox',
          'Peso_Consideracion',
          'Limitacion_Actividades',
          'Esfuerzo',
          'Fatiga',
          'Medico_Azucar',
          'Medico_Diabetes',
          'Medico_Tension_Arterial',
          'Medico_Presion_Alta',
          'Dolor_Aprox',
          'Medico_Salud',
          'Análisis_Colesterol',
          'Colesterol_Alto',
          'Análisis_Trigliceridos',
          'Triglicéridos_Altos',
          'Daño_Accidente',
          'Anteojos_Leer',
          'Prótesis_Auditiva',
          'Dolor_Cuerpo',
          'Semana_Nervioso',
          'Concentrarse_Semana',
          'Triste_Deprimido',
          'Semana_Sueño',
          'Tiempo_Promedio_Sueño',
          'Disfrutar_Vida',
          'Pensamiento_Suicidio',
          'Daño_Salud_Agresiones',
          'Consumo_Promedio_Cajetillas',
          'Consumo_Tabaco',
          'Promedio_Consumo_Cigarro',
          'Consumo_Bebida_Alcoholica',
          'Frecuencia_Consumo_Alcohol',
          'Promedio_Consumo_Copas',
          'Horas_Trabajo_Diario',
          'Estado_Salud_Dificultad_Actividades',
          'Vida_Social',
          'Salir_Distraerse_Invitación',
          'Recibir_Amor_Efecto',
          'Hablar_Problemas',
          'Personas_Preocupación',
          'Consejos_Útiles',
          'Ayuda_Enfermedad',
        ];
        const data = [columns]; // Primera fila con los nombres de las columnas

        // Convertir los nombres de columnas en una hoja de datos
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      }

      const sheetName = 'Datos';
      let worksheet = workbook.Sheets[sheetName];

      const lastRow = XLSX.utils.sheet_add_json(
        worksheet,
        [{questionnaireNumber}],
        {header: ['ID']},
      );
      const userData = [questionnaireNumber]; // Incluir questionnaireNumber como primera columna

      questions.forEach(section => {
        section.questions.forEach(question => {
          const {questionID, questionType} = question;
          if (selectedOptions[questionID] !== undefined) {
            let value = selectedOptions[questionID];

            // Verificar el tipo de pregunta y aplicar lógica correspondiente
            if (questionType === 'numberInput') {
              // Mantener el mismo valor para number input
              value = parseInt(value);
            } else if (questionType === 'radioButton') {
              // Incrementar en 1 para radio button
              value = parseInt(value) + 1;
            }

            userData.push(value);
          }
        });
      });
      // Encontrar la fila vacía para guardar las respuestas del usuario
      let row = 2;

      while (worksheet[XLSX.utils.encode_cell({r: row, c: 0})]) {
        row++;
      }

      // Guardar las respuestas en la fila encontrada
      userData.forEach((value, index) => {
        const cellRef = XLSX.utils.encode_cell({r: row, c: index});
        worksheet[cellRef] = {t: 'n', v: value};
      });

      // Escribir el libro de trabajo actualizado en el archivo Excel
      const newExcelData = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'base64',
      });
      await RNFS.writeFile(filePath, newExcelData, 'base64');
      // Limpiamos el formulario
      alert('Datos guardados correctamente.');
      setSelectedOptions({});
      setStatus(false);
    } catch (error) {
      console.error('Error al guardar datos en Excel:', error);
    }
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
        onPress={requestExternalStoragePermission}
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