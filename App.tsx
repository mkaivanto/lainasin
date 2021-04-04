import 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: props => <Title>Lainasin</Title>,
              headerRight: () => {
                const navigation = useNavigation();
                return (
                  <IconButton
                    icon="bell-outline"
                    onPress={() => navigation.navigate('Expired')}
                  />
                );
              },
            }}
          />
          <Stack.Screen name="Expired" component={Expired} />
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
