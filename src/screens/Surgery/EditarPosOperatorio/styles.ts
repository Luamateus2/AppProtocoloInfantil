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

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1.2,
    borderBottomColor: '#CFCFCF',
    gap: 12,
  },

  label: {
    color: '#214192',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    flexShrink: 1,
    paddingTop: 4,
  },

  dropdownWrapper: {
    width: '42%',
    minWidth: 135,
    maxWidth: 165,
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
    width: '100%',
    backgroundColor: '#fff',
  },

  inputText: {
    color: '#214192',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
    marginRight: 4,
  },

  dropdown: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#214192',
    overflow: 'hidden',
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
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