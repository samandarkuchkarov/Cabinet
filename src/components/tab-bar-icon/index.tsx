import React, {useEffect} from 'react';

// import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {Color} from '@app/colors';
import {Icon} from '@app/components/ui/icon';
import {createTheme} from '@app/helpers';
import {IS_IOS} from '@app/variables';

// import {RootStackParamList} from '@app/types';
export type TabBarIconProps = {
  name: string;
  focused?: boolean;
};

export const TabBarIcon = ({name, focused}: TabBarIconProps) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      if (IS_IOS) {
        scale.value = withTiming(1.2);
      } else {
        scale.value = withTiming(1.1);
      }
    } else {
      scale.value = withTiming(1);
    }
  }, [focused]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      backgroundColor: scale.value === 1 ? '#fff' : 'rgba(243, 84, 89, 0.05)',
    };
  });

  useEffect(() => {}, [focused]);
  return (
    <Animated.View style={[styles.wrapper, animatedStyles]}>
      <Icon
        name={name}
        color={focused ? Color.bg3 : Color.bg4}
        width={24}
        height={24}
      />
    </Animated.View>
  );
};

const styles = createTheme({
  wrapper: {
    marginTop: IS_IOS ? 15 : 10,
    height: 35,
    width: 35,
    backgroundColor: 'rgba(243, 84, 89, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});
