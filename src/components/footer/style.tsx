import {Color} from '@app/colors';
import {createTheme} from '@app/helpers';

export const styles = createTheme({
  container: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    resizeMode: 'contain',
    height: 100,
    width: 200,
  },
  share: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: 220,
    marginTop: 30,
  },
  shareItem: {
    backgroundColor: Color.textError,
    padding: 10,
    borderRadius: 100,
  },
  bottomBtns: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  itemBtn: {
    padding: 17,
    backgroundColor: Color.bg1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemBtnText: {
    fontSize: 20,
    fontFamily: 'Rubik-Medium',
  },
  right: {
    textAlign: 'center',
    fontSize: 12,
    color: '#171717',
    width: '70%',
    marginTop: 10,
  },
});
