import React from 'react';
import {Appbar} from 'react-native-paper';
import {StackHeaderProps} from '@react-navigation/stack';

const NavigationBar = ({navigation, previous}: StackHeaderProps) => {
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Lainasin" />
      <Appbar.Action
        icon="bell-outline"
        onPress={() => navigation.navigate('Expired')}
      />
    </Appbar.Header>
  );
};

export default NavigationBar;
