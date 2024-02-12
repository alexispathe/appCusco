// Este componente funciona para renderizar cada una de las preguntas para cada grafica
import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
export const GraficaComponent = ({ pregunta, generarDatosGrafica }) => {
  const screenWidth = Dimensions.get('window').width;
  const additionalWidthPerAnswer = 200; // Ancho adicional por cada respuesta

  const numAnswers = Object.keys(pregunta.respuestas).length; // Obtener la cantidad de respuestas
  const chartWidth = screenWidth + (additionalWidthPerAnswer * (numAnswers - 2)); // Ajustar el ancho de la gráfica según la cantidad de respuestas

  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          textAlign: 'center',
          color: 'black',
          fontWeight: 'bold',
          padding: 10,
        }}
      >
        {pregunta.pregunta}
      </Text>
      <ScrollView horizontal>
        <BarChart
          data={generarDatosGrafica()}
          width={chartWidth}
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
          style={{
            marginLeft: -16, // Ajuste para que la primera barra no esté cortada
          }}
        />
      </ScrollView>
    </View>
  );
};
