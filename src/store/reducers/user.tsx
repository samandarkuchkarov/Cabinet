import {AxiosInstance} from 'axios';

import {
  LOG_OUT,
  SET_ALL_BONUSES,
  SET_ALL_TARRIFS,
  SET_CURRENT_TARIFF,
  SET_FEES,
  SET_PAYMENTS,
  SET_SESSIONS,
  SET_USER_CONTACTS,
  SET_USER_DATA,
  SET_USER_KEYS,
  SET_USER_STATUS,
  UPDATE_HOST,
} from '../actions';

export type keysProps = {
  login: string;
  uid: number;
  sid: string;
};
type contactsItem = {
  id: number;
  name: string;
  priority: number;
  typeId: number;
  value: string;
};
export type feeProps = {
  datetime: string;
  dsc: string;
  id: number;
  sum: number;
  uid: number;
  extId: string | undefined;
  innerDescribe: string | undefined;
};

export type sessionProps = {
  tpName: string;
  tpId: number;
  duration: string;
  durationSec: number;
  recv: number;
  sent: number;
  start: string;
  sum: number;
  end: string;
};

// type paymentsProps = {
//   datetime: string;
//   dsc: string;
//   id: number;
//   sum: number;
//   uid: number;
//   extId: string;
// };

export type bonusesProps = {
  gorod: string;
  pic: string;
  name: string;
  description_ru: string;
  description_uz: string;
  type: string;
  title_ru: string;
  title_uz: string;
  short_text_ru: string;
  short_text_uz: string;
  id: number;
};
export type allTariffsProps = {
  comments: string;
  id: number;
  tpId: number;
};
export type InitialUserStateProps = {
  isLogin: boolean | null;
  key: keysProps;
  host: AxiosInstance | boolean;
  fio: string;
  contractId: string;
  addressFlat: string;
  addressBuild: string;
  contacts: contactsItem[];
  cellPhone: string;
  monthFee: number;
  dayFee: number;
  tpId: number;
  tpName: string;
  internetStatus: number;
  city: string;
  addressStreet: string;
  internetActivate: string;
  disable: number;
  deposit: number;
  reduction: number;
  credit: number;
  bonuses: bonusesProps[] | [];
  fees: feeProps[] | [];
  payments: feeProps[] | [];
  allTariffs: allTariffsProps[] | [];
  sessions: sessionProps[] | [];
};

// const axiosIn = axios.create({
//   baseURL: BASE_URI,
//   headers: {
//     'Content-Type': 'text/plain',
//   },
// });

const InitialState: InitialUserStateProps = {
  isLogin: null,
  key: {login: '', uid: 0, sid: ''},
  host: false,
  fio: '',
  contractId: '',
  addressFlat: '',
  addressBuild: '',
  cellPhone: '',
  contacts: [{id: 0, name: '', priority: 0, typeId: 0, value: ''}],
  monthFee: 0,
  dayFee: 0,
  tpId: 0,
  tpName: '',
  internetStatus: 0,
  city: '',
  addressStreet: '',
  internetActivate: '',
  disable: 0,
  deposit: 0,
  reduction: 0,
  credit: 0,
  bonuses: [],
  fees: [],
  payments: [],
  allTariffs: [],
  sessions: [],
};

export function user(state = InitialState, action: any) {
  const data = {...state};
  switch (action.type) {
    case SET_USER_STATUS:
      data.isLogin = action.payload.isLogin;
      data.key = action.payload.keys;
      break;
    case SET_USER_KEYS:
      data.isLogin = true;
      data.key = action.payload;
      break;
    case LOG_OUT:
      data.isLogin = false;
      data.key = InitialState.key;
      break;
    case SET_USER_DATA:
      data.disable = action.payload.disable;
      data.fio = action.payload.fio;
      data.contractId = action.payload.contractId;
      data.addressFlat = action.payload.addressFlat;
      data.addressBuild = action.payload.addressBuild;
      data.city = action.payload.city;
      data.addressStreet = action.payload.addressStreet;
      data.reduction = action.payload.reduction;
      data.credit = action.payload.credit;
      data.deposit = Math.trunc(action.payload.deposit);
      data.cellPhone = action.payload.cellPhone[0]
        ? action.payload.cellPhone[0]
        : '';
      break;
    case SET_USER_CONTACTS:
      // data.fio = action.payload.fio;
      // data.contractId = action.payload.contractId;
      // data.addressFlat = action.payload.addressFlat;
      // data.addressBuild = action.payload.addressBuild;
      break;
    case UPDATE_HOST:
      data.host = action.payload;
      break;
    case SET_CURRENT_TARIFF:
      data.monthFee = action.payload.monthFee;
      data.dayFee = action.payload.dayFee;
      data.tpId = action.payload.tpId;
      data.tpName = action.payload.tpName;
      data.internetStatus = action.payload.internetStatus;
      data.internetActivate = action.payload.internetActivate;
      break;
    case SET_ALL_BONUSES:
      data.bonuses = action.payload;
      break;
    case SET_ALL_TARRIFS:
      data.allTariffs = action.payload;
      break;
    case SET_FEES:
      data.fees = action.payload;
      break;
    case SET_PAYMENTS:
      data.payments = action.payload;
      break;
    case SET_SESSIONS:
      data.sessions = action.payload;
      break;
    default:
      break;
  }

  // if (!data.host && data.key && data.key.uid) {
  //   data.host = axiosIn;
  //   data.host.interceptors.response.use(
  //     response => {
  //       if (response.data?.errstr === 'No such route') {
  //         response.status = 401;
  //         response.statusText = 'Unathorized';
  //         response.data = 'Unathorized';
  //         data.isLogin = false;
  //         data.key = InitialState.key;
  //         return response;
  //       }
  //       return response;
  //     },
  //     error => {
  //       if (error.toString().includes('401')) {
  //         state.isLogin = false;
  //         state.key = InitialState.key;
  //       }
  //       return Promise.reject(error);
  //     },
  //   );
  //   const authInterceptor = (config: AxiosRequestConfig) => {
  //     config.headers!.USERSID = data.key.sid;
  //     return {...config};
  //   };
  //   data.host.interceptors.request.use(authInterceptor);
  // }
  return data;
}
