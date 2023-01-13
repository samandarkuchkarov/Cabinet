import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';

import {
  Modal,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';

import {createTheme} from '@app/helpers';
// import {useTypedRoute} from '@app/hooks/use-typed-route';
import {IS_IOS} from '@app/variables';

export function BottomModalWrapper({
  children,
  modalVisible,
  setModalVisible,
  // activeTab,
  setActiveTab,
}: {
  children: JSX.Element;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const [visible, setVisible] = useState(true);
  const height = useWindowDimensions().height;
  // const route = useTypedRoute();

  useEffect(() => {
    setVisible(modalVisible);
  }, [modalVisible]);

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={() => {
        setVisible(false);
        setModalVisible(false);
      }}>
      <View style={[styles.modalWrapper, {height: height - 80}]}>
        {children}
      </View>
      <View style={styles.tabInvisibleBtns}>
        {['bonus', 'static', 'profile', 'wallet', 'settings'].map(i => (
          <TouchableWithoutFeedback onPress={() => setActiveTab(i)} key={i}>
            <View style={styles.btns} />
          </TouchableWithoutFeedback>
        ))}
      </View>
    </Modal>
  );
}

const styles = createTheme({
  modalWrapper: {
    // flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tabInvisibleBtns: {
    height: IS_IOS ? 80 : 60,
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 1.4,
    borderTopColor: '#0000002e',
  },
  btns: {
    height: IS_IOS ? 80 : 60,
    width: '20%',
  },
});
