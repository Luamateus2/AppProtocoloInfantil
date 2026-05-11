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
    backgroundColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    flex: 1,
    backgroundColor: '#E9E9E9',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  scrollContent: {
    paddingBottom: 120,
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
    color: '#214192',
    fontWeight: '500',
  },

  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  half: {
    flex: 1,
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
  },

  selectText: {
    fontSize: 13,
    color: '#777',
    flex: 1,
    marginRight: 6,
  },

  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginTop: 6,
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

  optionText: {
    fontSize: 14,
    color: '#214192',
    fontWeight: '500',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 14,
  },

  cancelButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#2A5298',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    color: '#2A5298',
    fontWeight: '600',
  },

  saveButton: {
    flex: 1,
    backgroundColor: '#2A5298',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default styles;