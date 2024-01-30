// En este componente se renderizan las graficas
import { useEffect, useState, useRef } from 'react';
import { ScrollView, View, ActivityIndicator, Alert, Button } from 'react-native';
import { handleGetData } from '../assets/questionnaireFunctions';
import { preguntasCusco as preguntas } from '../database/preguntasCuscoDB';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { GraficaComponent } from './GraficaComponent';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import FileViewer from 'react-native-file-viewer';

export const GraficaScreen = () => {
  const [dataGraficas, setDataGraficas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingGraph, setDownloadingGraph] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const navigation = useNavigation();
  
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      await Alert.alert('Sin conexión', 'Revise la conexión a internet');
      navigation.navigate('Home');
    } else {
      setIsLoading(true);
      const dataCloudFirestore = await handleGetData();
      const dataSurvey = dataCloudFirestore.filter(
        data => data.dataType === 'written',
      );
      const datos = dataSurvey.map(data => data.results);
      procesarRespuestas(datos);
    }
  };

  const procesarRespuestas = async respuestas => {
    const chunkedData = [];
    if (respuestas && respuestas.length >= 1) {
      const dataProcesada = [];
      for (let i = 0; i < preguntas.length; i++) {
        const preguntasAProcesar = preguntas[i].questions;
        for (const pregunta of preguntasAProcesar) {
          if (pregunta.questionType === 'numberInput') {
            const respuestasPregunta = {};
            const intervalos = [
              0, 10, 20, 30, 40, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150,
              160, 170, 180, 190, 200, 210, 220,
            ];

            respuestas.forEach(respuesta => {
              const valorRespuesta = respuesta[pregunta.questionID];
              for (let i = 0; i < intervalos.length - 1; i++) {
                if (
                  valorRespuesta >= intervalos[i] &&
                  valorRespuesta < intervalos[i + 1]
                ) {
                  const rangoIntervalo = `${intervalos[i]}-${
                    intervalos[i + 1]
                  }`;
                  if (!respuestasPregunta.hasOwnProperty(rangoIntervalo)) {
                    respuestasPregunta[rangoIntervalo] = 0;
                  }
                  respuestasPregunta[rangoIntervalo]++;
                  break;
                }
              }
            });

            dataProcesada.push({
              pregunta: pregunta.title,
              respuestas: respuestasPregunta,
            });
          } else if (pregunta.questionType === 'radioButton') {
            const respuestasPregunta = {};

            pregunta.options.forEach(opcion => {
              respuestasPregunta[opcion] = 0;
            });

            respuestas.forEach(respuesta => {
              const respuestaPregunta = respuesta[pregunta.questionID];
              if (respuestasPregunta.hasOwnProperty(respuestaPregunta)) {
                respuestasPregunta[respuestaPregunta]++;
              }
            });

            dataProcesada.push({
              pregunta: pregunta.title,
              respuestas: respuestasPregunta,
            });
          }
        }
      }

      for (let i = 0; i < dataProcesada.length; i += 10  ) {
        chunkedData.push(dataProcesada.slice(i, i + 10  ));
      }

      setDataGraficas(chunkedData);
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const generarDatosGrafica = indicePregunta => {
    const pregunta = dataGraficas[currentIndex][indicePregunta];
    const respuestas = pregunta.respuestas;
    const labels = Object.keys(respuestas).map(respuesta => respuesta);
    const valores = Object.values(respuestas);

    return {
      labels: labels,
      datasets: [
        {
          data: valores,
          color: (opacity = 1) => `rgba(41, 121, 255, ${opacity})`,
          barPercentage: 0.8,
        },
      ],
    };
  };

  const handleCapture = async () => {
    try {
      if (!ref.current) return false;
      setDownloadingGraph(true);
      const cacheFilePath = await ref.current.capture();
      const destinationPath = `${RNFS.ExternalDirectoryPath}/archivos/grafica.jpg`;
      await RNFS.mkdir(`${RNFS.ExternalDirectoryPath}/archivos`);
      if (await RNFS.exists(destinationPath)) {
        await RNFS.unlink(destinationPath);
      } else {
        await RNFS.copyFile(cacheFilePath, destinationPath);
        Alert.alert('Alerta', 'Imagen guardada correctamente');
        setDownloadingGraph(false);
        openFile();
      }
    } catch (error) {
      console.error('Error al guardar', error);
    }
  };
  const handlePrevious = () => {
    setCurrentIndex(prevIndex => prevIndex - 1);
  };

  const openFile = async () => {
    const filePath = `${RNFS.ExternalDirectoryPath}/archivos/grafica.jpg`;

    try {
      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        FileViewer.open(filePath, { showOpenWithDialog: true })
          .then(() => {
            // El archivo se ha abierto correctamente
          })
          .catch(error => {
            console.log(error.toString());
            Alert.alert('Error al abrir el archivo', error.toString());
          });
      } else {
        Alert.alert(
          'Archivo no encontrado',
          'El archivo no existe en la ruta especificada.',
        );
      }
    } catch (error) {
      Alert.alert('Error al abrir el archivo', error.message);
    }
  };
  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <ViewShot
          ref={ref}
          options={{ fileName: 'graficas', format: 'jpg', quality: 0.9 }}
        >
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#2979FF" />
            ) : (
              dataGraficas[currentIndex] &&
              dataGraficas[currentIndex].map((pregunta, index) => (
                <GraficaComponent
                  key={index}
                  pregunta={pregunta}
                  generarDatosGrafica={() => generarDatosGrafica(index)}
                />
              ))
            )}
          </View>
        </ViewShot>
        
      </ScrollView>
      {isLoading ? (
        ''
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white' }}>
          <Button
            title="Anterior"
            onPress={handlePrevious}
            disabled={currentIndex === 0}
          />
          <Button
            title="Siguiente"
            onPress={handleNext}
            disabled={currentIndex === dataGraficas.length - 1}
          />
        </View>
      )}
    </>
  );
  };
