import React from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput, Title} from 'react-native-paper';
import DatePicker from '../DatePicker';

const Form = () => {
  return (
    <View>
      <Title>Lisää uusi laina</Title>
      <TextInput label="Kenelle" />
      <TextInput label="Asia" />

      <DatePicker />
      <Button>Tallenna</Button>
    </View>
  );
};

export default Form;
