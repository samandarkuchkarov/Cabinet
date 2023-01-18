import React from 'react';

import {View} from 'react-native';

import {createTheme} from '@app/helpers';

export function SelectedCycle() {
  return (
    <View style={styles.mainCycle1}>
      <View style={styles.secondaryCycle} />
    </View>
  );
}

export function UnSelectedCycle() {
  return <View style={styles.mainCycle} />;
}

const styles = createTheme({
  mainCycle: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDCDCD',
    borderRadius: 100,
    marginLeft: 10,
    zIndex: 2,
    position: 'absolute',
    top: 24,
    right: 10,
  },
  mainCycle1: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F35459',
    borderRadius: 100,
    marginLeft: 10,
    zIndex: 2,
    position: 'absolute',
    top: 24,
    right: 10,
  },
  secondaryCycle: {
    width: 7,
    height: 7,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});
