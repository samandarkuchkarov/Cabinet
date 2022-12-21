import React, {useCallback, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';

import {Button} from '@app/components/ui/button';
import {KeyboardSafeArea} from '@app/components/ui/keyboard-safe-area';
import {TextField} from '@app/components/ui/text-field';
import {Login} from '@app/helpers/authentication';
import {useTypedDispatch} from '@app/hooks';
import {setKeys} from '@app/store/actions';

import {styles} from './styles';

export const Authentication = () => {
  const {t} = useTranslation();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useTypedDispatch();

  const onSubmit = useCallback(async () => {
    setLoading(true);
    const response = await Login(login, password);
    if (response.status) {
      dispatch(setKeys(response));
    }
    setError(!response.status);
    setLoading(false);
  }, [password, login, dispatch]);

  return (
    <View style={styles.mainWrapper}>
      <KeyboardSafeArea style={styles.wrapper}>
        <Text style={styles.title}>{t('signIn')}</Text>
        <TextField
          value={login}
          onChangeText={setLogin}
          style={styles.textArea}
          label="login"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextField
          secureTextEntry={true}
          style={styles.textArea}
          value={password}
          onChangeText={setPassword}
          label="password"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Text style={styles.error}>{error === true && t('errorLogin')}</Text>
        <Button
          loading={loading}
          style={styles.button}
          title="signIn"
          onPress={onSubmit}
        />
      </KeyboardSafeArea>
    </View>
  );
};
