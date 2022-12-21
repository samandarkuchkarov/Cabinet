import React from 'react';

import {ScrollView} from 'react-native';

import {Color} from '@app/colors';
import {UserCard} from '@app/components/user-card';
import {createTheme} from '@app/helpers';
import {useCurrentTariff, useUserInfo} from '@app/hooks';
export function Profile() {
  useUserInfo();
  useCurrentTariff();

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
