import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

const FloatingActionButton = () => {
  const navigation = useNavigation();
  return (
    <FAB
      style={styles.fab}
      icon="plus"
      label="Lisää"
      onPress={() => navigation.navigate('Form')}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default FloatingActionButton;
