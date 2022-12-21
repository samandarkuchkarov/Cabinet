import {createContext} from 'react';

// import {AppState, Platform} from 'react-native';

// import {AppTheme} from '@app/types';

class App {
  getTheme() {
    return 'light';
  }
}

export const app = new App();

export const AppContext = createContext(app);
