import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import List from '../../components/List';
import {RootState} from '../../store';
import {sort} from '../../utils/sort';
import useLoans from '../../hooks/useLoans';

const Home = () => {
  useLoans();
  const sortCfg = useSelector((state: RootState) => state.sort.sort);
  const loans = sort(
    useSelector((state: RootState) => state.loans.loans),
    sortCfg.sortBy,
    sortCfg.direction,
  );
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
            {loans && loans.length < 1 ? (
              <Text>
                Ei lainoja, lisää uusi painamalla "+ Lisää"-painiketta.
              </Text>
            ) : (
              <List title="Kaikki lainat" loans={loans} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <FloatingActionButton />
    </>
  );
};

export default Home;
