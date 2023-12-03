import React, {useState} from 'react';

import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {Color} from '@app/colors';
import {Icon} from '@app/components/ui/icon';
import {createTheme} from '@app/helpers';
export function Note() {
  const {t} = useTranslation();
  const rotation = useSharedValue(0);
  const height = useSharedValue(0);
  const animatedStylesHeight = useAnimatedStyle(() => {
    return {
      height: height.value,
      overflow: 'hidden',
    };
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });
  const [isOpen, setIsOpen] = useState(false);

  const press = () => {
    setIsOpen(!isOpen);
    rotation.value = isOpen ? withTiming(0) : withTiming(180);
    height.value = isOpen
      ? withTiming(0, {duration: 500})
      : withTiming(1200, {
          duration: 500,
        });
  };
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity activeOpacity={0.8} onPress={press}>
        <View style={styles.button}>
          <Text style={styles.noteText}>{t('note')}</Text>
          <Animated.View style={animatedStyle}>
            <Icon name="row" width={20} height={20} />
          </Animated.View>
        </View>
      </TouchableOpacity>
      <Animated.View style={animatedStylesHeight}>
        <View style={styles.item}>
          <Icon name="star" style={styles.right} width={12} height={12} />
          <Text style={styles.itemText}>{t('note1')}</Text>
        </View>
        <View style={styles.item}>
          <Icon name="star" style={styles.right} width={12} height={12} />
          <Text style={styles.itemText}>{t('note2')}</Text>
        </View>
        <View style={styles.item}>
          <Icon name="star" style={styles.right} width={12} height={12} />
          <Text style={styles.itemText}>{t('note3')}</Text>
        </View>
        <View style={styles.item}>
          <Icon name="star" style={styles.right} width={12} height={12} />
          <Text style={styles.itemText}>{t('note4')}</Text>
        </View>
        <View style={styles.item}>
          <Icon name="star" style={styles.right} width={12} height={12} />
          <Text style={styles.itemText}>{t('note5')}</Text>
        </View>
        <View style={styles.item}>
          <Icon name="star" style={styles.right} width={12} height={12} />
          <Text style={styles.itemText}>{t('note6')}</Text>
        </View>
        <View style={styles.item}>
          <Icon name="star" style={styles.right} width={12} height={12} />
          <Text style={styles.itemText}>{t('note7')}</Text>
        </View>
        <View style={styles.item}>
          <Icon name="star" style={styles.right} width={12} height={12} />
          <Text style={styles.itemText}>{t('note8')}</Text>
        </View>
        <View style={styles.item}>
          <Icon name="star" style={styles.right} width={12} height={12} />
          <Text style={styles.itemText}>{t('note9')}</Text>
        </View>
        <View style={styles.item}>
          <Icon name="star" style={styles.right} width={12} height={12} />
          <Text style={styles.itemText}>{t('note10')}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = createTheme({
  wrapper: {
    marginBottom: 20,
    backgroundColor: Color.bg1,
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 0,
  },
  button: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  noteText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 15,
    paddingLeft: 20,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  right: {
    marginRight: 10,
    marginTop: 3,
  },
  itemText: {
    paddingRight: 20,
    fontFamily: 'Rubik-Regular',
  },
});
