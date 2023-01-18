import {useEffect} from 'react';

import {
  useTypedDispatch,
  useTypedSelector,
} from '@app/hooks/use-typed-dispatch';
import {setFees} from '@app/store/actions';

export const useFees = () => {
  const dispatch = useTypedDispatch();
  const keys = useTypedSelector(state => state.user.key);
  useEffect(() => {
    const fetch = async () => {
      dispatch(setFees());
    };
    if (keys && keys.uid) {
      fetch();
    }
    return () => {};
  }, [keys, dispatch]);
};
