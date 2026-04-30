import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    justifyContent: 'space-between',
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 200,
    height: 120,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    padding: 30,
    
  },

  button: {
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;