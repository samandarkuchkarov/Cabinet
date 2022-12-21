import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

import {RootState} from '@app/store/index';
type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
