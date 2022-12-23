import {app} from '@app/contexts';
import {AppTheme} from '@app/types';
import {
  BLACK,
  DARK_BG1,
  DARK_BG2,
  DARK_LINE,
  DARK_PLACEHOLDER,
  DARK_SCREEN_BG,
  DARK_TARIFF_COLOR,
  DARK_TEXT_BASE_1,
  DARK_TEXT_BASE_2,
  DARK_TEXT_ERROR,
  DARK_TEXT_FIELD_BACK,
  LIGHT_BG1,
  LIGHT_BG2,
  LIGHT_BG3,
  LIGHT_BG4,
  LIGHT_LINE,
  LIGHT_PLACEHOLDER,
  LIGHT_SCREEN_BG,
  LIGHT_TARIFF_COLOR,
  LIGHT_TEXT_BASE_1,
  LIGHT_TEXT_BASE_2,
  LIGHT_TEXT_ERROR,
  LIGHT_TEXT_FIELD_BACK,
  TRANSPARENT,
} from '@app/variables';

export enum Color {
  bg1 = 'bg1',
  bg2 = 'bg2',
  bg3 = 'bg3',
  bg4 = 'bg4',
  transparent = 'transparent',
  black = 'black',
  textBase = 'textBase',
  textBaseButton = 'textBaseButton',
  textFieldBack = 'textFieldBack',
  textError = 'textError',
  line = 'line',
  screenBg = 'screenBg',
  placeHolder = 'placeHolder',
  tariffColor = 'tariffColor',
}

const styled = new Set(Object.keys(Color));

export function getColor(key: Color) {
  if (!styled.has(key)) {
    return key;
  }

  if (app.getTheme() === AppTheme.dark) {
    return dark[key];
  }

  return light[key];
}

const light = {
  [Color.screenBg]: LIGHT_SCREEN_BG,
  [Color.bg1]: LIGHT_BG1,
  [Color.bg2]: LIGHT_BG2,
  [Color.bg3]: LIGHT_BG3,
  [Color.bg4]: LIGHT_BG4,
  [Color.transparent]: TRANSPARENT,
  [Color.black]: BLACK,
  [Color.textBase]: LIGHT_TEXT_BASE_1,
  [Color.textFieldBack]: LIGHT_TEXT_FIELD_BACK,
  [Color.textBaseButton]: LIGHT_TEXT_BASE_2,
  [Color.textError]: LIGHT_TEXT_ERROR,
  [Color.line]: LIGHT_LINE,
  [Color.placeHolder]: LIGHT_PLACEHOLDER,
  [Color.tariffColor]: LIGHT_TARIFF_COLOR,
};

const dark = {
  [Color.screenBg]: DARK_SCREEN_BG,
  [Color.bg1]: DARK_BG1,
  [Color.bg2]: DARK_BG2,
  [Color.bg3]: LIGHT_BG3,
  [Color.bg4]: LIGHT_BG4,
  [Color.transparent]: TRANSPARENT,
  [Color.black]: BLACK,
  [Color.textBase]: DARK_TEXT_BASE_1,
  [Color.textFieldBack]: DARK_TEXT_FIELD_BACK,
  [Color.textBaseButton]: DARK_TEXT_BASE_2,
  [Color.textError]: DARK_TEXT_ERROR,
  [Color.line]: DARK_LINE,
  [Color.placeHolder]: DARK_PLACEHOLDER,
  [Color.tariffColor]: DARK_TARIFF_COLOR,
};
