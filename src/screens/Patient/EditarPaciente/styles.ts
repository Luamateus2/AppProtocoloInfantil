import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#214192',
    marginBottom: 12,
  },

  label: {
    fontSize: 16,
    color: '#214192',
    marginBottom: 8,
    marginTop: 14,
    fontWeight: '700',
  },

  input: {
    backgroundColor: '#fff',

    borderRadius: 16,

    paddingVertical: 13,
    paddingHorizontal: 15,

    borderWidth: 2.2,
    borderColor: '#214192',

    fontSize: 13,
    color: '#214192',
    fontWeight: '600',

    minHeight: 50,
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  half: {
    flex: 1,
  },

  dropdownWrapper: {
    position: 'relative',
    zIndex: 999,
  },

  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#fff',

    borderRadius: 16,

    paddingVertical: 13,
    paddingHorizontal: 15,

    borderWidth: 2.2,
    borderColor: '#214192',

    minHeight: 50,
  },

  selectText: {
    flex: 1,

    fontSize: 13,
    color: '#214192',
    fontWeight: '600',

    marginRight: 6,
  },

  selectPlaceholder: {
    color: '#7A7A7A',
    fontWeight: '500',
  },

  dropdown: {
    position: 'absolute',

    top: 58,
    left: 0,
    right: 0,

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

    elevation: 8,

    zIndex: 9999,
  },

  option: {
    paddingVertical: 14,
    paddingHorizontal: 15,

    borderBottomWidth: 0.7,
    borderBottomColor: '#ECECEC',

    backgroundColor: '#fff',
  },

  optionText: {
    fontSize: 13,
    color: '#214192',
    fontWeight: '600',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 34,

    gap: 14,
  },

  cancelButton: {
    flex: 1,

    borderWidth: 1.8,
    borderColor: '#214192',

    borderRadius: 16,

    paddingVertical: 14,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',
  },

  cancelText: {
    color: '#214192',
    fontWeight: '700',
    fontSize: 14,
  },

  saveButton: {
    flex: 1,

    backgroundColor: '#214192',

    borderRadius: 16,

    paddingVertical: 14,

    alignItems: 'center',
    justifyContent: 'center',
  },

  saveText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default styles;