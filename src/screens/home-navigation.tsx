import React from 'react';

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/core/lib/typescript/src/types';

import {Color, getColor} from '@app/colors';
import {Header} from '@app/components/header';
import {TabBarIcon} from '@app/components/tab-bar-icon';
import {Home} from '@app/screens/home';
import {Profile} from '@app/screens/profile';
import {Settings} from '@app/screens/settings';
import {Statistics} from '@app/screens/statistics';
import {Wallet} from '@app/screens/wallet';
import {RootStackParamList} from '@app/types';
import {IS_IOS} from '@app/variables';

const Tab = createBottomTabNavigator<RootStackParamList>();

export const screenOptions = ({
  route,
}: {
  route: RouteProp<RootStackParamList>;
  navigation?: any;
}): BottomTabNavigationOptions => ({
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: getColor(Color.bg1),
  },
  tabBarStyle: {
    backgroundColor: getColor(Color.bg1),
    borderTopWidth: 0,
    elevation: 0,
    height: IS_IOS ? 80 : 60,
    marginBottom: IS_IOS ? 0 : 0,
  },
  tabBarItemStyle: {
    marginTop: IS_IOS ? 5 : 8,
    height: IS_IOS ? 50 : 40,
  },
  tabBarShowLabel: false,
  headerTitle: () => <Header />,
  tabBarIcon: ({focused}) => <TabBarIcon focused={focused} route={route} />,
});

export function HomeNavigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="statistics" component={Statistics} />
      <Tab.Screen name="profile" component={Profile} />
      <Tab.Screen name="wallet" component={Wallet} />
      <Tab.Screen name="settings" component={Settings} />
    </Tab.Navigator>
  );
}
