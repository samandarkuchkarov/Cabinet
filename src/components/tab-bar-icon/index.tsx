import React from 'react';

import {RouteProp} from '@react-navigation/native';

import {Color} from '@app/colors';
import {Icon} from '@app/components/ui/icon';
import {RootStackParamList} from '@app/types';

// import {RootStackParamList} from '@app/types';
export type TabBarIconProps = {
  route: RouteProp<RootStackParamList>;
  focused: boolean;
};

export const TabBarIcon = ({route, focused}: TabBarIconProps) => {
  switch (route.name) {
    case 'home':
      return (
        <Icon
          name="bonus"
          color={focused ? Color.bg3 : Color.bg4}
          width={24}
          height={24}
        />
      );
    case 'statistics':
      return (
        <Icon
          name="static"
          color={focused ? Color.bg3 : Color.bg4}
          width={24}
          height={24}
        />
      );
    case 'profile':
      return (
        <Icon
          name="profile"
          color={focused ? Color.bg3 : Color.bg4}
          width={24}
          height={24}
        />
      );
    case 'wallet':
      return (
        <Icon
          name="wallet"
          color={focused ? Color.bg3 : Color.bg4}
          width={24}
          height={24}
        />
      );
    case 'settings':
      return (
        <Icon
          name="settings"
          color={focused ? Color.bg3 : Color.bg4}
          width={24}
          height={24}
        />
      );
  }
  return null;
};
