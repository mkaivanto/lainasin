import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {SafeAreaView, View, Alert, Image, StyleSheet} from 'react-native';
import {Button, IconButton, TextInput, Title} from 'react-native-paper';
import {add} from 'date-fns';
import useLoans from '../../hooks/useLoans';
import {Loan} from '../../types/loan';
import DatePicker from '../DatePicker';
import {handleImagePicker} from '../../utils/image';

const styles = StyleSheet.create({
  textField: {
    marginBottom: 16,
  },
  button: {marginTop: 16, marginBottom: 16},
  image: {
    width: 200,
    height: 200,
    borderRadius: 24,
    marginTop: 16,
    marginBottom: 16,
  },
});

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
          style={styles.textField}
        />
        <TextInput
          label="Lainattava"
          value={form.item}
          onChangeText={value => handleChangeValue('item', value)}
          style={styles.textField}
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
                  onPress: () => handleImagePicker(true, handleChangeValue),
                },
                {
                  text: 'Galleria',
                  onPress: () => handleImagePicker(false, handleChangeValue),
                },
              ],
            )
          }
          style={styles.button}>
          {form.image.length > 0 ? 'Vaihda kuva' : 'Lisää kuva'}
        </Button>
        {form.image.length > 0 && (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              position: 'relative',
            }}>
            <Image
              style={styles.image}
              source={{
                uri: `data:image/png;base64,${form.image}`,
              }}
            />
            <IconButton
              icon="close"
              onPress={() => handleChangeValue('image', '')}
              style={{position: 'absolute', right: 0, top: 0}}>
              {''}
            </IconButton>
          </View>
        )}
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
