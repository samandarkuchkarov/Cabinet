import {Color} from '@app/colors';
import {createTheme} from '@app/helpers';

export const styles = createTheme({
  mainWrapper: {
    resizeMode: 'stretch',
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
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
    marginTop: 20,
  },
  button: {
    width: '100%',
    backgroundColor: Color.bg3,
    paddingHorizontal: 28,
  },
  error: {
    color: Color.textError,
  },

  imageWrapper: {
    flex: 1,
    alignItems: 'center',
  },
});
