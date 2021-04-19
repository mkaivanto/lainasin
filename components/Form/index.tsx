import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {SafeAreaView, View, Alert} from 'react-native';
import {Button, TextInput, Title} from 'react-native-paper';
import {add} from 'date-fns';
import useLoans from '../../hooks/useLoans';
import {Loan} from '../../types/loan';
import DatePicker from '../DatePicker';
import {handleCamera, handleImageLibrary} from '../../utils/image';

const INITIAL_STATE = {
  id: null,
  borrower: '',
  item: '',
  expires: add(new Date(), {weeks: 1}).getTime(),
  returned: false,
  image: '',
};

const Form = () => {
  const [form, setForm] = useState<Loan>(INITIAL_STATE);
  const navigation = useNavigation();
  const {createLoan} = useLoans();

  const handleChangeValue = (name: string, value: string | number) => {
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
      <View style={{margin: 16}}>
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
          value={new Date(form.expires)}
          setDate={date => handleChangeValue('expires', date.getTime())}
        />
        <Button
          icon="file-image"
          onPress={() =>
            Alert.alert(
              'Ota uusi tai käytä vanhaa kuvaa',
              `Paina Ota uusi kuva jos haluat ottaa kameralla uuden kuvan. Paina Galleria jos haluat valita vanhan kuvan.`,
              [
                {text: 'Peruuta', style: 'cancel'},
                {
                  text: 'Ota uusi kuva',
                  onPress: () => {
                    handleCamera();
                  },
                },
                {text: 'Galleria', onPress: () => handleImageLibrary()},
              ],
            )
          }>
          Lisää kuva
        </Button>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button icon="close" onPress={() => navigation.goBack()}>
            Peruuta
          </Button>
          <Button
            mode="contained"
            icon="content-save"
            onPress={() => handleCreateLoan()}>
            Tallenna
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Form;
