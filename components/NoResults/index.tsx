import React from 'react';
import {View, Text} from 'react-native';

const NoResults = (props: {text: string}): JSX.Element => {
  return (
    <View
      style={{
        marginTop: 16,
      }}>
      <Text>{props.text}</Text>
    </View>
  );
};

export default NoResults;
