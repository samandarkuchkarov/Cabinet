import {NavigatorScreenParams} from '@react-navigation/native';
import {ScaledSize} from 'react-native';
export type WindowSize = {
  WINDOW_HEIGHT?: ScaledSize | undefined;
  WINDOW_WIDTH?: ScaledSize | undefined;
};

export enum AppTheme {
  light = 'light',
  dark = 'dark',
  system = 'system',
}
export type TabParamList = {
  bonus: undefined;
  static: undefined;
  profile: undefined;
  wallet: undefined;
  settings: undefined;
  detail: undefined;
};

export type RootStackParamList = {
  homeNavigation: NavigatorScreenParams<TabParamList>;
  authentication: undefined;
  passwordChange: undefined;
};

export type IconsType = {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
};
