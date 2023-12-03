import React, {useEffect, useRef, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {
  SectionList,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import {Color} from '@app/colors';
import {Icon} from '@app/components/ui/icon';
import {convertMethod, createTheme} from '@app/helpers';
import {useTypedSelector} from '@app/hooks';
import {useFees} from '@app/hooks/use-fees';
import {usePayments} from '@app/hooks/use-payments';
import {FilterModal} from '@app/modals/filter-modal';
import {feeProps} from '@app/store/reducers/user';

export function Wallet() {
  useFees();
  usePayments();
  const {t} = useTranslation();
  const [fees, payments] = useTypedSelector(state => [
    state.user.fees,
    state.user.payments,
  ]);
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState<{title: string; data: feeProps[]}[]>([
    {title: '', data: []},
  ]);
  const allData = useRef<{title: string; data: feeProps[]}[]>([]);

  const width = useWindowDimensions().width;
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>();

  useEffect(() => {
    if (fees.length && payments.length) {
      let all: feeProps[] = [...fees, ...payments];

      let dates: string[] = [];
      all.forEach(item => {
        let month = `${new Date(item.datetime).getFullYear()}.${new Date(
          item.datetime,
        ).getMonth()}`;

        if (!dates.includes(month)) {
          dates.push(month);
        }
      });
      let result: {title: string; data: feeProps[]}[] = [];
      dates.forEach(item => {
        let inMonth = all.filter(
          i =>
            `${new Date(i.datetime).getFullYear()}.${new Date(
              i.datetime,
            ).getMonth()}` === item,
        );
        result.push({
          title: item,
          data: inMonth,
        });
      });
      function compare(
        a: {title: string; data: feeProps[]},
        b: {title: string; data: feeProps[]},
      ) {
        if (b.title < a.title) {
          return -1;
        }
        if (b.title > a.title) {
          return 1;
        }
        return 0;
      }

      result.sort(compare);
      allData.current = result;
      setList(result);
    }
  }, [fees, payments]);

  const renderItem = ({item}: {item: feeProps}) => {
    return (
      <View style={styles.itemWrapper}>
        <View style={[styles.item, {width: width - 40}]}>
          <View style={styles.first}>
            <Text style={styles.status}>
              {item.extId ? t('payment') : t('write-off')}
            </Text>
            <Text>
              {item.datetime.replaceAll(' ', '  ').replaceAll('-', '. ')}
            </Text>
          </View>
          <View>
            <Text style={styles.placeHolder}>{t('desc')}</Text>
            <Text>{item.dsc}</Text>
          </View>
          <View style={styles.last}>
            {typeof item.extId === 'undefined' ? (
              <View>
                <Text style={styles.placeHolder}>{t('type')}:</Text>
                <Text>{item.innerDescribe ? item.innerDescribe : '-'}</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.placeHolder}>{t('byHelp')}:</Text>
                <Text>{convertMethod(item.method)}</Text>
              </View>
            )}

            <View>
              <Text style={styles.placeHolder}>{t('summa')}</Text>
              <Text>{item.sum}</Text>
            </View>
            <View style={styles.opacity}>
              <Text style={styles.placeHolder}>{t('summa')}</Text>
              <Text>{item.sum}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => {
    return (
      <View style={styles.wrapperHeader}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (selectedYear) {
      const filtered = allData.current.filter(item => {
        return item.data.filter(
          i =>
            new Date(i.datetime).getFullYear() === selectedYear &&
            (selectedMonths.length
              ? selectedMonths.includes(new Date(i.datetime).getMonth())
              : true),
        ).length;
      });
      setList(filtered);
    }
  }, [selectedMonths, selectedYear]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.balance}>{t('balanceShot')}</Text>
      <SectionList
        sections={list}
        keyExtractor={(item, index) => item.datetime + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.absoluteItem}>
        <Icon height={22} width={22} name="filter" />
      </TouchableOpacity>
      <FilterModal
        setVisible={setVisible}
        visible={visible}
        setSelectedYear={setSelectedYear}
        setSelectedMonths={setSelectedMonths}
      />
    </View>
  );
}

const styles = createTheme({
  wrapper: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#faf7f7',
    zIndex: 3,
    width: '100%',
    position: 'relative',
  },
  balance: {
    color: Color.textBase,
    fontSize: 22,
    fontFamily: 'Rubik-Medium',
    marginTop: 20,
    marginBottom: 10,
  },
  header: {
    backgroundColor: '#eeeeee',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  headerText: {
    color: '#A5A5A5',
    fontSize: 17,
    fontFamily: 'Rubik-Medium',
  },
  wrapperHeader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.bg1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    position: 'relative',
  },
  item: {
    padding: 20,
  },
  status: {
    fontSize: 20,
    fontFamily: 'Rubik-Medium',
  },
  first: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  placeHolder: {
    color: Color.placeHolder,
    marginVertical: 5,
  },
  last: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  opacity: {
    opacity: 0,
  },
  absoluteItem: {
    position: 'absolute',
    width: 50,
    height: 50,
    zIndex: 2,
    backgroundColor: '#F35459',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
