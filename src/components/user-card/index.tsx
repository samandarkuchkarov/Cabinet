/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import {Color, getColor} from '@app/colors';
import {Button} from '@app/components/ui/button';
import {Icon} from '@app/components/ui/icon';
import {
  convertToCurrency,
  convertToFullDate,
  getLastDays,
  getNextPay,
  getUserStatus,
  parseTariff,
  parseTariffProps,
} from '@app/helpers';
import {useTypedNavigation, useTypedSelector} from '@app/hooks';
import {PhoneEditModal} from '@app/modals/phone-edit-modal';
// import {allTariffsProps} from '@app/store/reducers/user';

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
    credit,
    tpName,
    allTariffs,
    tpId,
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
    state.user.credit,
    state.user.tpName,
    state.user.allTariffs,
    state.user.tpId,
  ]);

  const status = getUserStatus(disable, internetStatus);

  const [phoneModal, setPhoneModal] = useState(false);

  const navigation = useTypedNavigation();
  const [currentTariff, setCurrentTariff] = useState<parseTariffProps>();

  const speed = currentTariff?.mainSpeed;

  useEffect(() => {
    if (allTariffs.length && tpId) {
      let tariff = allTariffs.filter(i => i.tpId === tpId)[0];
      if (tariff) {
        let tariffData: parseTariffProps = parseTariff(tariff.comments);
        setCurrentTariff(tariffData);
      }
    }
  }, [allTariffs, tpId]);

  return (
    <>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{t('cardAbon')}</Text>
        <View style={styles.card}>
          <View style={styles.userData}>
            <Icon name="user" width={60} height={60} />
            <Text style={styles.fio}>{fio}</Text>
          </View>
          <View style={styles.info}>
            <View>
              <View style={styles.top10}>
                <Text style={styles.placeHolder}>{t('numberContract')}:</Text>
                <Text style={styles.infoItemText}>№ {contractId}</Text>
              </View>
              <View style={styles.top10}>
                <Text style={styles.placeHolder}>{t('city')}:</Text>
                <Text style={styles.infoItemText}>{city}</Text>
              </View>
              <View style={styles.top10}>
                <Text style={styles.placeHolder}>{t('street')}:</Text>
                <Text style={styles.infoItemText}>{addressStreet}</Text>
              </View>
            </View>
            <View>
              <View style={styles.top10}>
                <Text style={styles.placeHolder}>{t('login')}:</Text>
                <Text style={styles.infoItemText}>{login}</Text>
              </View>
              <View style={styles.top10}>
                <Text style={styles.placeHolder}>{t('phoneNumber')}:</Text>
                <TouchableWithoutFeedback onPress={() => setPhoneModal(true)}>
                  <Text style={styles.infoItemText}>
                    {cellPhone[0]}

                    <Icon
                      onPress={() => {
                        setPhoneModal(true);
                      }}
                      name="edit"
                      width={17}
                      height={17}
                    />
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.top10}>
                <Text style={styles.placeHolder}>{t('flatAdress')}</Text>
                <Text style={styles.infoItemText}>
                  {addressBuild}/{addressFlat}
                </Text>
              </View>
              <View />
            </View>
          </View>
          <View style={styles.sendError}>
            <Icon name="alert" width={20} height={20} />
            <View style={styles.borderSendError}>
              <Text style={styles.sendErrorText}>{t('sendError')}</Text>
            </View>
          </View>
          <Button
            style={styles.changeBtn}
            iconWidth={25}
            onPress={() => {
              navigation.navigate('passwordChange');
            }}
            fontFamily="Rubik-Regular"
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
              <Text style={styles.little}> {t('sum')}</Text>
            </Text>
          </View>
          <View style={styles.smallCard2}>
            <View>
              <Text style={styles.placeHolder}>{t('bonus')}:</Text>
              <View style={styles.border}>
                <Text style={styles.more}>{t('more')}:</Text>
              </View>
            </View>
            <AnimatedCircularProgress
              size={45}
              width={5}
              key={reduction}
              backgroundWidth={2}
              fill={reduction}
              tintColor="#E5474C"
              tintColorSecondary="#E5474C"
              backgroundColor="#BFBFBF"
              arcSweepAngle={240}
              rotation={240}
              lineCap="round">
              {a => <Text style={styles.bunus}>{a.toFixed(0)}%</Text>}
            </AnimatedCircularProgress>
          </View>
        </View>
        <View style={styles.card}>
          <View>
            <Text style={styles.placeHolder}>{t('nextPay')}</Text>
            <Text style={styles.redPrice}>
              {convertToCurrency(getNextPay(monthFee, reduction, deposit))}{' '}
              {t('sum')}
            </Text>
          </View>
          <View style={styles.nextPayInfo}>
            <View>
              <Text style={styles.placeHolder}>{t('nextPayDate')}</Text>
              <Text style={styles.infoItemText}>
                {convertToFullDate(internetActivate)}
              </Text>
            </View>
            <View>
              <Text style={styles.placeHolder}>{t('credit')}</Text>
              <Text style={styles.infoItemText}>{credit}</Text>
            </View>
          </View>
          <Button
            style={styles.mainlyBtn}
            title="payBalance"
            fontFamily="Rubik-Regular"
            onPress={() => {}}
          />
          <Button
            style={styles.secondlyBtn}
            textColor={getColor(Color.textBase)}
            fontFamily="Rubik-Regular"
            title="getCredit"
            onPress={() => {}}
          />
        </View>
        <Text style={styles.title}>{t('yourTariff')}</Text>
        <View style={styles.card}>
          <Text style={styles.tariffName}>{tpName}</Text>
          {currentTariff && speed ? (
            <View style={styles.mainSpeed}>
              <AnimatedCircularProgress
                size={200}
                width={14}
                key={speed}
                backgroundWidth={10}
                fill={speed}
                tintColor="#B6DB26"
                tintColorSecondary="#B6DB26"
                backgroundColor="#BFBFBF"
                arcSweepAngle={240}
                rotation={240}
                lineCap="round">
                {a => (
                  <>
                    <Text style={styles.mainSpeedText}>{a.toFixed(0)}</Text>
                    <Text style={styles.speed}>{t('mb/s')}</Text>
                  </>
                )}
              </AnimatedCircularProgress>
              <Text style={styles.mainSpeedDesc}>
                {currentTariff.mainSpeedDesc}
              </Text>
              <View style={styles.listSpeed}>
                <View style={styles.itemSpeed}>
                  <Text style={styles.itemSpeedPlaceholder}>
                    {currentTariff.secondSpeedDesc}:
                  </Text>
                  <Text style={styles.itemSpeedText}>
                    {currentTariff.secondSpeed} {t('mb/s')}
                  </Text>
                </View>
                <View style={styles.itemSpeed}>
                  <Text style={styles.itemSpeedPlaceholder}>
                    {currentTariff.tasixDesc}:
                  </Text>
                  <Text style={styles.itemSpeedText}>
                    {currentTariff.tasixSpeed} {t('mb/s')}
                  </Text>
                </View>
                <View style={styles.itemSpeed}>
                  <Text style={styles.itemSpeedPlaceholder}>
                    {t('traffic')}
                  </Text>
                  <Text style={styles.itemSpeedText}>Безлимитный</Text>
                </View>
                <View style={styles.itemSpeed}>
                  <Text style={styles.itemSpeedPlaceholder}>
                    {t('subscriptionFee')}
                  </Text>
                  <Text style={styles.monthFee}>
                    {convertToCurrency(monthFee)} {t('sum')}
                  </Text>
                </View>
                <View style={styles.itemSpeedBig}>
                  <Text style={styles.itemSpeedPlaceholder}>
                    {t('subscriptionEndTime')}
                  </Text>
                  <Text style={styles.itemSpeedText}>
                    {convertToFullDate(internetActivate)}
                  </Text>
                </View>
              </View>
              <Button
                style={styles.mainlyBtn}
                title="more"
                fontFamily="Rubik-Regular"
                onPress={() => {}}
              />
              <Button
                style={styles.secondlyBtn}
                textColor={getColor(Color.textBase)}
                fontFamily="Rubik-Regular"
                title="change"
                onPress={() => {}}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
        <Text style={styles.descSpeed}>
          * Скорость выше 100 Мбит/с доступна по технологии GPON и при наличии
          технической возможности по FTTx
        </Text>
      </View>
      <PhoneEditModal
        modalVisible={phoneModal}
        setModalVisible={setPhoneModal}
      />
    </>
  );
}
