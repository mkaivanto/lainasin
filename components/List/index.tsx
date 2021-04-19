import React from 'react';
import {useSelector} from 'react-redux';
import {Alert, Image} from 'react-native';
import {List, Portal, Modal} from 'react-native-paper';
import useLoans from '../../hooks/useLoans';
import {RootState} from '../../store';
import {Loan} from '../../types/loan';
import ListItem from '../ListItem';

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
        <ListItem
          loan={v}
          showImage={showModal}
          handleUpdateLoan={updateLoan}
          handleDeleteLoan={handleDeleteLoan}
        />
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
