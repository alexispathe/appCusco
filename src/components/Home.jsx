import {useNavigation} from '@react-navigation/native';
import {Button, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { Image } from 'react-native';
export const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image style={styles.imagen} source={require('../assets/images/logo.jpeg')} />
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.btn}
        onPress={() => navigation.navigate('DataUserScreen')}>
        <Text style={styles.text}>Realizar encuesta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.btn}
        onPress={() => navigation.navigate('FileDownloaderScreen')}>
        <Text style={styles.text}>Descargar resultados de las encuestas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.btn}
        onPress={() => navigation.navigate('GraficaScreen')}>
        <Text style={styles.text}>Ver graficas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.btn}
        onPress={() => navigation.navigate('DataUploadScreen')}>
        <Text style={styles.text}>Subir datos a la nube</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black'
  },
  btn: {
    width: '100%',
    height: 60,
    backgroundColor: '#CCA400',
    justifyContent: 'center',
    marginTop: 1,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagen: {
    width: 350,
    height: 350,
    resizeMode: 'cover', // Puedes ajustar esto según tus necesidades
  },
});
