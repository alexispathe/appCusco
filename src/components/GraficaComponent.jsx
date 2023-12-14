// GraficaComponent.js
import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
export const GraficaComponent = ({ pregunta, generarDatosGrafica }) => {
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
        <BarChart
          data={generarDatosGrafica()}
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
          style={{
            marginLeft: -16, // Ajuste para que la primera barra no esté cortada
          }}
        />
    </View>
  );
};

