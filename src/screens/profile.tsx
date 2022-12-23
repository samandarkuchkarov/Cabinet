import React from 'react';

import {ScrollView} from 'react-native';

import {Color} from '@app/colors';
import {UserCard} from '@app/components/user-card';
import {createTheme} from '@app/helpers';
import {useAllTariffs, useCurrentTariff, useUserInfo} from '@app/hooks';
export function Profile() {
  useUserInfo();
  useCurrentTariff();
  useAllTariffs();
  return (
    <ScrollView style={styles.mainWrapper}>
      <UserCard />
    </ScrollView>
  );
}

const styles = createTheme({
  mainWrapper: {
    backgroundColor: Color.screenBg,
    flex: 1,
  },
});
