import React, {useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';

import {Color} from '@app/colors';
import {TariffCard} from '@app/components/tariff-card';
import {createTheme, parseTariff, parseTariffProps} from '@app/helpers';
import {useAllTariffs, useCurrentTariff, useTypedSelector} from '@app/hooks';

export function Tariffs() {
  const {t} = useTranslation();
  useCurrentTariff();
  useAllTariffs();
  const [allTariffs, tpId] = useTypedSelector(state => [
    // state.user.tpName,
    state.user.allTariffs,
    state.user.tpId,
  ]);
  const [currentTariff, setCurrentTariff] = useState<parseTariffProps>();
  const [allTariffsList, setAllTariffsList] = useState<parseTariffProps[]>();

  const [selectedTariff, setSelectedTariff] = useState<parseTariffProps>();
  const [buyModalVisible, setBuyModalVisible] = useState<boolean>();

  useEffect(() => {
    if (allTariffs.length && tpId) {
      let tariff = allTariffs.filter(i => i.tpId === tpId)[0];
      if (tariff) {
        let tariffData: parseTariffProps = parseTariff(tariff.comments, tariff);
        setCurrentTariff(tariffData);
        setAllTariffsList(
          allTariffs
            .filter(item => item.tpId !== tpId)
            .map(item => {
              return parseTariff(item.comments, item);
            }),
        );
      }
    }
  }, [allTariffs, tpId]);

  const changePress = (tariff: parseTariffProps) => {
    setSelectedTariff(tariff);
  };

  return (
    <ScrollView style={styles.mainWrapper}>
      {currentTariff ? (
        <View>
          <Text style={styles.title}>{t('yourTariff')}</Text>
          <TariffCard current currentTariff={currentTariff} />
        </View>
      ) : (
        <></>
      )}
      {allTariffsList ? (
        <View>
          <Text style={styles.title}>{t('tariffPlan')}</Text>
          {allTariffsList.map(item => (
            <TariffCard
              changePress={changePress}
              key={item.name}
              currentTariff={item}
            />
          ))}
        </View>
      ) : (
        <></>
      )}
    </ScrollView>
  );
}

const styles = createTheme({
  mainWrapper: {
    backgroundColor: '#fafafa',
    flex: 1,
    padding: 20,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Rubik-Bold',
    color: Color.textBase,
    fontSize: 22,
    marginTop: 30,
  },
});
