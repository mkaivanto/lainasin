import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import List from '../../components/List';
import {RootState} from '../../store';
import useLoans from '../../hooks/useLoans';

const Home = () => {
  useLoans();
  const loans = useSelector((state: RootState) => state.loans);
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
            {loans && loans.value.length < 1 ? (
              <Text>
                Ei lainoja, lisää uusi painamalla "+ Lisää"-painiketta.
              </Text>
            ) : (
              <List />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <FloatingActionButton />
    </>
  );
};

export default Home;
