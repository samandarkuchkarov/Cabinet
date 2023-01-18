// import {Color} from '@app/colors';
import {Color} from '@app/colors';
import {createTheme} from '@app/helpers/create-theme';

const ITEM_HEIGHT = 300;
export const styles = createTheme({
  item: {
    height: ITEM_HEIGHT,
    backgroundColor: '#1c1c1c',
    borderRadius: 7,
  },
  list: {
    marginBottom: 20,
  },
  wrapper: {
    backgroundColor: Color.bg1,
    paddingBottom: 20,
    borderRadius: 7,
  },
  textBlock: {
    padding: 10,
  },
  title: {
    fontFamily: 'Rubik-Regular',
    fontSize: 17,
    color: '#2B2C32',
  },
  desc: {
    fontFamily: 'Rubik-Regular',
    fontSize: 13,
    color: '#2B2C3266',
    marginTop: 10,
  },
});
