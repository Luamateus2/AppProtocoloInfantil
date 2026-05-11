import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: 140,
  },

  body: {
    flex: 1,
    padding: 20,
    marginTop: -40,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 18,
  },

  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#1E4FA1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  checklist: {
    marginTop: 10,
    marginBottom: 20,
  },

  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  checkText: {
    fontSize: 12,
    marginLeft: 6,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#1E4FA1',
    borderRadius: 20,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  cancelText: {
    color: '#1E4FA1',
    fontWeight: '600',
  },

  saveButton: {
    flex: 1,
    backgroundColor: '#1E4FA1',
    borderRadius: 20,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveText: {
    color: '#fff',
    fontWeight: '600',
  },

  successCard: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
  },

  successTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    color: '#1E4FA1',
  },

  successText: {
    fontSize: 13,
    marginTop: 5,
    color: '#6B7280',
    textAlign: 'center',
  },
});