import React from 'react';
import {useSelector} from 'react-redux';
import {format} from 'date-fns';
import {View} from 'react-native';
import {Button, List} from 'react-native-paper';
import useLoans from '../../hooks/useLoans';
import {RootState} from '../../store';

const ListComponent = () => {
  const {updateLoan, deleteLoan} = useLoans();
  const loans = useSelector((state: RootState) => state.loans);
  return (
    <List.Section style={{width: '100%'}}>
      <List.Subheader>Lainat</List.Subheader>
      {loans.value.map(v => (
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
  );
};

export default ListComponent;
