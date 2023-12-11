import {handleGetData} from '../assets/questionnaireFunctions';
import {useEffect, useState} from 'react';
import {ScrollView, View, Dimensions, Text} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import {prueba as preguntas} from '../database/preguntasCuscoDB';

export const GraficaScreen = () => {
  const [dataGraficas, setDataGraficas] = useState([]);

  useEffect(() => {
    procesarRespuestas();
    //   getData();
  }, []);
  const getData = async () => {
    const dataCloudFirestore = await handleGetData();
    const dataSurvey = dataCloudFirestore.filter(
      data => data.dataType === 'written',
    );
    const valuesArray = [];
    dataSurvey.forEach((data, index) => {
      const values = Object.values(data.results);
      values.unshift(index + 1);
      valuesArray.push(values);
    });
  };

  const procesarRespuestas = async () => {
    const respuestas = [
      {
        'cual-es-su-sexo-123': 'Hombre',
        'edad-actual-123': 22,
        'estado-civil-123': 'Casado(a)',
      },
      {
        'cual-es-su-sexo-123': 'Mujer',
        'edad-actual-123': 33,
        'estado-civil-123': 'Unión libre',
      },
      {
        'cual-es-su-sexo-123': 'Hombre',
        'edad-actual-123': 23,
        'estado-civil-123': 'Viudo(a)',
      },
    ];
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
    console.log(dataGrafica);
  };

  const generarDatosGrafica = (indicePregunta) => {
    const pregunta = dataGraficas[indicePregunta];
    const respuestas = pregunta.respuestas;
    const labels = Object.keys(respuestas).map((respuesta) => respuesta); // Utiliza las respuestas como etiquetas
    const valores = Object.values(respuestas);
    console.log(labels)
    return {
      dataSets: [
        {
          values: valores,
          label: 'Respuestas',
          config: {
            colors: '#2979FF', // Color de las barras
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
            <Text>{pregunta.pregunta}</Text>
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
        ))}
      </View>
    </ScrollView>
  );
};
