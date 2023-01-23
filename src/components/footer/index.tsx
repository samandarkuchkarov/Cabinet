import React from 'react';

import {Image, Linking, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Icon} from '@app/components/ui/icon';

import {styles} from './style';

export const Footer = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../assets/images/bigger-logo.png')}
      />
      <View style={styles.share}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.youtube.com/@Comnetprovider')
          }>
          <View style={styles.shareItem}>
            <Icon name="youTube" width={22} height={22} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.facebook.com/comnet.uz/')
          }>
          <View style={styles.shareItem}>
            <Icon name="faceBook" width={22} height={22} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://t.me/s/comnet_uz')}>
          <View style={styles.shareItem}>
            <Icon name="telegram" width={22} height={22} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.shareItem}>
            <Icon name="youTube" width={22} height={22} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBtns}>
        <TouchableOpacity>
          <View style={styles.itemBtn}>
            <Text style={styles.itemBtnText}>Услуги</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.itemBtn}>
            <Text style={styles.itemBtnText}>О компании</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.itemBtn}>
            <Text style={styles.itemBtnText}>Прочее</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.itemBtn}>
            <Text style={styles.itemBtnText}>Помощь</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.right}>
        © ComNet, 2003-{new Date().getFullYear()}. Авторские права на содержание
        текста защищены. OOO IPLUS. Лицензия номер АА 0004789. 100060, Ташкент,
        ул. Шахрисабз, д.10б
      </Text>
    </View>
  );
};
