import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button, View, Text} from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Expired"
        onPress={() => navigation.navigate('Expired', {name: 'Jane'})}
      />
    </View>
  );
};

export default Home;
