import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {Divider, Menu} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';
import {RootState, setSort} from '../../store';
import {Sort} from '../../types/sort';

/** Sets title bold if data is sorted by this title */
const getTitleStyle = (
  cfg: Sort,
  property: Sort['sortBy'],
): StyleProp<TextStyle> => {
  return {
    fontWeight: cfg.sortBy === property ? '700' : '400',
  };
};

/** Sets title icon to indicate sort direction */
const getTitleIcon = (cfg: Sort, property: Sort['sortBy']): string => {
  if (cfg.sortBy === property)
    return cfg.direction === 'asc' ? 'arrow-up' : 'arrow-down';
  return 'minus';
};

const SortMenu = (props: {
  anchor: JSX.Element;
  visible: boolean;
  onDismiss: () => void;
}) => {
  const dispatch = useDispatch();
  const {anchor, visible, onDismiss} = props;
  const sortCfg = useSelector((state: RootState) => state.sort.sort);

  const toggleDirection = (direction: Sort['direction']) =>
    direction === 'asc' ? 'desc' : 'asc';

  return (
    <Menu visible={visible} onDismiss={onDismiss} anchor={anchor}>
      <Text style={{textAlign: 'center', textTransform: 'uppercase'}}>
        Järjestä lista
      </Text>
      <Divider />
      <Menu.Item
        onPress={() =>
          dispatch(
            setSort({
              sortBy: 'id',
              direction: toggleDirection(sortCfg.direction),
            }),
          )
        }
        title="Viimeksi lisätty"
        icon={getTitleIcon(sortCfg, 'id')}
        titleStyle={getTitleStyle(sortCfg, 'id')}
      />
      <Menu.Item
        onPress={() =>
          dispatch(
            setSort({
              sortBy: 'expires',
              direction: toggleDirection(sortCfg.direction),
            }),
          )
        }
        title="Erääntyvä"
        icon={getTitleIcon(sortCfg, 'expires')}
        titleStyle={getTitleStyle(sortCfg, 'expires')}
      />
      <Menu.Item
        onPress={() =>
          dispatch(
            setSort({
              sortBy: 'item',
              direction: toggleDirection(sortCfg.direction),
            }),
          )
        }
        title="Lainattava"
        icon={getTitleIcon(sortCfg, 'item')}
        titleStyle={getTitleStyle(sortCfg, 'item')}
      />
      <Menu.Item
        onPress={() =>
          dispatch(
            setSort({
              sortBy: 'borrower',
              direction: toggleDirection(sortCfg.direction),
            }),
          )
        }
        title="Lainaaja"
        icon={getTitleIcon(sortCfg, 'borrower')}
        titleStyle={getTitleStyle(sortCfg, 'borrower')}
      />
    </Menu>
  );
};

export default SortMenu;
