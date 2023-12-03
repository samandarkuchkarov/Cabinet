import React from 'react';

import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import {Color, getColor} from '@app/colors';
import {Button} from '@app/components/ui/button';
import {
  convertToCurrency,
  //   convertToFullDate,
  parseTariffProps,
} from '@app/helpers';
import {useTypedNavigation} from '@app/hooks';

import {styles} from './style';

export function TariffCard({
  currentTariff,
  current = false,
  changePress,
}: {
  currentTariff: parseTariffProps;
  current?: boolean;
  changePress?: (tariff: parseTariffProps) => void;
}) {
  const {t} = useTranslation();
  const navigation = useTypedNavigation();
  return (
    <View style={styles.card}>
      <Text style={styles.tariffName}>{currentTariff.name}</Text>
      <View style={styles.mainSpeed}>
        <AnimatedCircularProgress
          size={200}
          width={14}
          key={currentTariff.mainSpeed}
          backgroundWidth={10}
          fill={currentTariff.mainSpeed}
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
        <Text style={styles.mainSpeedDesc}>{currentTariff.mainSpeedDesc}</Text>
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
            <Text style={styles.itemSpeedPlaceholder}>{t('traffic')}</Text>
            <Text style={styles.itemSpeedText}>Безлимитный</Text>
          </View>
          <View style={styles.itemSpeed}>
            <Text style={styles.itemSpeedPlaceholder}>
              {t('subscriptionFee')}
            </Text>
            <Text style={styles.monthFee}>
              {convertToCurrency(currentTariff.monthly)} {t('sum')}
            </Text>
          </View>
        </View>
        <Button
          style={styles.secondlyBtn}
          title="more"
          textColor={getColor(Color.textBase)}
          fontFamily="Rubik-Regular"
          onPress={() => {
            navigation.navigate('homeNavigation', {
              screen: 'tariffDetail',
              params: currentTariff,
            });
          }}
        />
        {current ? (
          <Button
            style={styles.mainlyBtn}
            fontFamily="Rubik-Regular"
            title="change"
            onPress={() => {}}
          />
        ) : (
          <Button
            style={styles.mainlyBtn}
            fontFamily="Rubik-Regular"
            title="connect"
            onPress={() => {
              if (changePress) {
                changePress(currentTariff);
              }
            }}
          />
        )}
      </View>
    </View>
  );
}
