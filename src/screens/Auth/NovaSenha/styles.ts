import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  header: {
    height: 120,
    backgroundColor: '#2F5DA8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    backgroundColor: '#DDD',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 6,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F5DA8',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 13,
    color: '#2F5DA8',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2F5DA8',
    marginBottom: 12,
  },

  requisitos: {
    marginBottom: 20,
  },

  requisito: {
    fontSize: 12,
    color: '#2F5DA8',
    marginBottom: 4,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },

  saveText: {
    color: '#FFF',
    fontWeight: '600',
  },
});