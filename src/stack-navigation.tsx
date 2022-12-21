import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import axios, {AxiosRequestConfig} from 'axios';

import {Color, getColor} from '@app/colors';
import {Header} from '@app/components/header';
import {useTypedDispatch, useTypedSelector} from '@app/hooks';
import {navigator} from '@app/navigator';
import {Authentication} from '@app/screens/authentication';
import {HomeNavigation} from '@app/screens/home-navigation';
import {UPDATE_HOST, checkUser, logOut} from '@app/store/actions';

import '../assets/118n/i18n';
import {BASE_URI} from './variables';
const Stack = createStackNavigator();

const basicScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
};

const axiosIn = axios.create({
  baseURL: BASE_URI,
  headers: {
    'Content-Type': 'text/plain',
  },
});

const HeaderScreenOption = {
  headerStyle: {
    backgroundColor: getColor(Color.bg1),
    shadowColor: getColor(Color.black),
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.13,
  },
  tabBarShowLabel: false,
  headerTitle: () => <Header />,
};

export const StackScreens = () => {
  const dispatch = useTypedDispatch();
  const [isLogin, keys, host] = useTypedSelector(state => [
    state.user.isLogin,
    state.user.key,
    state.user.host,
  ]);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  useEffect(() => {
    if (isLogin) {
      navigator.navigate('homeNavigation');
      if (!host) {
        axiosIn.interceptors.response.use(
          response => {
            if (response.data?.errstr === 'No such route') {
              response.status = 401;
              response.statusText = 'Unathorized';
              response.data = 'Unathorized';
              dispatch(logOut());
              return response;
            }
            return response;
          },
          error => {
            if (error.toString().includes('401')) {
              dispatch(logOut());
            }
            return Promise.reject(error);
          },
        );
        const authInterceptor = (config: AxiosRequestConfig) => {
          config.headers!.USERSID = keys.sid;
          return {...config};
        };
        axiosIn.interceptors.request.use(authInterceptor);
        dispatch({type: UPDATE_HOST, payload: axiosIn});
      }
    } else {
      navigator.navigate('authentication');
    }
  }, [isLogin, host, keys, dispatch]);
  return (
    <NavigationContainer ref={navigator}>
      <Stack.Navigator>
        <Stack.Screen
          options={HeaderScreenOption}
          name="authentication"
          component={Authentication}
        />
        <Stack.Screen
          options={basicScreenOptions}
          name="homeNavigation"
          component={HomeNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
