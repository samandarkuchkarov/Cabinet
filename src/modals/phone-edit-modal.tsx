import React, {Dispatch, SetStateAction, useRef, useState} from 'react';

import {
  GestureResponderEvent,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  findNodeHandle,
} from 'react-native';

import {Color, getColor} from '@app/colors';
import {Button} from '@app/components/ui/button';
import {TextField} from '@app/components/ui/text-field';
import {createTheme} from '@app/helpers';

import {ChanheModalWrapper} from './change-modal-wrapper';
export function PhoneEditModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const [phone, setPhone] = useState('+998');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [code, setCode] = useState('');
  const [secondInput, setSecondInput] = useState(false);
  const reactTag = useRef<number | null>(null);
  const changePhone = (string: string) => {
    if (string.length > 13) {
      return;
    }
    if (!string.includes('+998')) {
      setPhone('+998');
      return;
    }
    if (string.length === 13) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setPhone(string);
  };
  const onSubmit = () => {
    setLoading(true);
    if (secondInput) {
      setModalVisible(false);
    } else {
      setSecondInput(true);
    }
    setLoading(false);
  };

  const close = (e: GestureResponderEvent) => {
    if (e.nativeEvent.target !== reactTag.current) {
      setModalVisible(false);
      setSecondInput(false);
    }
  };
  return (
    <ChanheModalWrapper modalVisible={modalVisible}>
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.wrapper}>
          <View
            style={styles.phoneModal}
            ref={ref => {
              reactTag.current = findNodeHandle(ref);
            }}>
            <KeyboardAvoidingView>
              <TextField
                value={phone}
                onChangeText={changePhone}
                style={styles.textArea}
                label="phone number"
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
              />
              {secondInput ? (
                <TextField
                  secureTextEntry={true}
                  style={styles.textArea}
                  value={code}
                  onChangeText={setCode}
                  label="password"
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              ) : (
                <></>
              )}
            </KeyboardAvoidingView>

            <Button
              loading={loading}
              style={[
                styles.button,
                {
                  backgroundColor: disabled
                    ? getColor(Color.bg4)
                    : getColor(Color.bg3),
                },
              ]}
              title="llllll"
              onPress={onSubmit}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ChanheModalWrapper>
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
  phoneModal: {
    backgroundColor: Color.bg1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    width: '100%',
    borderRadius: 9,
    marginTop: 0,
  },
  textArea: {
    marginVertical: 20,
  },
  button: {
    width: '100%',
    backgroundColor: Color.bg3,
  },
});
