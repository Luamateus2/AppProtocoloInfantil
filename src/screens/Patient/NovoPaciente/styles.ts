import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  header: {
    height: 100,
    backgroundColor: '#2F5DA8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },

  content: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F5DA8',
    marginBottom: 10,
  },

  label: {
    fontSize: 12,
    color: '#2F5DA8',
    marginTop: 10,
    marginBottom: 4,
  },

  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2F5DA8',
  },

  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  half: {
    width: '48%',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: '#2F5DA8',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },

  cancelText: {
    color: '#2F5DA8',
    fontWeight: '500',
  },

  saveButton: {
    backgroundColor: '#2F5DA8',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },

  saveText: {
    color: '#FFF',
    fontWeight: '600',
  },
});