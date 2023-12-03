import React from 'react';

import {ScrollView} from 'react-native';

import {BonusesCarusel} from '@app/components/bonuses-carusel';
import {Footer} from '@app/components/footer';
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
      <Footer />
    </ScrollView>
  );
}

const styles = createTheme({
  mainWrapper: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
});
