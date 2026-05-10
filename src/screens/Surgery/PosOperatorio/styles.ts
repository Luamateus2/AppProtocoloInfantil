import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ECECEC',
    paddingHorizontal: 22,
    paddingTop: 18,
  },

  dateContainer: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#214192',
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 30,
    marginBottom: 18,
    backgroundColor: '#fff',
  },

  dateText: {
    color: '#214192',
    fontWeight: '700',
    fontSize: 13,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 14,
    borderBottomWidth: 1.2,
    borderBottomColor: '#CFCFCF',
  },

  label: {
    color: '#214192',
    fontWeight: '700',
    fontSize: 16,
    flex: 1,
    marginRight: 12,
  },

  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderWidth: 2,
    borderColor: '#214192',
    borderRadius: 18,

    paddingVertical: 7,
    paddingHorizontal: 10,

    minWidth: 150,
    maxWidth: 180,

    backgroundColor: '#fff',
  },

  selectText: {
    color: '#214192',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    marginRight: 6,
  },

  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 6,

    borderWidth: 1,
    borderColor: '#D9D9D9',

    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  option: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
  },

  textArea: {
    borderWidth: 2,
    borderColor: '#214192',
    borderRadius: 14,
    padding: 12,
    height: 95,

    backgroundColor: '#fff',
    textAlignVertical: 'top',

    fontSize: 13,
    color: '#000',

    marginTop: 16,
    marginBottom: 20,
  },

  button: {
    borderRadius: 30,
    paddingVertical: 14,

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 10,
    marginBottom: 30,

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});