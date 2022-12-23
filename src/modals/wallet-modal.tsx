import React, {Dispatch, SetStateAction, useRef} from 'react';

import {
  GestureResponderEvent,
  TouchableWithoutFeedback,
  View,
  findNodeHandle,
} from 'react-native';

import {Color} from '@app/colors';
// import {TabButton} from '@app/components/ui/tab-button';
import {createTheme} from '@app/helpers';
import {IS_IOS} from '@app/variables';

import {BottomModalWrapper} from './bottom-modal-wrapper';

export function WalletModal({
  modalVisible,
  setModalVisible,
  activeTab,
}: {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  activeTab: string;
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
      modalVisible={modalVisible}>
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.modalWrapper}>
          <View
            ref={ref => {
              reactTag.current = findNodeHandle(ref);
            }}
            style={styles.whiteBlock}>
            {/* <TabButton title="tariffPlan" onPress={() => {}} />
            <TabButton title="detail" onPress={() => {}} /> */}
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
