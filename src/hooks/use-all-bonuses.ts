import {useEffect} from 'react';

import {useTypedDispatch} from '@app/hooks/use-typed-dispatch';
import {setAllBonuses} from '@app/store/actions';

export const useAllBonuses = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    const fetch = async () => {
      dispatch(setAllBonuses());
    };
    fetch();
    return () => {};
  }, [dispatch]);
};
