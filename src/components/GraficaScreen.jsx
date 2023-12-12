import {useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {handleGetData} from '../assets/questionnaireFunctions';
import {prueba as preguntas} from '../database/preguntasCuscoDB';

import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
export const GraficaScreen = () => {
  const [dataGraficas, setDataGraficas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    const dataCloudFirestore = await handleGetData();
    const dataSurvey = dataCloudFirestore.filter(
      data => data.dataType === 'written',
    );
    const datos = dataSurvey.map(data => data.results);
    procesarRespuestas(datos);
  };

  const procesarRespuestas = async respuestas => {
    if (respuestas && respuestas.length >= 1) {
      const preguntasAProcesar = preguntas[0].questions;
      const dataProcesada = [];

      for (const pregunta of preguntasAProcesar) {
        if (pregunta.questionType === 'numberInput') {
          const respuestasPregunta = {};
          const intervalos = [0, 10, 20, 30, 40];

          respuestas.forEach(respuesta => {
            const valorRespuesta = respuesta[pregunta.questionID];
            for (let i = 0; i < intervalos.length - 1; i++) {
              if (
                valorRespuesta >= intervalos[i] &&
                valorRespuesta < intervalos[i + 1]
              ) {
                const rangoIntervalo = `${intervalos[i]}-${intervalos[i + 1]}`;
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

      setDataGraficas(dataProcesada);
      setIsLoading(false);
    }
  };

  const generarDatosGrafica = indicePregunta => {
    const pregunta = dataGraficas[indicePregunta];
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
  const handleCaptureAndSavePDF = async () => {
    try {
      if (!ref.current) return;

      const cacheFilePath = await ref.current.capture(); //hacemos la captura
      const downloadFilePath = `${RNFS.DownloadDirectoryPath}/graficas.jpg`;

      // Verificar si el archivo existe en la carpeta de caché
      const cacheFileExists = await RNFS.exists(cacheFilePath);
      if (cacheFileExists) {
        if (await RNFS.exists(downloadFilePath)) {
          await RNFS.unlink(downloadFilePath); // Elimina el archivo existente
        } else {
          // Mover el archivo desde la carpeta de caché a la carpeta de descargas
          await RNFS.moveFile(cacheFilePath, downloadFilePath);

          Alert.alert(
            'Descarga exitosa',
            'El archivo se encuentra en la carpeta de descargas.',
          );
        }
      } else {
        Alert.alert('Error','El archivo no existe');
      }
    } catch (error) {
      console.error('Error al guardar como PDF:', error);
    }
  };

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <ViewShot
          ref={ref}
          options={{fileName: 'graficas', format: 'jpg', quality: 0.9}}>
          <View style={{flex: 1}}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#2979FF" />
            ) : (
              dataGraficas.map((pregunta, index) => (
                <View key={index} style={{height: 300}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    {pregunta.pregunta}
                  </Text>
                  <BarChart
                    data={generarDatosGrafica(index)}
                    width={Dimensions.get('window').width}
                    height={220}
                    yAxisLabel=""
                    chartConfig={{
                      backgroundGradientFrom: '#ffffff',
                      backgroundGradientTo: '#ffffff',
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(41, 121, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                    }}
                  />
                </View>
              ))
            )}
          </View>
        </ViewShot>
      </ScrollView>

      <Button title='Descargar graficas' onPress={handleCaptureAndSavePDF}/>
    </>
  );
};
