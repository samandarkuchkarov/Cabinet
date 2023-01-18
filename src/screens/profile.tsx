import React from 'react';

import {ScrollView} from 'react-native';

import {Color} from '@app/colors';
import {BonusesCarusel} from '@app/components/bonuses-carusel';
import {UserCard} from '@app/components/user-card';
import {createTheme} from '@app/helpers';
import {
  useAllBonuses,
  useAllTariffs,
  useCurrentTariff,
  useUserInfo,
} from '@app/hooks';
export function Profile() {
  useUserInfo();
  useCurrentTariff();
  useAllTariffs();
  useAllBonuses();
  return (
    <ScrollView style={styles.mainWrapper}>
      <UserCard />
      <BonusesCarusel />
    </ScrollView>
  );
}

const styles = createTheme({
  mainWrapper: {
    backgroundColor: Color.screenBg,
    flex: 1,
  },
});
