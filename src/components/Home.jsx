import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, TouchableOpacity,Text, View } from "react-native";
export const Home=()=>{
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.9} style={styles.btn} onPress={()=>navigation.navigate('DataUserScreen')} ><Text style={styles.text}>Realizar encuesta</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={styles.btn} onPress={()=>navigation.navigate('FileDownloaderScreen')}><Text style={styles.text}>Descargar resultados de las encuestas</Text></TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={styles.btn} onPress={()=>navigation.navigate('GraficaScreen')}><Text style={styles.text}>Ver graficas</Text></TouchableOpacity>
        </View>
       
    )
}

const styles = StyleSheet.create({
    btn:{
        width: "100%",
        height: 60,
        backgroundColor: '#0184EB',
        justifyContent: 'center',
        marginTop: 1
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'center',
    }
})