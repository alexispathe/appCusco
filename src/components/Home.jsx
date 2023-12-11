import { DataUserScreen } from "./DataUserScreen";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
export const Home=()=>{
    const navigation = useNavigation();
    return(
        <>
         <DataUserScreen/>
        <Button onPress={()=>navigation.navigate('GraficaScreen')} title="Ver graficas"/>
        </>
       
    )
}