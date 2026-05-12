import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 18,
  },

  backButton: {
    position: 'absolute',
    left: 20,
    bottom: 18,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    paddingBottom: 14,
  },

  body: {
    flex: 1,
    backgroundColor: '#E9E9E9',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#214192',
    marginBottom: 10,
  },

  label: {
    fontSize: 16,
    color: '#214192',
    marginBottom: 6,
    marginTop: 12,
    fontWeight: '500',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 2.5,
    borderColor: '#214192',
    fontSize: 13,
  },

  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 20,
  },

  half: {
    width: '48%',
  },

  selectWrapper: {
    position: 'relative',
    zIndex: 999,
  },

  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 2.5,
    borderColor: '#2A5298',
    minHeight: 50,
  },

  selectText: {
    fontSize: 13,
    color: '#214192',
    fontWeight: '600',
  },

  selectPlaceholder: {
    color: '#777',
    fontWeight: '400',
  },

  /* DROPDOWN ASA */

  dropdown: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,

    backgroundColor: '#fff',

    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D9D9D9',

    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 10,

    zIndex: 9999,
  },

  option: {
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#fff',
  },

  optionText: {
    fontSize: 14,
    color: '#214192',
    fontWeight: '600',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  cancelButton: {
    borderWidth: 1.5,
    borderColor: '#2A5298',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },

  cancelText: {
    color: '#2A5298',
    fontWeight: '600',
  },

  saveButton: {
    backgroundColor: '#2A5298',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 35,
  },

  saveText: {
    color: '#fff',
    fontWeight: '600',
  },

  bottomWrapper: {
    backgroundColor: '#2A5298',
  },

  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 65,
  },
});

export default styles;