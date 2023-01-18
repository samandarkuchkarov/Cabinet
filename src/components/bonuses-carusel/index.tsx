import React from 'react';

import {useTranslation} from 'react-i18next';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  // View,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';

import {replaceTags} from '@app/helpers/replace-tags';
import {useTypedSelector} from '@app/hooks';
import {bonusesProps} from '@app/store/reducers/user';

import {styles} from './styles';
const ITEM_WIDTH = 302;

export function BonusesCarusel() {
  const {i18n} = useTranslation();
  const allBonuses = useTypedSelector(state => state.user.bonuses);
  const bonuses = allBonuses.filter(
    i =>
      i.type === 'Акции' &&
      (i.name === 'fiz' || i.name === 'all' || i.name === 'both'),
  );
  const SLIDER_WIDTH = useWindowDimensions().width;
  const renderItem = ({item}: {item: bonusesProps}) => {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.wrapper}>
          <FastImage
            style={styles.item}
            source={{
              uri: `https://serv.comnet.uz/storage/${item.pic}`,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <View style={styles.textBlock}>
            <Text style={styles.title}>
              {i18n.language === 'ru' ? item.title_ru : item.title_uz}
            </Text>
            <Text numberOfLines={3} style={styles.desc}>
              {i18n.language === 'ru'
                ? replaceTags(item.short_text_ru)
                : replaceTags(item.short_text_uz)}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return bonuses ? (
    <View style={styles.list}>
      <Carousel
        layout={'default'}
        data={bonuses}
        useScrollView={true}
        firstItem={3}
        initialScrollIndex={3}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        decelerationRate={0.2}
        loopClonesPerSide={4}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        renderItem={renderItem}
        loop={true}
      />
    </View>
  ) : (
    <></>
  );
}
