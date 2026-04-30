import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },

  header: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 160,
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E3C72',
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1.5,
    borderColor: '#1E3C72',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },

  rules: {
    marginTop: 10,
    marginBottom: 20,
  },

  rule: {
    color: '#1E3C72',
    marginBottom: 5,
    fontSize: 13,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cancel: {
    borderWidth: 1.5,
    borderColor: '#1E3C72',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },

  cancelText: {
    color: '#1E3C72',
    fontWeight: 'bold',
  },

  save: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },

  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;