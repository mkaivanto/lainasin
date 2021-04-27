import React from 'react';
import {useSelector} from 'react-redux';
import {Alert, Image} from 'react-native';
import {List, Portal, Modal} from 'react-native-paper';
import useLoans from '../../hooks/useLoans';
import {RootState} from '../../store';
import {Loan} from '../../types/loan';
import ListItem from '../ListItem';
import {
  removeScheduledNotification,
  scheduleNotification,
} from '../../utils/pushNotif';

const ListComponent = (props: {title?: string; loans: Loan[]}) => {
  const {updateLoan, deleteLoan} = useLoans();
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

  const handleUpdateLoan = (v: Loan) => {
    updateLoan(v).then(() => {
      if (v.returned) removeScheduledNotification(v.id);
      else {
        removeScheduledNotification(v.id);
        scheduleNotification(v);
      }
    });
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
        {
          text: 'OK',
          onPress: () =>
            deleteLoan(v).then(() => removeScheduledNotification(v.id)),
        },
      ],
    );
  };

  return (
    <List.Section style={{width: '100%'}}>
      <List.Subheader>{props.title || 'Lainat'}</List.Subheader>
      {props.loans.map(v => (
        <ListItem
          key={v.id}
          loan={v}
          showImage={showModal}
          handleUpdateLoan={handleUpdateLoan}
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
