import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },

  top: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  logo: {
    width: 160,
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  content: {
    flex: 1,
    padding: 20,
    marginTop: 15,
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
    marginBottom: 25,
    lineHeight: 20,
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },

  input: {
    borderWidth: 1.5,
    borderColor: '#1E3C72',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
  },

  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;