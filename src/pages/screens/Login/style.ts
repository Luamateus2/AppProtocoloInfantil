import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },

  logo: {
    width: 150,
    height: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },

 content: {
  flex: 1,
  padding: 20,
  paddingBottom: 40, 
},

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },

  description: {
    color: '#eee',
    marginBottom: 20,
    fontSize: 13,
  },

  label: {
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
  },

  forgot: {
    color: '#cce0ff',
    marginTop: 10,
    fontSize: 12,
  },

  button: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#1E3C72',
    fontWeight: 'bold',
  },

  register: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
  },


  link: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  errorCard: {
  backgroundColor: '#FF4D4D',
  padding: 12,
  borderRadius: 8,
  marginBottom: 12,
},

errorText: {
  color: '#FFF',
  fontSize: 14,
  textAlign: 'center',
},
});


export default styles;