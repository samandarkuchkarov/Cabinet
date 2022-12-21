import {useEffect} from 'react';

import {
  useTypedDispatch,
  useTypedSelector,
} from '@app/hooks/use-typed-dispatch';
import {setUserData} from '@app/store/actions';

export const useUserInfo = () => {
  const dispatch = useTypedDispatch();
  const keys = useTypedSelector(state => state.user.key);
  useEffect(() => {
    const fetch = async () => {
      dispatch(setUserData());
    };
    if (keys && keys.uid) {
      fetch();
    }
    return () => {};
  }, [keys, dispatch]);
};
