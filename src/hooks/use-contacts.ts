import {useEffect} from 'react';

import {
  useTypedDispatch,
  useTypedSelector,
} from '@app/hooks/use-typed-dispatch';
import {setUserContacts} from '@app/store/actions';

export const useContacts = () => {
  const dispatch = useTypedDispatch();
  const keys = useTypedSelector(state => state.user.key);
  useEffect(() => {
    const fetch = async () => {
      dispatch(setUserContacts());
    };
    if (keys && keys.uid) {
      fetch();
    }
    return () => {};
  }, [keys, dispatch]);
};
