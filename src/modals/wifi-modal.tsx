import React, {Dispatch, SetStateAction, useRef} from 'react';

import {
  GestureResponderEvent,
  TouchableWithoutFeedback,
  View,
  findNodeHandle,
} from 'react-native';

import {Color} from '@app/colors';
import {TabButton} from '@app/components/ui/tab-button';
import {createTheme} from '@app/helpers';
import {useTypedNavigation} from '@app/hooks';
import {IS_IOS} from '@app/variables';

import {BottomModalWrapper} from './bottom-modal-wrapper';

export function WifiModal({
  modalVisible,
  setModalVisible,
  activeTab,
  setActiveTab,
}: {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeTab: string;
}) {
  const reactTag = useRef<number | null>(null);

  const close = (e: GestureResponderEvent) => {
    if (e.nativeEvent.target !== reactTag.current) {
      setModalVisible(false);
    }
  };
  const navigation = useTypedNavigation();
  return (
    <BottomModalWrapper
      setModalVisible={setModalVisible}
      setActiveTab={setActiveTab}
      activeTab={activeTab}
      modalVisible={modalVisible}>
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.modalWrapper}>
          <View
            ref={ref => {
              reactTag.current = findNodeHandle(ref);
            }}
            style={styles.whiteBlock}>
            <TabButton
              title="tariffPlan"
              onPress={() => {
                navigation.navigate('homeNavigation', {screen: 'tariffs'});
                setModalVisible(false);
              }}
            />
            <TabButton
              title="detail"
              onPress={() => {
                navigation.navigate('homeNavigation', {screen: 'detail'});
                setModalVisible(false);
              }}
            />
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
});
