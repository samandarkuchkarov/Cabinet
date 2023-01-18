import axios from 'axios';
import {Dispatch} from 'redux';

import {getData, storeData} from '@app/helpers';
import {InitialUserStateProps, keysProps} from '@app/store/reducers/user';

export const LOGIN = 'LOGIN';

export const IS_LOADING = 'IS_LOADING';
export const SET_USER_STATUS = 'SET_USER_STATUS';
export const SET_USER_KEYS = 'SET_USER_KEYS';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_CONTACTS = 'SET_USER_CONTACTS';
export const SET_CURRENT_TARIFF = 'SET_CURRENT_TARIFF';
export const SET_ALL_BONUSES = 'SET_ALL_BONUSES';
export const SET_ALL_TARRIFS = 'SET_ALL_TARRIFS';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_HOST = 'UPDATE_HOST';
export const SET_FEES = 'SET_FEES';
export const SET_PAYMENTS = 'SET_PAYMENTS';

export type setUserStatusProps = {
  isLogin: boolean;
  keys: keysProps;
};

export function logOut() {
  return async (dispatch: Dispatch) => {
    await storeData(null, 'keys');
    dispatch({
      type: UPDATE_HOST,
      payload: false,
    });
    dispatch({
      type: LOG_OUT,
      payload: false,
    });
  };
}

export function setUserStatus(status: setUserStatusProps) {
  return {
    type: SET_USER_STATUS,
    payload: status,
  };
}

export function setKeys(payload: {uid: number; sid: string; login: string}) {
  return {
    payload,
    type: SET_USER_KEYS,
  };
}

export function checkUser() {
  return async (dispatch: Dispatch) => {
    const secretKeys: keysProps = await getData('keys');

    let isLogin = true;
    if (secretKeys) {
      isLogin = true;
    } else {
      isLogin = false;
    }
    dispatch(setUserStatus({isLogin, keys: secretKeys}));
  };
}

export function setUserData() {
  return async (
    dispatch: Dispatch,
    getState: () => {user: InitialUserStateProps},
  ) => {
    const user = getState().user;

    if (typeof user.host !== 'boolean') {
      // const data = await user.host.get('/api.cgi/user/' + user.key.uid);
      const mainData = await user.host.get(
        '/api.cgi/user/' + user.key.uid + '/pi',
      );
      const data = await user.host.get('/api.cgi/user/' + user.key.uid);
      if (mainData && mainData.data && data && data.data) {
        dispatch({
          type: SET_USER_DATA,
          payload: {...mainData.data, ...data.data},
        });
      }
    }
  };
}

export function setUserContacts() {
  return async (
    dispatch: Dispatch,
    getState: () => {user: InitialUserStateProps},
  ) => {
    const user = getState().user;

    if (typeof user.host !== 'boolean') {
      const mainData = await user.host.get(
        '/api.cgi/user/' + user.key.uid + '/contacts',
      );
      if (mainData && mainData.data && mainData.data) {
        dispatch({
          type: SET_USER_CONTACTS,
          payload: mainData.data,
        });
      }
    }
  };
}

export function setCurrentariff() {
  return async (
    dispatch: Dispatch,
    getState: () => {user: InitialUserStateProps},
  ) => {
    const user = getState().user;

    if (typeof user.host !== 'boolean') {
      const mainData = await user.host.get(
        '/api.cgi/user/' + user.key.uid + '/internet',
      );
      if (mainData && mainData.data && mainData.data[0]) {
        dispatch({
          type: SET_CURRENT_TARIFF,
          payload: mainData.data[0],
        });
      }
    }
  };
}

export function setAllTariff() {
  return async (
    dispatch: Dispatch,
    getState: () => {user: InitialUserStateProps},
  ) => {
    const user = getState().user;
    if (typeof user.host !== 'boolean') {
      const mainData = await user.host.get(
        '/api.cgi/user/' + user.key.uid + '/internet/tariffs/all',
      );
      if (mainData && mainData.data) {
        dispatch({
          type: SET_ALL_TARRIFS,
          payload: mainData.data,
        });
      }
    }
  };
}

const getNews = () => {
  return axios({
    method: 'GET',
    url: 'https://serv.comnet.uz/api/news',
    headers: {
      Authorization: 'Bearer 3|YOz6gV9lvSlVao1VfTzboRMDSpipDNuSMeSLaNFo',
    },
  })
    .then(e => {
      return e.data.data;
    })
    .catch(e => {
      console.warn(e);
    });
};

export function setAllBonuses() {
  return async (dispatch: Dispatch) => {
    const data = await getNews();
    if (data) {
      dispatch({
        type: SET_ALL_BONUSES,
        payload: data,
      });
    }
  };
}

export function setFees(FROM_DATE = null, TO_DATE = null) {
  return async (
    dispatch: Dispatch,
    getState: () => {user: InitialUserStateProps},
  ) => {
    const user = getState().user;
    if (typeof user.host !== 'boolean') {
      const mainData = await user.host.get(
        '/api.cgi/user/' + user.key.uid + '/fees',
        {
          params: {FROM_DATE, TO_DATE},
        },
      );
      if (mainData && mainData.data) {
        // console.log(mainData.data.map(i => i.innerDescribe));
        dispatch({
          type: SET_FEES,
          payload: mainData.data,
        });
      }
    }
  };
}

export function setPayments(FROM_DATE = null, TO_DATE = null) {
  return async (
    dispatch: Dispatch,
    getState: () => {user: InitialUserStateProps},
  ) => {
    const user = getState().user;
    if (typeof user.host !== 'boolean') {
      const mainData = await user.host.get(
        '/api.cgi/user/' + user.key.uid + '/payments',
        {
          params: {FROM_DATE, TO_DATE, METHOD: '_SHOW'},
        },
      );
      if (mainData && mainData.data && mainData.data[0]) {
        dispatch({
          type: SET_PAYMENTS,
          payload: mainData.data,
        });
      }
    }
  };
}
