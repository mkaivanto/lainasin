import React from 'react';
import {useSelector} from 'react-redux';

import {View, ScrollView, SafeAreaView} from 'react-native';
import {RootState} from '../../store';
import List from '../../components/List';
import {isLate} from '../../utils/date';
import {sort} from '../../utils/sort';
import useLoans from '../../hooks/useLoans';
import NoResults from '../../components/NoResults';

const Expired = () => {
  useLoans();
  const sortCfg = useSelector((state: RootState) => state.sort.sort);
  const loans = sort(
    useSelector((state: RootState) => state.loans.loans).filter(
      v => isLate(new Date(v.expires)) && !v.returned,
    ),
    sortCfg.sortBy,
    sortCfg.direction,
  );
  const noLoans = !loans || (loans && loans.length < 1);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: noLoans ? 1 : undefined}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {noLoans ? (
            <NoResults text="Ei erääntyneitä lainoja, lisää uusi laina etusivulta" />
          ) : (
            <List title="Erääntyneet lainat" loans={loans} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Expired;
