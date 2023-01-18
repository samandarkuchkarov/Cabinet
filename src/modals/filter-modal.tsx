import React, {useState} from 'react';

import {useTranslation} from 'react-i18next';
import {
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {Color, getColor} from '@app/colors';
import {Button} from '@app/components/ui/button';
import {SelectedCycle, UnSelectedCycle} from '@app/components/ui/cycle';
import {createTheme} from '@app/helpers';

// import {useTypedRoute} from '@app/hooks/use-typed-route';

export function FilterModal({
  setSelectedYear,
  setSelectedMonths,
  visible,
  setVisible,
}: {
  setSelectedYear: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSelectedMonths: React.Dispatch<React.SetStateAction<number[] | []>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {t} = useTranslation();
  const width = useWindowDimensions().width;
  const [openDropDown, setOpenDropDown] = useState(false);
  const [valueDropDown, setValueDropDown] = useState(() => {
    return new Date().getFullYear();
  });
  const [itemsDropDown, setItemsDropDown] = useState(() => {
    let currentYear = new Date().getFullYear();
    let result = [];
    for (let i = currentYear; i > currentYear - 10; i--) {
      result.push({label: i + '', value: i});
    }
    return result;
  });
  const [months, setMonths] = useState([
    {name: t('jan'), pressed: false, value: 0},
    {name: t('feb'), pressed: false, value: 1},
    {name: t('march'), pressed: false, value: 2},
    {name: t('april'), pressed: false, value: 3},
    {name: t('may'), pressed: false, value: 4},
    {name: t('june'), pressed: false, value: 5},
    {name: t('july'), pressed: false, value: 6},
    {name: t('aug'), pressed: false, value: 7},
    {name: t('sept'), pressed: false, value: 8},
    {name: t('oct'), pressed: false, value: 9},
    {name: t('nov'), pressed: false, value: 10},
    {name: t('dec'), pressed: false, value: 11},
  ]);

  const select = (i: {name: string; pressed: boolean}) => {
    setOpenDropDown(false);
    let newMap = months.map(item => {
      let New = item;
      if (i.name === item.name) {
        New.pressed = !item.pressed;
      }
      return New;
    });
    setMonths(newMap);
  };

  const reset = () => {
    setMonths(i => {
      let New = i.map(item => {
        item.pressed = false;
        return item;
      });
      return New;
    });
    setValueDropDown(() => {
      return new Date().getFullYear();
    });
  };

  const submit = () => {
    setSelectedYear(valueDropDown);
    let selectedYear = months.filter(i => i.pressed).map(i => i.value);
    setSelectedMonths(selectedYear);
    setVisible(false);
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={() => setVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.wrapper}>
          <TouchableWithoutFeedback onPress={() => setOpenDropDown(false)}>
            <View style={styles.content}>
              <Text style={styles.title}>{t('filter')}</Text>
              <View style={styles.monthWrapper}>
                {months.map(i => {
                  return (
                    <TouchableWithoutFeedback
                      onPress={() => select(i)}
                      key={i.name}>
                      <View
                        style={[styles.main, {width: (width - 110) / 3 - 5}]}>
                        <View
                          style={[
                            styles.month,
                            // eslint-disable-next-line react-native/no-inline-styles
                            {
                              width: (width - 110) / 3 - 5,
                              opacity: i.pressed ? 1 : 0.3,
                            },
                          ]}>
                          <Text style={styles.monthText}>{i.name}</Text>
                        </View>
                        {i.pressed ? <SelectedCycle /> : <UnSelectedCycle />}
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
              <DropDownPicker
                open={openDropDown}
                value={valueDropDown}
                items={itemsDropDown}
                setOpen={setOpenDropDown}
                setValue={setValueDropDown}
                setItems={setItemsDropDown}
                style={styles.dropDown}
              />
              <View style={styles.btnsWrapper}>
                <Button
                  style={styles.secondlyBtn}
                  textColor={getColor(Color.textBase)}
                  fontFamily="Rubik-Regular"
                  title="reset"
                  onPress={reset}
                />
                <View style={styles.margin} />
                <Button
                  style={styles.mainlyBtn}
                  title="show"
                  fontFamily="Rubik-Regular"
                  onPress={submit}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>

          <View />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = createTheme({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: Color.bg1,
    width: '100%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Rubik-Medium',
    marginBottom: 20,
    marginTop: 5,
  },
  monthWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  month: {
    height: 40,
    backgroundColor: '#F9F9F9',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    zIndex: 1,
  },
  monthText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
  },
  main: {
    zIndex: 3,
  },
  dropDown: {
    backgroundColor: '#F9F9F9',
    marginVertical: 10,
  },
  btn: {
    width: '100%',
  },
  secondlyBtn: {
    backgroundColor: Color.bg1,
    borderColor: Color.textError,
    borderWidth: 2,
    marginTop: 5,
  },
  btnsWrapper: {
    width: '80%',
  },
  mainlyBtn: {
    backgroundColor: Color.bg3,
    marginTop: 20,
    marginBottom: 5,
  },
  margin: {
    marginTop: -10,
  },
});
