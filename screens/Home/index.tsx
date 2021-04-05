import React, {useEffect} from 'react';
import {format} from 'date-fns';
import {Button, List} from 'react-native-paper';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import useLoans from '../../hooks/useLoans';

const Home = () => {
  const {loans, deleteLoan, updateLoan} = useLoans();

  useEffect(() => {
    console.log('home');
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            {loans.length < 1 ? (
              <Text>
                Ei lainoja, lisää uusi painamalla "+ Lisää"-painiketta.
              </Text>
            ) : (
              <List.Section style={{width: '100%'}}>
                <List.Subheader>Lainat</List.Subheader>
                {loans.map(v => (
                  <View key={v.id}>
                    <List.Item
                      title={v.item}
                      description={v.borrower + format(v.expires, 'd.M.yyyy')}
                      left={() => <List.Icon icon="calendar-clock" />}
                    />
                    <Button
                      icon={v.returned ? 'check' : 'radiobox-blank'}
                      onPress={() => updateLoan({...v, returned: !v.returned})}>
                      Palautettu
                    </Button>
                    <Button icon="delete" onPress={() => deleteLoan(v)}>
                      Poista
                    </Button>
                  </View>
                ))}
              </List.Section>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <FloatingActionButton />
    </>
  );
};

export default Home;
