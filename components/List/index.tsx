import React from 'react';
import {useSelector} from 'react-redux';
import {format} from 'date-fns';
import {TouchableOpacity, Text, Alert, Image, StyleSheet} from 'react-native';
import {Button, List, Card, Portal, Modal} from 'react-native-paper';
import useLoans from '../../hooks/useLoans';
import {RootState} from '../../store';
import {Loan} from '../../types/loan';
import {isLate} from '../../utils/date';

const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 24,
  },
});

const ListComponent = () => {
  const {updateLoan, deleteLoan} = useLoans();
  const loans = useSelector((state: RootState) => state.loans);
  const [visible, setVisible] = React.useState(false);
  const [image, setImage] = React.useState('');
  const showModal = (imageToShow: string) => {
    setImage(imageToShow);
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
    setImage('');
  };

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
              left={() =>
                v.image ? (
                  <TouchableOpacity onPress={() => showModal(v.image)}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `data:image/png;base64,${v.image}`,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <List.Icon style={styles.icon} icon="calendar-clock" />
                )
              }
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
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#ffffff',
            width: '80%',
            height: '80%',
            justifyContent: 'center',
            display: 'flex',
          }}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: `data:image/png;base64,${image}`,
            }}
          />
        </Modal>
      </Portal>
    </List.Section>
  );
};

export default ListComponent;
