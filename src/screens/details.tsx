import React, {useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';

import {Color} from '@app/colors';
import {Charts} from '@app/components/chart';
import {formatBytes, formatDate} from '@app/helpers';
import {createTheme} from '@app/helpers';
import {useSession, useSessionDetail, useTypedSelector} from '@app/hooks';
import {sessionProps} from '@app/store/reducers/user';
type daysProps = {
  sent: number;
  recv: number;
  duration: number;
  sum: number;
};

export function Detail() {
  useSession();
  useSessionDetail();
  const {t} = useTranslation();
  const sessions = useTypedSelector(state => state.user.sessions);
  const [todayData, setTodayData] = useState<sessionProps>();
  const [yesterdayData, setYesterdayData] = useState<sessionProps>();
  const [weekData, setWeekData] = useState<daysProps>();
  const [monthData, setMonthData] = useState<daysProps>();
  const [allData, setAllData] = useState<daysProps>();

  function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter(Boolean)
      .join(':');
  }

  useEffect(() => {
    if (sessions.length) {
      const todayTime = new Date();
      const today = sessions.filter(item => {
        return formatDate(todayTime) === formatDate(new Date(item.start));
      });
      if (today[0]) {
        setTodayData(today[0]);
      }

      const yesterdayTime = new Date();
      const yesterday = sessions.filter(item => {
        return formatDate(yesterdayTime) === formatDate(new Date(item.start));
      });
      if (yesterday[0]) {
        setYesterdayData(yesterday[0]);
      }

      const oneDay = 24 * 60 * 60 * 1000;
      const week = {duration: 0, recv: 0, sent: 0, sum: 0};
      for (let i = 1; i < 8; i++) {
        const checkedDay = new Date(new Date().getTime() - i * oneDay);

        const dayData = sessions.filter(item => {
          return formatDate(checkedDay) === formatDate(new Date(item.start));
        });
        if (dayData[0]) {
          week.duration = dayData[0].durationSec + week.duration;
          week.sent = dayData[0].sent + week.sent;
          week.recv = dayData[0].recv + week.recv;
          week.sum = dayData[0].sum + week.sum;
        }
      }
      if (week.recv || week.duration || week.sent || week.sum) {
        setWeekData(week);
      }

      const month = {duration: 0, recv: 0, sent: 0, sum: 0};

      for (let i = 1; i < 30; i++) {
        const checkedDay = new Date(new Date().getTime() - i * oneDay);

        const dayData = sessions.filter(item => {
          return formatDate(checkedDay) === formatDate(new Date(item.start));
        });
        if (dayData[0]) {
          month.duration = dayData[0].durationSec + month.duration;
          month.sent = dayData[0].sent + month.sent;
          month.recv = dayData[0].recv + month.recv;
          month.sum = dayData[0].sum + month.sum;
        }
      }
      if (month.recv || month.duration || month.sent || month.sum) {
        setMonthData(month);
      }

      const all = {duration: 0, recv: 0, sent: 0, sum: 0};
      for (let i = 0; i < sessions.length; i++) {
        all.duration = sessions[i].durationSec + all.duration;
        all.sent = sessions[i].sent + all.sent;
        all.recv = sessions[i].recv + all.recv;
        all.sum = sessions[i].sum + all.sum;
      }
      setAllData(all);
    }
  }, [sessions]);

  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>{t('statistics')}</Text>
      <View style={styles.card}>
        <View style={styles.item}>
          <Text style={styles.itemText}>IP:</Text>
          <Text style={styles.itemText}>100. 65. 88. 251</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>CID:</Text>
          <Text style={styles.itemText}>123456789123</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Длительность:</Text>
          <Text style={styles.itemText}>+1 06:35:12</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>Отправлено:</Text>
          <Text style={styles.itemText}>1.65 GB</Text>
        </View>
      </View>
      <Text style={styles.title}>{t('period')}</Text>
      {todayData ? (
        <View>
          <Text style={styles.cardTitle}>{t('today')}</Text>
          <View style={styles.card}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('duration')}</Text>
              <Text style={styles.itemText}>{todayData.duration}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('received')}</Text>
              <Text style={styles.itemText}>{formatBytes(todayData.recv)}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('Отправлено')}</Text>
              <Text style={styles.itemText}>{formatBytes(todayData.sent)}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('Сумма')}</Text>
              <Text style={styles.itemText}>{todayData.sum}</Text>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      {yesterdayData ? (
        <View>
          <Text style={styles.cardTitle}>{t('yesterday')}</Text>
          <View style={styles.card}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('duration')}</Text>
              <Text style={styles.itemText}>{yesterdayData.duration}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('received')}</Text>
              <Text style={styles.itemText}>
                {formatBytes(yesterdayData.recv)}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('Отправлено')}</Text>
              <Text style={styles.itemText}>
                {formatBytes(yesterdayData.sent)}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('Сумма')}</Text>
              <Text style={styles.itemText}>{yesterdayData.sum}</Text>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      {weekData ? (
        <View>
          <Text style={styles.cardTitle}>{t('week')}</Text>
          <View style={styles.card}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('duration')}</Text>
              <Text style={styles.itemText}>
                {formatTime(weekData.duration)}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('received')}</Text>
              <Text style={styles.itemText}>{formatBytes(weekData.recv)}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('Отправлено')}</Text>
              <Text style={styles.itemText}>{formatBytes(weekData.sent)}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('Сумма')}</Text>
              <Text style={styles.itemText}>{weekData.sum}</Text>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      {monthData ? (
        <View>
          <Text style={styles.cardTitle}>{t('month')}</Text>
          <View style={styles.card}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('duration')}</Text>
              <Text style={styles.itemText}>
                {formatTime(monthData.duration)}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('received')}</Text>
              <Text style={styles.itemText}>{formatBytes(monthData.recv)}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('Отправлено')}</Text>
              <Text style={styles.itemText}>{formatBytes(monthData.sent)}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('Сумма')}</Text>
              <Text style={styles.itemText}>{monthData.sum}</Text>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      {allData ? (
        <View style={styles.infoContainer}>
          <Text style={styles.cardTitle}>{t('allSeassions')}</Text>
          <View style={styles.card}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('duration')}</Text>
              <Text style={styles.itemText}>
                {formatTime(allData.duration)}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('received')}</Text>
              <Text style={styles.itemText}>{formatBytes(allData.recv)}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('Отправлено')}</Text>
              <Text style={styles.itemText}>{formatBytes(allData.sent)}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>{t('Сумма')}</Text>
              <Text style={styles.itemText}>{allData.sum}</Text>
            </View>
          </View>
          <Charts />
        </View>
      ) : (
        <></>
      )}
    </ScrollView>
  );
}

const styles = createTheme({
  wrapper: {
    padding: 20,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Rubik-Bold',
    color: Color.textBase,
    fontSize: 22,
    marginTop: 30,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    borderRadius: 9,
    backgroundColor: Color.bg1,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.24,

    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7.5,
  },
  itemText: {
    fontFamily: 'Rubik-Regular',
  },
  cardTitle: {
    fontFamily: 'Rubik-Medium',
    marginBottom: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
});
