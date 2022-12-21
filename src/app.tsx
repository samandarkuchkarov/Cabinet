/* eslint-disable import/order */
import React from 'react';

// import {SafeAreaView, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import {AppContext, app} from '@app/contexts';
// import {TabBar} from '@app/components/tab-bar';
// import {StatusBarColor} from '@app/components/ui/status-bar-color';
import {store} from '@app/store';
// import Header from './src/components/header';
import {StackScreens} from '@app/stack-navigation';

// import '../assets/118n/i18n';

// const stackScreenOptions = {
//   presentation: 'modal',
//   gestureEnabled: false,
// };
export const App = () => {
  // const changeScreen = () => {};
  return (
    <SafeAreaProvider>
      {/* <Header navigationRef={navigationRef} /> */}
      {/* <TabBar /> */}
      <AppContext.Provider value={app} />
      <Provider store={store}>
        <StackScreens />
      </Provider>
    </SafeAreaProvider>
  );
};
