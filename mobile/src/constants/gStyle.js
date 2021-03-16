import colors from './colors';

const gStyle = {
  activeOpacity: 0.7,
  containerPadding: {
    padding: 15,
  },
  page: {
    marginHorizontal: 15,
    backgroundColor: colors.white,
    flex: 1,
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRowCenterAlign: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexRowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flexRowSpace: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navHeaderStyle: {
    backgroundColor: colors.black,
    borderBottomWidth: 0,
    elevation: 0,
  },
  grayBorder: {
    borderColor: colors.black20,
    borderWidth: 1,
  },

  containerNavBlocks: {
    height: 44,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  flex4: { flex: 4 },
  flex5: { flex: 5 },

  spacer24: { height: 24 },
  spacer48: { height: 48 },
  spacer64: { height: 64 },
  spacer88: { height: 88 },
  spacer128: { height: 128 },

  mB8: { marginBottom: 8 },
  mL8: { marginLeft: 8 },
  mL16: { marginLeft: 16 },
  mR8: { marginRight: 8 },
  mR16: { marginRight: 16 },
  mR24: { marginRight: 24 },
  mR48: { marginRight: 48 },
  mR64: { marginRight: 64 },
  mT4: { marginTop: 4 },
  mT8: { marginTop: 8 },
  mT16: { marginTop: 16 },

  mH24: { marginHorizontal: 24 },

  mV16: { marginVertical: 16 },
  mV24: { marginVertical: 24 },
  mV32: { marginVertical: 32 },

  p4: { padding: 4 },
  p8: { padding: 8 },
  p16: { padding: 16 },
  p24: { padding: 24 },

  pH4: { paddingHorizontal: 4 },
  pH8: { paddingHorizontal: 8 },
  pH16: { paddingHorizontal: 16 },
  pH24: { paddingHorizontal: 24 },

  textBold10: { fontFamily: 'circularProBold', fontSize: 14 },
  textBold20: { fontFamily: 'circularProBold', fontSize: 16 },
  textBold30: { fontFamily: 'circularProBold', fontSize: 18 },
  textBook10: { fontFamily: 'circularProBook', fontSize: 12 },
  textBook20: { fontFamily: 'circularProBook', fontSize: 14 },
  textBook30: { fontFamily: 'circularProBook', fontSize: 16 },
  textBook40: { fontFamily: 'circularProBook', fontSize: 18 },
  textBold210: { fontFamily: 'larsseitBold', fontSize: 14 },
  textBold220: { fontFamily: 'larsseitBold', fontSize: 16 },
  textBold230: { fontFamily: 'larsseitBold', fontSize: 18 },
  textItalic10: { fontFamily: 'larsseitItalic', fontSize: 14 },
  textItalic20: { fontFamily: 'larsseitItalic', fontSize: 16 },
  textItalic30: { fontFamily: 'larsseitItalic', fontSize: 18 },
  textThin10: { fontFamily: 'larsseitThin', fontSize: 14 },
  textThin20: { fontFamily: 'larsseitThin', fontSize: 16 },
  textThin30: { fontFamily: 'larsseitThin', fontSize: 18 },

  header: {
    fontFamily: 'circularProBold',
    fontSize: 35,
    fontWeight: '500',
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'circularProBold',
    fontSize: 30,
    fontWeight: '500',
    marginTop: 30,
    marginBottom: 20,
  },
  emphasis: {
    fontFamily: 'circularProBold',
    fontSize: 24,
    fontWeight: '500',
  },
  subTitle: {
    fontFamily: 'circularProBold',
    fontSize: 18,
    fontWeight: '500',
  },
  textBold: {
    fontFamily: 'circularProBold',
    fontSize: 17,
  },
  text: {
    fontFamily: 'circularProBook',
    fontSize: 16,
  },
  textThin: { fontFamily: 'larsseitThin', fontSize: 16 },
  thinEmphasis: { fontFamily: 'larsseitThin', fontSize: 40 },
  listText: { color: colors.white, fontSize: 14 },
  largeText: { fontSize: 18 },
};

gStyle.smallText = {
  fontSize: 12,
};

gStyle.subHeader = {
  fontSize: 20,
  marginTop: 10,
  marginBottom: 8,
  fontWeight: '500',
};

export default gStyle;
