// Componente principal
import {useNavigation} from '@react-navigation/native';
import {Button, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {Image} from 'react-native';
export const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={styles.imagen}
        source={require('../assets/images/logo.jpeg')}
      />
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.btn}
        onPress={() => navigation.navigate('DataUserScreen')}>
        <View style={styles.btnContainer}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/evaluacion.png')}
          />
          <Text style={styles.text}>Realizar encuesta</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.btn}
        onPress={() => navigation.navigate('FileDownloaderScreen')}>
        <View style={styles.btnContainer}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/archivo.png')}
          />
          <Text style={styles.text}>Descargar resultados</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.btn}
        onPress={() => navigation.navigate('GraficaScreen')}>
         <View style={styles.btnContainer}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/grafica.png')}
          />
          <Text style={styles.text}>Ver graficas</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.btn}
        onPress={() => navigation.navigate('DataUploadScreen')}>
         <View style={styles.btnContainer}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/nube.png')}
          />
          <Text style={styles.text}>Subir datos a la nube</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  btn: {
    width: '100%',
    height: 60,
    backgroundColor: '#CCA400',
    justifyContent: 'center',
    marginTop: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  imagen: {
    width: 350,
    height: 350,
    resizeMode: 'cover',
  },
});
