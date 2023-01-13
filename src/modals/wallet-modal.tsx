import React, {Dispatch, SetStateAction, useRef} from 'react';

import {t} from 'i18next';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  findNodeHandle,
} from 'react-native';

import {Color} from '@app/colors';
// import {TabButton} from '@app/components/ui/tab-button';
import {Icon} from '@app/components/ui/icon';
import {createTheme} from '@app/helpers';
import {IS_IOS} from '@app/variables';

import {BottomModalWrapper} from './bottom-modal-wrapper';

export function WalletModal({
  modalVisible,
  setModalVisible,
  activeTab,
  setActiveTab,
}: {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const reactTag = useRef<number | null>(null);

  const close = (e: GestureResponderEvent) => {
    if (e.nativeEvent.target !== reactTag.current) {
      setModalVisible(false);
    }
  };
  return (
    <BottomModalWrapper
      setModalVisible={setModalVisible}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modalVisible={modalVisible}>
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.modalWrapper}>
          <View
            ref={ref => {
              reactTag.current = findNodeHandle(ref);
            }}
            style={styles.whiteBlock}>
            <TouchableOpacity activeOpacity={0.7}>
              <View style={styles.button}>
                <View style={styles.btnTop}>
                  <Icon name="bePlus" width={25} height={25} />
                  <Text style={styles.titleBtn}>{t('bePlus')}</Text>
                </View>
                <Text style={styles.desc}>{t('bePlusDesc')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <View style={styles.button}>
                <View style={styles.btnTop}>
                  <Icon name="skidkaParner" width={25} height={25} />
                  <Text style={styles.titleBtn}>{t('skidkaPartner')}</Text>
                </View>
                <Text style={styles.desc}>{t('skidkaPartnerDesc')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BottomModalWrapper>
  );
}

const styles = createTheme({
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 2,
  },
  tabInvisibleBtns: {
    height: IS_IOS ? 80 : 60,
    width: '100%',
    flexDirection: 'row',
  },
  btns: {
    height: IS_IOS ? 80 : 60,
    width: '20%',
  },
  whiteBlock: {
    padding: 20,
    paddingTop: 27,
    backgroundColor: Color.bg1,
    borderTopEndRadius: 21,
    borderTopStartRadius: 21,
  },
  button: {
    padding: 15,
    borderRadius: 9,
    backgroundColor: Color.textFieldBack,
    marginTop: 10,
  },
  btnTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  titleBtn: {
    fontSize: 17,
    fontFamily: 'Rubik-Medium',
    marginLeft: 15,
  },
  desc: {
    fontFamily: 'Rubik-Regular',
    fontSize: 13,
    color: '#2B2C3266',
  },
});
