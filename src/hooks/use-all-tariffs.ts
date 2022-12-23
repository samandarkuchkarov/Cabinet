import {useEffect} from 'react';

import {
  useTypedDispatch,
  useTypedSelector,
} from '@app/hooks/use-typed-dispatch';
import {setAllTariff} from '@app/store/actions';

export const useAllTariffs = () => {
  const dispatch = useTypedDispatch();
  const keys = useTypedSelector(state => state.user.key);
  useEffect(() => {
    const fetch = async () => {
      dispatch(setAllTariff());
    };
    if (keys && keys.uid) {
      fetch();
    }
    return () => {};
  }, [keys, dispatch]);
};
