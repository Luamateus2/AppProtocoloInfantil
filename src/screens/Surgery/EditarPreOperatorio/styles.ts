import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ECECEC',
    paddingHorizontal: 22,
    paddingTop: 18,
  },

  date: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#214192',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 28,
    backgroundColor: '#fff',
    marginBottom: 18,
  },

  dateText: {
    color: '#214192',
    fontSize: 13,
    fontWeight: '700',
  },

  section: {
    color: '#214192',
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 14,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1.2,
    borderBottomColor: '#CFCFCF',
  },

  label: {
    color: '#214192',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderWidth: 2,
    borderColor: '#214192',
    borderRadius: 18,

    paddingVertical: 6,
    paddingHorizontal: 10,

    width: 150,
    backgroundColor: '#fff',
  },

  inputText: {
    color: '#214192',
    fontSize: 12,
    fontWeight: '600',
  },

  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 6,
    paddingVertical: 6,

    borderWidth: 1,
    borderColor: '#D0D0D0',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  textArea: {
    borderWidth: 2,
    borderColor: '#214192',
    borderRadius: 14,
    height: 110,
    backgroundColor: '#fff',
    padding: 14,
    textAlignVertical: 'top',
    marginTop: 8,
    fontSize: 13,
    color: '#000',
  },

  button: {
    marginTop: 30,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});