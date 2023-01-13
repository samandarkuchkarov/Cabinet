import React, {useEffect, useState} from 'react';

import {Modal} from 'react-native';

// import {useTypedRoute} from '@app/hooks/use-typed-route';

export function ChanheModalWrapper({
  children,
  modalVisible,
}: {
  children: JSX.Element;
  modalVisible: boolean;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(modalVisible);
  }, [modalVisible]);

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={() => setVisible(false)}>
      {children}
    </Modal>
  );
}
