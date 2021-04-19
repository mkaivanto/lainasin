import React from 'react';
import {format} from 'date-fns';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {Button, List, Card} from 'react-native-paper';
import {Loan} from '../../types/loan';
import {isLate} from '../../utils/date';
const styles = StyleSheet.create({
  icon: {
    width: 100,
    height: 100,
    backgroundColor: '#f6f8fa',
    margin: 0,
    borderRadius: 24,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 24,
  },
});

const ListItem = (props: {
  loan: Loan;
  showImage: (image: string) => void;
  handleUpdateLoan: (loan: Loan) => void;
  handleDeleteLoan: (loan: Loan) => void;
}) => {
  const {loan, showImage, handleUpdateLoan, handleDeleteLoan} = props;
  return (
    <Card key={loan.id} style={{margin: 16}}>
      <Card.Content>
        <List.Item
          title={loan.item}
          description={() => (
            <>
              <Text>Erääntyy: {format(loan.expires, 'd.M.yyyy')}</Text>
              <Text>Lainaaja: {loan.borrower}</Text>
            </>
          )}
          left={() =>
            loan.image ? (
              <TouchableOpacity onPress={() => showImage(loan.image)}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `data:image/png;base64,${loan.image}`,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <List.Icon style={styles.icon} icon="calendar-clock" />
            )
          }
          style={{
            backgroundColor: isLate(new Date(loan.expires))
              ? '#FF8484'
              : 'transparent',
          }}
        />
      </Card.Content>
      <Card.Actions style={{justifyContent: 'space-between'}}>
        <Button
          icon={loan.returned ? 'check' : 'radiobox-blank'}
          onPress={() => handleUpdateLoan({...loan, returned: !loan.returned})}>
          Palautettu
        </Button>
        <Button icon="delete" onPress={() => handleDeleteLoan(loan)}>
          Poista
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default ListItem;
