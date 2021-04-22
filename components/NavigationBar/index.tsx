import React from 'react';
import {Platform} from 'react-native';
import {Appbar} from 'react-native-paper';
import {StackHeaderProps} from '@react-navigation/stack';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
import SortMenu from '../SortMenu';

const getRouteName = (name: string) => {
  switch (name) {
    case 'Home':
      return 'Etusivu';
    case 'Expired':
      return 'Erääntyneet';
  }
};

const NavigationBar = ({navigation, previous, scene}: StackHeaderProps) => {
  const [menuVisible, setMenuVisible] = React.useState<boolean>(false);
  const MenuAnchor = (
    <Appbar.Action
      icon={MORE_ICON}
      onPress={() => setMenuVisible(!menuVisible)}
      color="#ffffff"
    />
  );
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={getRouteName(scene.route.name)} />
      <Appbar.Action
        icon="bell-outline"
        onPress={() => navigation.navigate('Expired')}
      />
      <SortMenu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={MenuAnchor}
      />
    </Appbar.Header>
  );
};

export default NavigationBar;
