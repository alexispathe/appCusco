import React from 'react';
import { Home } from './src/components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
function App(): JSX.Element {
  
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider>
      <Home/>
    </PaperProvider>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
    ) 
}



export default App;
