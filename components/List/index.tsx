import React from 'react';
import {useSelector} from 'react-redux';
import {format} from 'date-fns';
import {Text, Alert} from 'react-native';
import {Button, List, Card} from 'react-native-paper';
import useLoans from '../../hooks/useLoans';
import {RootState} from '../../store';
import {Loan} from '../../types/loan';
import {isLate} from '../../utils/date';

const ListComponent = () => {
  const {updateLoan, deleteLoan} = useLoans();
  const loans = useSelector((state: RootState) => state.loans);

  const handleDeleteLoan = (v: Loan) => {
    Alert.alert(
      'Oletko varma?',
      `Paina OK jos haluat poistaa lainan: ${v.item}`,
      [
        {
          text: 'Peruuta',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteLoan(v)},
      ],
    );
  };

  return (
    <List.Section style={{width: '100%'}}>
      <List.Subheader>Lainat</List.Subheader>
      {loans.value.map(v => (
        <Card key={v.id} style={{margin: 16}}>
          <Card.Content>
            <List.Item
              title={v.item}
              description={() => (
                <>
                  <Text>Erääntyy: {format(v.expires, 'd.M.yyyy')}</Text>
                  <Text>Lainaaja: {v.borrower}</Text>
                </>
              )}
              left={() => <List.Icon icon="calendar-clock" />}
              style={{
                backgroundColor: isLate(new Date(v.expires))
                  ? '#FF8484'
                  : 'transparent',
              }}
            />
          </Card.Content>
          <Card.Actions style={{justifyContent: 'space-between'}}>
            <Button
              icon={v.returned ? 'check' : 'radiobox-blank'}
              onPress={() => updateLoan({...v, returned: !v.returned})}>
              Palautettu
            </Button>
            <Button icon="delete" onPress={() => handleDeleteLoan(v)}>
              Poista
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </List.Section>
  );
};

export default ListComponent;
