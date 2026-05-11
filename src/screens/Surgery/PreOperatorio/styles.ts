import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  body: {
    flex: 1,
    backgroundColor: '#ECECEC',
    paddingHorizontal: 22,
    paddingTop: 18,
  },

  scrollContent: {
    paddingBottom: 120,
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
    width: 140,
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
    marginBottom: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#214192',
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  optionText: {
    color: '#214192',
    fontSize: 12,
    fontWeight: '600',
  },

  observacoesLabel: {
    color: '#214192',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 8,
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
    color: '#214192',
    fontSize: 13,
    fontWeight: '600',
  },

  button: {
    marginTop: 30,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});