import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button, View, Text} from 'react-native';

const Expired = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home', {name: 'Jane'})}
      />
    </View>
  );
};

export default Expired;
