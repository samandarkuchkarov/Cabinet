import React from 'react';

import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';

import {Color} from '@app/colors';
import {createTheme} from '@app/helpers';
import {useSession, useSessionDetail} from '@app/hooks';

export function Detail() {
  useSession();
  useSessionDetail();
  const {t} = useTranslation();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{t('statistics')}</Text>
      <View style={styles.card}>
        <View style={styles.item}>
          <Text style={styles.itemText}>IP:</Text>
          <Text style={styles.itemText}>100. 65. 88. 251</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>CID:</Text>
          <Text style={styles.itemText}>123456789123</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Длительность:</Text>
          <Text style={styles.itemText}>+1 06:35:12</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Отправлено:</Text>
          <Text style={styles.itemText}>1.65 GB</Text>
        </View>
      </View>
    </View>
  );
}

const styles = createTheme({
  wrapper: {
    padding: 20,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Rubik-Bold',
    color: Color.textBase,
    fontSize: 22,
    marginTop: 30,
  },
  card: {
    width: '100%',
    borderRadius: 9,
    backgroundColor: Color.bg1,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.24,

    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7.5,
  },
  itemText: {
    fontFamily: 'Rubik-Regular',
  },
});
