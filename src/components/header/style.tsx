import {Color} from '@app/colors';
import {createTheme} from '@app/helpers/create-theme';

export const styles = createTheme({
  wrapper: {
    width: '100%',
    backgroundColor: Color.bg1,
    shadowColor: Color.black,
    shadowOffset: {width: 3, height: 5},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    marginTop: -2,
  },
  shadowBottom: {
    overflow: 'hidden',
  },
  phone: {
    fontSize: 14,
    color: Color.textBase,
    marginTop: 0,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: 1.5,
    height: 40,
    borderRadius: 7,
    backgroundColor: Color.line,
    marginHorizontal: 10,
  },
});
