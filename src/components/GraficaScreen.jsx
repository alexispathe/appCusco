import { useEffect, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator,Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { handleGetData } from '../assets/questionnaireFunctions';
import { prueba as preguntas } from '../database/preguntasCuscoDB';

export const GraficaScreen = () => {
  const [dataGraficas, setDataGraficas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    const dataCloudFirestore = await handleGetData();
    const dataSurvey = dataCloudFirestore.filter(
      (data) => data.dataType === 'written'
    );
    const datos = dataSurvey.map((data) => data.results);
    procesarRespuestas(datos);
  };

  const procesarRespuestas = async (respuestas) => {
    if (respuestas && respuestas.length >= 1) {
      const preguntasAProcesar = preguntas[0].questions;
      const dataProcesada = [];

      for (const pregunta of preguntasAProcesar) {
        if (pregunta.questionType === 'numberInput') {
          const respuestasPregunta = {};
          const intervalos = [0, 10, 20, 30, 40];

          respuestas.forEach((respuesta) => {
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

          pregunta.options.forEach((opcion) => {
            respuestasPregunta[opcion] = 0;
          });

          respuestas.forEach((respuesta) => {
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

  const generarDatosGrafica = (indicePregunta) => {
    const pregunta = dataGraficas[indicePregunta];
    const respuestas = pregunta.respuestas;
    const labels = Object.keys(respuestas).map((respuesta) => respuesta);
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

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#2979FF" />
        ) : (
          dataGraficas.map((pregunta, index) => (
            <View key={index} style={{ height: 300 }}>
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
    </ScrollView>
  );
};
