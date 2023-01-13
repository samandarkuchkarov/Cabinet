/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {useCallback} from 'react';

import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import {Color, getColor} from '@app/colors';
import {createTheme} from '@app/helpers';

import {Icon, IconType} from './icon';

export type ButtonValue = {title: string};

export type ButtonRightIconType =
  | {iconRight: IconType['name']; iconRightColor: IconType['color']}
  | {iconRight?: undefined; iconRightColor?: undefined};

export type ButtonLeftIconType =
  | {iconLeft: IconType['name']; iconLeftColor?: IconType['color']}
  | {iconLeft?: undefined; iconLeftColor?: undefined};

export type ButtonProps = Omit<ViewProps, 'children'> & {
  disabled?: boolean;
  onPress: () => void;
  loading?: boolean;
  textColor?: string;
  style: ViewStyle;
  iconWidth?: number;
  fontFamily?: string;
  paddingHorizontal?: number;
} & ButtonValue &
  ButtonRightIconType &
  ButtonLeftIconType;

export enum ButtonVariant {
  text = 'text',
  error = 'error',
  contained = 'contained',
  outlined = 'outlined',
  second = 'second',
}

export enum ButtonSize {
  small = 'small',
  middle = 'middle',
  large = 'large',
}

export const Button = ({
  title,
  disabled,
  onPress,
  iconRight,
  iconRightColor,
  iconLeft,
  iconLeftColor,
  loading = false,
  iconWidth,
  style,
  textColor,
  fontFamily,
  paddingHorizontal,
  ...props
}: ButtonProps) => {
  const {t} = useTranslation();

  const onPressButton = useCallback(() => {
    if (!(disabled || loading)) {
      onPress();
    }
  }, [disabled, loading, onPress]);

  return (
    <View style={[styles.wrapper, {paddingHorizontal}]}>
      <TouchableOpacity
        onPress={onPressButton}
        style={[styles.container, style]}
        activeOpacity={0.7}
        {...props}>
        {loading ? (
          <ActivityIndicator size="small" color={getColor(Color.bg1)} />
        ) : (
          <>
            {iconLeft && (
              <Icon
                name={iconLeft}
                style={styles.icon}
                color={iconLeftColor}
                width={iconWidth || 17}
                height={iconWidth || 17}
              />
            )}
            <Text
              style={[
                styles.text,
                {
                  color: textColor ? textColor : getColor(Color.textBaseButton),
                  fontFamily: fontFamily ? fontFamily : 'Rubik-Medium',
                },
              ]}>
              {t(title)}
            </Text>
            {iconRight && (
              <Icon
                name={iconRight}
                color={iconRightColor}
                width={iconWidth || 17}
                height={iconWidth || 17}
              />
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = createTheme({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    paddingHorizontal: 16,
    height: 50,
  },
  wrapper: {
    width: '100%',
    // paddingHorizontal: 16,
  },
  text: {
    color: Color.textBaseButton,
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  icon: {
    marginRight: 10,
  },
});
