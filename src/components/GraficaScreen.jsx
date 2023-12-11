import {handleGetData} from '../assets/questionnaireFunctions';
import {useEffect, useState} from 'react';
import {ScrollView, View, Dimensions, Text, processColor} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import {prueba as preguntas} from '../database/preguntasCuscoDB';

export const GraficaScreen = () => {
  const [dataGraficas, setDataGraficas] = useState([]);
  const [valuesArray, setValuesArray] = useState();

  useEffect(() => {
    getData();
    
  }, []);
  const getData = async () => {
    const dataCloudFirestore = await handleGetData();
    const dataSurvey = dataCloudFirestore.filter(
      data => data.dataType === 'written',
    );
    const datos = [];
    dataSurvey.map((data, i) => {
      datos.push(data.results);
    });
    procesarRespuestas(datos);
  };

  const procesarRespuestas = async (respuestas) => {
    if (respuestas && respuestas.length >= 1) {
      console.log(respuestas)
      const preguntasAProcesar = preguntas[0].questions; // Obtén las preguntas del arreglo preguntas

      const dataProcesada = [];

      for (const pregunta of preguntasAProcesar) {
        if (pregunta.questionType === 'numberInput') {
          const respuestasPregunta = {};
          const intervalos = [0, 10, 20, 30, 40]; // Define los intervalos según tu lógica
          // ... Realiza la lógica para contar la cantidad de personas en cada intervalo
          // Agrega esta información al objeto respuestasPregunta
          dataProcesada.push({
            pregunta: pregunta.title,
            respuestas: respuestasPregunta,
          });
        } else if (pregunta.questionType === 'radioButton') {
          // Procesar preguntas con opciones de selección (respuestas múltiples)
          const respuestasPregunta = {};

          // Inicializa el objeto con las respuestas posibles para esta pregunta
          pregunta.options.forEach(opcion => {
            respuestasPregunta[opcion] = 0;
          });

          // Itera sobre las respuestas y cuenta cuántas personas seleccionaron cada opción
          respuestas.forEach(respuesta => {
            const respuestaPregunta = respuesta[pregunta.questionID];
            if (respuestasPregunta.hasOwnProperty(respuestaPregunta)) {
              respuestasPregunta[respuestaPregunta]++;
            }
          });

          // Agrega los datos procesados al array dataProcesada
          dataProcesada.push({
            pregunta: pregunta.title,
            respuestas: respuestasPregunta,
          });
        }
      }

      setDataGraficas(dataProcesada);
    }
  };

  const generarDatosGrafica = indicePregunta => {
    const pregunta = dataGraficas[indicePregunta];
    const respuestas = pregunta.respuestas;
    const labels = Object.keys(respuestas).map(respuesta => respuesta); // Utiliza las respuestas como etiquetas
    const valores = Object.values(respuestas);
    // console.log(labels)
    return {
      dataSets: [
        {
          values: valores,
          label: 'Respuestas',
          config: {
            colors: [processColor('#2979FF')], // Color de las barras
            valueTextSize: 12,
          },
        },
      ],
      labels: labels,
    };
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {dataGraficas.map((pregunta, index) => (
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
                  style={{flex: 1}}
                  data={generarDatosGrafica(index)}
                  xAxis={{drawLabels: true, position: 'BOTTOM'}}
                  yAxisRight={{drawLabels: false}}
                  yAxisLeft={{drawLabels: true}}
                  chartDescription={{text: ''}}
                  legend={{enabled: true}}
                />
              </View>
            ))
          }
      </View>
    </ScrollView>
  );
};
