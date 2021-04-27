import React from 'react';
import {useSelector} from 'react-redux';
import {View, ScrollView, SafeAreaView} from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import List from '../../components/List';
import {RootState} from '../../store';
import {sort} from '../../utils/sort';
import useLoans from '../../hooks/useLoans';
import NoResults from '../../components/NoResults';

const Home = () => {
  useLoans();
  const sortCfg = useSelector((state: RootState) => state.sort.sort);
  const loans = sort(
    useSelector((state: RootState) => state.loans.loans),
    sortCfg.sortBy,
    sortCfg.direction,
  );

  const noLoans = !loans || (loans && loans.length < 1);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: noLoans ? 1 : undefined,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            {noLoans ? (
              <NoResults text='Ei lainoja, lisää uusi painamalla "+ Lisää"-painiketta.' />
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
