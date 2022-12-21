import React from 'react';

import {StatusBar, StyleSheet, View} from 'react-native';

export const StatusBarColor = ({backgroundColor = '#fff', ...props}) => {
  return (
    <View style={[styles.statusBar, {backgroundColor}]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight,
  },
});
