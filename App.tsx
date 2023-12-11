import React from 'react';
import {Home} from './src/components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';
import {routes} from './src/routes/componentPaths';
function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          {routes.map((route,i)=>(
            <Stack.Screen  name={route.name} component={route.component}  key={i} options={{headerShown: false}}/>
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
