import {useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Alert,
  Button,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {handleGetData} from '../assets/questionnaireFunctions';
import {preguntasCusco as preguntas} from '../database/preguntasCuscoDB';
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
      const dataProcesada = [];
      for (let i = 0; i < preguntas.length; i++) {
        const preguntasAProcesar = preguntas[i].questions;
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
  const handleCapture = async () => {
    try {
      if (!ref.current) return false;
      const cacheFilePath = await ref.current.capture(); //hacemos la captura
      const destinationPath = `${RNFS.ExternalDirectoryPath}/archivos/grafica.jpg`;
      await RNFS.mkdir(`${RNFS.ExternalDirectoryPath}/archivos`);
      if (await RNFS.exists(destinationPath)) {
        await RNFS.unlink(destinationPath);
      } else {
        await RNFS.copyFile(cacheFilePath, destinationPath);
        Alert.alert('Alerta', 'Imagen guardada correctamente');
      }
    } catch (error) {
      console.error('Error al guardar', error);
    }
  };

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <ViewShot
          ref={ref}
          options={{fileName: 'graficas', format: 'jpg', quality: 0.9}}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#2979FF" />
            ) : (
              dataGraficas.map((pregunta, index) => (
                <View key={index} style={{height: 260}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'black',
                      fontWeight: 'bold',
                      padding: 10,
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

      <Button title="Descargar graficas" onPress={handleCapture} />
    </>
  );
};
