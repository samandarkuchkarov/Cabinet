import React from 'react';

import {RouteProp, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import {Color} from '@app/colors';
import {Footer} from '@app/components/footer';
import {Note} from '@app/components/note';
import {Button} from '@app/components/ui/button';
import {Icon} from '@app/components/ui/icon';
import {convertToCurrency, createTheme} from '@app/helpers';
import {TabParamList} from '@app/types';

export function TariffDetail() {
  const {t} = useTranslation();
  const router = useRoute<RouteProp<TabParamList, 'tariffDetail'>>();
  const params = router.params;
  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>{params?.name}</Text>
      {params ? (
        <View style={styles.card}>
          <AnimatedCircularProgress
            size={200}
            width={14}
            key={params.mainSpeed}
            backgroundWidth={10}
            fill={params.mainSpeed}
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
          <Text style={styles.placeHolder}>{params.secondSpeedDesc}</Text>
          <Text style={styles.info}>
            {params.secondSpeed + ' '}
            {t('mb/s')}
          </Text>
          <Text style={styles.placeHolder}>{params.tasixDesc}</Text>
          <Text style={styles.info}>
            {params.tasixSpeed} {t('mb/s')}
          </Text>
          <Text style={styles.placeHolder}>{t('traffic')}:</Text>
          <Text style={styles.info}>Безлимитный</Text>
          <Text style={styles.price}>
            {convertToCurrency(params.monthly)} {t('sum')}
          </Text>
          <Button
            style={styles.mainlyBtn}
            fontFamily="Rubik-Regular"
            title="connect"
            onPress={() => {}}
          />
        </View>
      ) : (
        <></>
      )}
      <View style={styles.redArea}>
        <Icon name="star" width={22} height={22} />
        <Text style={styles.alerts}>{t('speedAlert')}</Text>
      </View>
      <View style={styles.redArea}>
        <Icon name="influence" width={24} height={24} />
        <Text style={styles.alerts}>{t('bonusAlert')}</Text>
      </View>
      <Note />
      <Footer />
    </ScrollView>
  );
}

const styles = createTheme({
  wrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fafafa',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Rubik-Bold',
    color: Color.textBase,
    fontSize: 22,
    marginTop: 30,
  },
  card: {
    width: '100%',
    borderRadius: 9,
    backgroundColor: Color.bg1,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.24,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainSpeedText: {
    fontFamily: 'Rubik-Regular',
    color: Color.textBase,
    fontSize: 80,
  },
  speed: {
    fontSize: 20,
    fontFamily: 'Rubik-Regular',
  },
  placeHolder: {
    color: Color.placeHolder,
    marginBottom: 5,
    fontFamily: 'Rubik-Regular',
  },
  price: {
    fontFamily: 'Rubik-Regular',
    color: Color.textError,
    fontSize: 22,
    marginTop: 20,
  },
  info: {
    fontFamily: 'Rubik-Regular',
    marginBottom: 10,
    fontSize: 16,
  },
  mainlyBtn: {
    backgroundColor: Color.bg3,
    marginTop: 20,
    marginBottom: 5,
  },
  redArea: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF2F2',
    marginTop: 20,
    borderRadius: 10,
  },
  alerts: {
    fontFamily: 'Rubik-Regular',
    marginTop: 20,
    textAlign: 'center',
  },
});
