import {useEffect} from 'react';

import {
  useTypedDispatch,
  useTypedSelector,
} from '@app/hooks/use-typed-dispatch';
import {setCurrentariff} from '@app/store/actions';

export const useCurrentTariff = () => {
  const dispatch = useTypedDispatch();
  const keys = useTypedSelector(state => state.user.key);
  useEffect(() => {
    const fetch = async () => {
      dispatch(setCurrentariff());
    };
    if (keys && keys.uid) {
      fetch();
    }
    return () => {};
  }, [keys, dispatch]);
};
