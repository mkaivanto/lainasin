import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {DatabaseProvider} from './context/db';
import Home from './screens/Home';
import Expired from './screens/Expired';

import NavigationBar from './components/NavigationBar';
import Form from './components/Form';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator
    headerMode="screen"
    screenOptions={{
      headerShown: true,
      header: props => <NavigationBar {...props} />,
    }}>
    <MainStack.Screen name="Home" component={Home} />
    <MainStack.Screen name="Expired" component={Expired} />
  </MainStack.Navigator>
);

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  return (
    <NavigationContainer>
      <DatabaseProvider>
        <PaperProvider theme={theme}>
          <RootStack.Navigator
            initialRouteName="Home"
            mode="modal"
            screenOptions={{headerShown: false}}>
            <RootStack.Screen name="Main" component={MainStackScreen} />
            <RootStack.Screen
              name="Form"
              component={Form}
              options={{headerShown: false, header: undefined}}
            />
          </RootStack.Navigator>
        </PaperProvider>
      </DatabaseProvider>
    </NavigationContainer>
  );
};

export default App;
