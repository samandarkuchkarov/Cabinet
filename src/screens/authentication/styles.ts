import {Color} from '@app/colors';
import {createTheme} from '@app/helpers';

export const styles = createTheme({
  mainWrapper: {
    width: '100%',
    backgroundColor: Color.bg1,
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
    backgroundColor: Color.bg1,
    alignItems: 'center',
  },
  textArea: {
    marginVertical: 20,
  },
  title: {
    color: Color.textBase,
    fontSize: 24,
    fontFamily: 'Rubik-Medium',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: Color.bg3,
    paddingHorizontal: 28,
  },
  error: {
    color: Color.textError,
  },
});
