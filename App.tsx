import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DefaultTheme,
  Provider as PaperProvider,
  Title,
} from 'react-native-paper';
import Home from './screens/Home';
import Expired from './screens/Expired';

import NavigationBar from './components/NavigationBar';
import Form from './components/Form';

const Stack = createStackNavigator();

const App = () => {
  //const isDarkMode = useColorScheme() === 'dark';
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: props => <NavigationBar {...props} />,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Expired" component={Expired} />
          <Stack.Screen name="Form" component={Form} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
