import colors from './colors';
import gStyle from './gStyle';
import { buttonStyle, buttonTextStyle } from '../components/buttons/Button';
import { formStyle } from '../components/Form/FormInput';

export const deepSquidInk = '#152939';
export const linkUnderlayColor = '#FFF';
export const errorIconColor = '#30d0fe';

export default {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
    width: '100%',
    backgroundColor: '#FFF',
  },
  section: {
    flex: 1,
    width: '100%',
    padding: 30,
  },
  sectionScroll: {
    padding: 15,
    width: '100%',
  },
  sectionHeader: {
    width: '100%',
    marginBottom: 32,
  },
  sectionHeaderText: {
    ...gStyle.title,
  },
  sectionFooter: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20,
  },
  sectionFooterLink: {
    fontSize: 14,
    color: colors.green,
    alignItems: 'baseline',
    textAlign: 'center',
  },
  navBar: {
    marginTop: 35,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  navButton: {
    marginLeft: 12,
    borderRadius: 4,
  },
  cell: {
    flex: 1,
    width: '50%',
  },
  errorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorRowText: {
    marginLeft: 10,
  },
  photo: {
    width: '100%',
  },
  album: {
    width: '100%',
  },
  button: {
    ...buttonStyle.filled,
  },
  buttonDisabled: {
    ...buttonStyle.filled,
    backgroundColor: colors.black20,
    alignItems: 'center',
    padding: 16,
  },
  buttonText: {
    ...buttonTextStyle.filled,
  },
  formField: {
    marginBottom: 22,
  },
  input: { ...formStyle.inputContainer, ...formStyle.input },
  placeholderTextColor: colors.black70,
  inputLabel: formStyle.label,
  phoneContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    flex: 2,
    padding: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#C4C4C4',
  },
  picker: {
    flex: 1,
    height: 44,
  },
  pickerItem: {
    height: 44,
  },
};
