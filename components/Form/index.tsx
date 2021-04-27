import React, {useState, useCallback, useMemo, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Button, IconButton, TextInput, Title} from 'react-native-paper';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {add} from 'date-fns';
import useLoans from '../../hooks/useLoans';
import {Loan} from '../../types/loan';
import DatePicker from '../DatePicker';
import {handleImagePicker} from '../../utils/image';
import {scheduleNotification} from '../../utils/pushNotif';

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
  sheetContentContainer: {
    flex: 1,
    alignItems: 'center',
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
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const navigation = useNavigation();
  const {createLoan} = useLoans();

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleChangeValue = (name: string, value: string | number) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCreateLoan = () => {
    createLoan(form)
      .then((loanId: number) => scheduleNotification({...form, id: loanId}))
      .then(() => navigation.goBack());
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView>
        <ScrollView style={{margin: 16, height: '100%'}}>
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
            onPress={() => bottomSheetRef.current?.present()}
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
        </ScrollView>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={BottomSheetBackdrop}>
          <View style={styles.sheetContentContainer}>
            <Button
              style={{marginTop: 24}}
              onPress={() => {
                bottomSheetRef.current?.close();
                handleImagePicker(true, handleChangeValue);
              }}>
              Kamera
            </Button>
            <Button
              style={{marginTop: 24}}
              onPress={() => {
                bottomSheetRef.current?.close();
                handleImagePicker(false, handleChangeValue);
              }}>
              Puhelimen kirjasto
            </Button>
            <Button
              style={{marginTop: 24}}
              mode="outlined"
              icon="close"
              onPress={() => bottomSheetRef.current?.close()}>
              Sulje
            </Button>
          </View>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default Form;
