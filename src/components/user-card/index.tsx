/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import {Button} from '@app/components/ui/button';
import {Icon} from '@app/components/ui/icon';
import {
  convertToCurrency,
  convertToFullDate,
  getLastDays,
  getUserStatus,
} from '@app/helpers';
import {useTypedSelector} from '@app/hooks';

import {styles} from './style';

export function UserCard() {
  const {t} = useTranslation();
  const [
    fio,
    city,
    addressStreet,
    addressBuild,
    addressFlat,
    contractId,
    login,
    internetActivate,
    internetStatus,
    disable,
    cellPhone,
    deposit,
    reduction,
    monthFee,
    // monthFee,
    // tpName,
  ] = useTypedSelector(state => [
    state.user.fio,
    state.user.city,
    state.user.addressStreet,
    state.user.addressBuild,
    state.user.addressFlat,
    state.user.contractId,
    state.user.key.login,
    state.user.internetActivate,
    state.user.internetStatus,
    state.user.disable,
    state.user.cellPhone,
    state.user.deposit,
    state.user.reduction,
    state.user.monthFee,
    // state.user.tpName,
  ]);

  const status = getUserStatus(disable, internetStatus);
  const fill = Math.trunc((reduction / monthFee) * 100);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{t('cardAbon')}</Text>
      <View style={styles.card}>
        <View style={styles.userData}>
          <Icon name="user" width={60} height={60} />
          <Text style={styles.fio}>{fio}</Text>
        </View>
        <View style={styles.info}>
          <View>
            <Text style={styles.placeHolder}>{t('numberContract')}:</Text>
            <Text style={styles.infoItemText}>№ {contractId}</Text>
            <Text style={styles.placeHolder}>{t('city')}:</Text>
            <Text style={styles.infoItemText}>{city}</Text>
            <Text style={styles.placeHolder}>{t('street')}:</Text>
            <Text style={styles.infoItemText}>{addressStreet}</Text>
          </View>
          <View>
            <Text style={styles.placeHolder}>{t('login')}:</Text>
            <Text style={styles.infoItemText}>{login}</Text>
            <Text style={styles.placeHolder}>{t('phoneNumber')}:</Text>
            <Text style={styles.infoItemText}>
              {cellPhone[0]} <Icon name="edit" width={17} height={17} />
            </Text>
            <Text style={styles.placeHolder}>{t('flatAdress')}</Text>
            <Text style={styles.infoItemText}>
              {addressBuild}/{addressFlat}
            </Text>
          </View>
        </View>
        <View style={styles.sendError}>
          <Icon name="alert" width={20} height={20} />
          <Text style={styles.sendErrorText}>{t('sendError')}</Text>
        </View>
        <Button
          style={styles.changeBtn}
          iconWidth={25}
          onPress={() => {}}
          iconLeft="changePassword"
          title="changePassword"
        />
      </View>

      <View style={styles.secondCard}>
        <View>
          <Text style={styles.currentStatus}>{t('currentStatus')}</Text>
          <Text style={styles.days}>
            {t('lastDays')} {getLastDays(internetActivate)}
          </Text>
          <Text style={styles.days}>
            ({convertToFullDate(internetActivate)})
          </Text>
        </View>
        <View>
          <View
            style={[
              styles.status,
              {backgroundColor: status !== 'Actived' ? '#FFA6A6' : '#CBFFB3'},
            ]}>
            <Text
              style={[
                styles.statusText,
                {color: status !== 'Actived' ? '#fff' : '#43B70D'},
              ]}>
              {t(status)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.smallCard}>
          <Text style={styles.placeHolder}>{t('balance')}</Text>
          <Text style={styles.balance}>
            {convertToCurrency(deposit)}
            <Text style={styles.little}> сум</Text>
          </Text>
        </View>
        <View style={styles.smallCard2}>
          <View>
            <Text style={styles.placeHolder}>{t('bonus')}:</Text>
            <Text style={styles.more}>{t('more')}:</Text>
          </View>
          <AnimatedCircularProgress
            size={45}
            width={5}
            key={fill}
            backgroundWidth={1}
            fill={fill}
            tintColor="#E5474C"
            tintColorSecondary="#E5474C"
            backgroundColor="#BFBFBF"
            arcSweepAngle={240}
            rotation={240}
            lineCap="round">
            {() => <Text style={styles.bunus}>{fill}%</Text>}
          </AnimatedCircularProgress>
        </View>
      </View>
    </View>
  );
}
