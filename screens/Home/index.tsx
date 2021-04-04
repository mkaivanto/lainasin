import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button} from 'react-native-paper';
import {View, Text} from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate('Form')}>
        Lisää uusi laina
      </Button>
    </View>
  );
};

export default Home;
