import React, {useState} from 'react';

import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import {TouchableWithoutFeedback, View} from 'react-native';

import {Color, getColor} from '@app/colors';
import {TabBarIcon} from '@app/components/tab-bar-icon';
import {createTheme} from '@app/helpers';
import {useTypedNavigation} from '@app/hooks';
import {SettingModal} from '@app/modals/setting-modal';
import {WalletModal} from '@app/modals/wallet-modal';
import {WifiModal} from '@app/modals/wifi-modal';
import {IS_IOS, tabs} from '@app/variables';

export type TabbarProps = {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  state: TabNavigationState<ParamListBase>;
};
export function TabBar() {
  // const {index, routeNames} = props.state;
  const navigation = useTypedNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  // const focusedRoute = routeNames[index];

  const pressTab = (item: string) => {
    if (item === 'profile') {
      navigation.navigate('homeNavigation', {screen: item});
      setActiveTab(item);
    } else if (item === 'static') {
      setModalVisible(true);
      setActiveTab(item);
    } else if (item === 'wallet') {
      setModalVisible(true);
      setActiveTab(item);
    } else if (item === 'settings') {
      setModalVisible(true);
      setActiveTab(item);
    }
  };

  return (
    <>
      <View style={styles.tabBarStyle}>
        {(Object.keys(tabs) as Array<keyof typeof tabs>).map(item => (
          <TouchableWithoutFeedback key={item} onPress={() => pressTab(item)}>
            <View>
              <TabBarIcon focused={activeTab === item} name={item} />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      {activeTab === 'static' && (
        <WifiModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          activeTab={activeTab}
        />
      )}
      {activeTab === 'wallet' && (
        <WalletModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          activeTab={activeTab}
        />
      )}
      {activeTab === 'settings' && (
        <SettingModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          activeTab={activeTab}
        />
      )}
    </>
  );
}

const styles = createTheme({
  tabBarStyle: {
    backgroundColor: getColor(Color.bg1),
    borderTopWidth: 0,
    elevation: 0,
    height: IS_IOS ? 80 : 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
