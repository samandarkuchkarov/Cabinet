import React from 'react';

import {t} from 'i18next';
import {Text, TouchableOpacity, View} from 'react-native';

import {Color} from '@app/colors';
import {createTheme} from '@app/helpers';

import {Icon} from './icon';
type TabButtonProps = {
  onPress: () => void;
  title: string;
};
export function TabButton({onPress, title}: TabButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.btn}>
        <Text style={styles.text}>{t(title)}</Text>
        <Icon height={15} width={15} name="arrowRight" />
      </View>
    </TouchableOpacity>
  );
}

const styles = createTheme({
  btn: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Color.textFieldBack,
    borderRadius: 9,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop: 10,
  },
  text: {
    fontSize: 17,
    fontFamily: 'Rubik-Medium',
    color: Color.bg4,
  },
});
