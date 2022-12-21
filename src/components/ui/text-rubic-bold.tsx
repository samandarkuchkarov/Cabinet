import React from 'react';

import {StyleSheet, Text, TextStyle} from 'react-native';

export const TextRubicBold = (props: TextStyle | any) => {
  return (
    <Text {...props} style={[props.style, styles.font]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  font: {fontFamily: 'Rubik-Bold'},
});
