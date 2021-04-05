import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import {Button, Text, TextInput, Title} from 'react-native-paper';
import {add} from 'date-fns';
import useLoans from '../../hooks/useLoans';
import {Loan} from '../../types/loan';
import DatePicker from '../DatePicker';

const INITIAL_STATE = {
  id: null,
  borrower: '',
  item: '',
  expires: add(new Date(), {weeks: 1}),
  returned: false,
};

const Form = () => {
  const [form, setForm] = useState<Loan>(INITIAL_STATE);
  const navigation = useNavigation();
  const {createLoan} = useLoans();

  const handleChangeValue = (name: string, value: string | Date) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCreateLoan = () => {
    createLoan(form).then(() => navigation.goBack());
  };

  return (
    <SafeAreaView>
      <Title>Lisää uusi laina</Title>
      <TextInput
        label="Lainaaja"
        value={form.borrower}
        onChangeText={value => handleChangeValue('borrower', value)}
      />
      <TextInput
        label="Lainattava"
        value={form.item}
        onChangeText={value => handleChangeValue('item', value)}
      />

      <DatePicker
        value={form.expires}
        setDate={date => handleChangeValue('expires', date)}
      />
      <Button icon="close" onPress={() => navigation.goBack()}>
        Peruuta
      </Button>
      <Button
        mode="contained"
        icon="content-save"
        onPress={() => handleCreateLoan()}>
        Tallenna
      </Button>
    </SafeAreaView>
  );
};

export default Form;
