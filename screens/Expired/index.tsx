import React from 'react';
import {useSelector} from 'react-redux';

import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {RootState} from '../../store';
import List from '../../components/List';
import {isLate} from '../../utils/date';
import {sort} from '../../utils/sort';

const Expired = () => {
  const sortCfg = useSelector((state: RootState) => state.sort.sort);
  const loans = sort(
    useSelector((state: RootState) => state.loans.loans).filter(
      v => isLate(new Date(v.expires)) && !v.returned,
    ),
    sortCfg.sortBy,
    sortCfg.direction,
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {loans && loans.length < 1 ? (
            <Text>Ei erääntyneitä lainoja, lisää uusi laina etusivulta</Text>
          ) : (
            <List title="Erääntyneet lainat" loans={loans} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Expired;
