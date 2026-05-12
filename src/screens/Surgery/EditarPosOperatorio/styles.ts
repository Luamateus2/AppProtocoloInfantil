import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    flex: 1,
    backgroundColor: '#ECECEC',
    paddingHorizontal: 22,
    paddingTop: 18,
  },

  scrollContent: {
    paddingBottom: 140,
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

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1.2,
    borderBottomColor: '#D6D6D6',
    gap: 12,
  },

  label: {
    color: '#214192',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    flexShrink: 1,
    paddingTop: 6,
  },

  dropdownWrapper: {
    width: '46%',
    minWidth: 145,
    position: 'relative',
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#FFFFFF',

    borderWidth: 2.2,
    borderColor: '#214192',

    borderRadius: 16,

    paddingVertical: 11,
    paddingHorizontal: 14,

    minHeight: 48,
  },

  inputText: {
    flex: 1,

    color: '#214192',

    fontSize: 13,
    fontWeight: '600',

    marginRight: 6,
  },

  dropdown: {
    position: 'absolute',
    top: 56,
    width: '100%',

    backgroundColor: '#fff',

    borderRadius: 16,

    borderWidth: 1.2,
    borderColor: '#D8DDE8',

    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,

    zIndex: 9999,
  },

  option: {
    paddingVertical: 13,
    paddingHorizontal: 14,

    borderBottomWidth: 0.7,
    borderBottomColor: '#ECECEC',

    backgroundColor: '#fff',
  },

  optionText: {
    color: '#214192',

    fontSize: 13,
    fontWeight: '600',
  },

  observacoesLabel: {
    color: '#214192',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 22,
    marginBottom: 10,
  },

  textArea: {
    borderWidth: 2.2,
    borderColor: '#214192',

    borderRadius: 16,

    height: 120,

    backgroundColor: '#fff',

    padding: 14,

    textAlignVertical: 'top',

    color: '#214192',

    fontSize: 13,
    fontWeight: '600',
  },

  button: {
    marginTop: 34,

    borderRadius: 30,

    paddingVertical: 15,

    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',

    fontSize: 15,
    fontWeight: '700',
  },
});