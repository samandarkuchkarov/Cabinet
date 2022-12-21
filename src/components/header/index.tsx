import React from 'react';

import {useTranslation} from 'react-i18next';
import {Linking, TouchableWithoutFeedback, View} from 'react-native';

import {TextRubicBold} from '@app/components/ui/text-rubic-bold';
import {LangRu, LangUzb, Logo} from '@app/variables';

import {styles} from './style';

export function Header() {
  const {i18n} = useTranslation();

  const changeLanguage = () => {
    let value: string = 'ru';
    if (i18n.language === 'ru') {
      value = 'uz';
    }

    i18n.changeLanguage(value).catch(err => console.warn(err));
  };

  return (
    <View style={styles.shadowBottom}>
      <View style={styles.wrapper}>
        <View style={styles.leftSide}>
          <TouchableWithoutFeedback>
            <Logo width={80} style={styles.logo} height={40} />
          </TouchableWithoutFeedback>
          <View style={styles.line} />
          <View>
            <TouchableWithoutFeedback
              onPress={() => Linking.openURL('tel:+998 71 205 88 77')}>
              <TextRubicBold style={styles.phone}>71 205-88-77</TextRubicBold>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => Linking.openURL('tel:+998 71 205 88 88')}>
              <TextRubicBold style={styles.phone}>71 205-88-88</TextRubicBold>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={changeLanguage}>
          {i18n.language === 'ru' ? (
            <LangRu width={60} height={40} />
          ) : (
            <LangUzb width={60} height={40} />
          )}
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
