import React from 'react';

import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/core/lib/typescript/src/types';

import {Color, getColor} from '@app/colors';
import {Header} from '@app/components/header';
import {TabBar, TabbarProps} from '@app/components/tab-bar';
import {Home} from '@app/screens/home';
import {Profile} from '@app/screens/profile';
import {Settings} from '@app/screens/settings';
import {Statistics} from '@app/screens/statistics';
import {Wallet} from '@app/screens/wallet';
import {TabParamList} from '@app/types';

const Tab = createBottomTabNavigator<TabParamList>();

export const screenOptions = ({}: {
  route: RouteProp<TabParamList>;
  navigation?: any;
}): BottomTabNavigationOptions => ({
  headerStyle: {
    backgroundColor: getColor(Color.bg1),
    shadowColor: getColor(Color.black),
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.13,
  },

  tabBarShowLabel: false,
  headerTitle: () => <Header />,
  // tabBarIcon: ({focused}) => <TabBarIcon focused={focused} route={route} />,
});

export function HomeNavigation() {
  const tabFunction = (props: TabbarProps) => <TabBar {...props} />;
  return (
    <Tab.Navigator tabBar={tabFunction} screenOptions={screenOptions}>
      <Tab.Screen name="profile" component={Profile} />
      <Tab.Screen name="bonus" component={Home} />
      <Tab.Screen name="static" component={Statistics} />
      <Tab.Screen name="wallet" component={Wallet} />
      <Tab.Screen name="settings" component={Settings} />
    </Tab.Navigator>
  );
}
