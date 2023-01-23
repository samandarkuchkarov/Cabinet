import React from 'react';

import {ViewStyle} from 'react-native';

import {Color, getColor} from '@app/colors';
import {
  Alert,
  ArrowRight,
  BePlus,
  Bonus,
  ChangePassword,
  Edit,
  FaceBook,
  Filter,
  Profile,
  Settings,
  SkidkaPartner,
  Static,
  Telegram,
  User,
  Wallet,
  YouTube,
} from '@app/variables';

export type IconType = {
  name: string;
  width: number;
  height: number;
  color?: Color;
  style?: ViewStyle;
  onPress?: () => void;
};
export const Icon = (props: IconType) => {
  const fill = props.color && getColor(props.color);
  delete props.color;
  switch (props.name) {
    case 'bonus':
      return <Bonus {...props} fill={fill} />;
    case 'static':
      return <Static {...props} fill={fill} />;
    case 'profile':
      return <Profile {...props} fill={fill} />;
    case 'wallet':
      return <Wallet {...props} fill={fill} />;
    case 'settings':
      return <Settings {...props} fill={fill} />;
    case 'user':
      return <User {...props} fill={fill} />;
    case 'edit':
      return <Edit {...props} fill={fill} />;
    case 'alert':
      return <Alert {...props} fill={fill} />;
    case 'changePassword':
      return <ChangePassword {...props} fill={fill} />;
    case 'arrowRight':
      return <ArrowRight {...props} fill={fill} />;
    case 'bePlus':
      return <BePlus {...props} fill={fill} />;
    case 'skidkaParner':
      return <SkidkaPartner {...props} fill={fill} />;
    case 'filter':
      return <Filter {...props} fill={fill} />;
    case 'youTube':
      return <YouTube {...props} fill={fill} />;
    case 'telegram':
      return <Telegram {...props} fill={fill} />;
    case 'faceBook':
      return <FaceBook {...props} fill={fill} />;
  }
  return null;
};
