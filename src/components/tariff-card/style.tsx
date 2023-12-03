import {Color} from '@app/colors';
import {createTheme} from '@app/helpers/create-theme';

export const styles = createTheme({
  card: {
    width: '100%',
    borderRadius: 9,
    backgroundColor: Color.bg1,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.24,

    elevation: 5,
  },
  tariffName: {
    color: Color.textBase,
    fontFamily: 'Rubik-Bold',
    textAlign: 'center',
    fontSize: 24,
  },
  mainSpeed: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  mainSpeedText: {
    fontFamily: 'Rubik-Regular',
    color: Color.textBase,
    fontSize: 80,
  },
  speed: {
    fontSize: 20,
    fontFamily: 'Rubik-Regular',
  },
  mainSpeedDesc: {
    marginTop: -25,
    fontFamily: 'Rubik-Regular',
    color: '#757575',
    marginBottom: 20,
  },
  listSpeed: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemSpeed: {
    width: '45%',
    marginTop: 5,
  },
  itemSpeedBig: {
    marginTop: 5,
    width: '100%',
  },
  itemSpeedPlaceholder: {
    color: '#757575',
    fontFamily: 'Rubik-Regular',
    marginBottom: 5,
  },
  itemSpeedText: {
    fontSize: 17,
    fontFamily: 'Rubik-Regular',
  },
  descSpeed: {
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    fontFamily: 'Rubik-Regular',
    color: Color.placeHolder,
  },
  monthFee: {
    color: '#F35459',
    fontFamily: 'Rubik-Medium',
    fontSize: 17,
  },
  mainlyBtn: {
    backgroundColor: Color.bg3,
    marginTop: 20,
    marginBottom: 5,
  },
  secondlyBtn: {
    backgroundColor: Color.bg1,
    borderColor: Color.textError,
    borderWidth: 2,
    marginTop: 5,
  },
});
