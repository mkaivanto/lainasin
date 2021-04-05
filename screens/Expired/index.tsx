import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button, View, Text} from 'react-native';

const Expired = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Ei lainoja, lisää uusi etusivulta</Text>
    </View>
  );
};

export default Expired;
