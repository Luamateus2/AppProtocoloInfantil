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
    borderRadius: 8,
  },

  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 40, 
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },

  description: {
    color: '#eee',
    marginBottom: 20,
    fontSize: 13,
    lineHeight: 18,
  },

  label: {
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
  },
forgot: {
  color: '#FFFFFF',
  fontSize: 14,
  textAlign: 'right',
  marginTop: 8,
  marginBottom: 16,
  textDecorationLine: 'underline', 
},
register: {
  color: '#FFFFFF',
  fontSize: 14,
  textAlign: 'center',
  marginTop: 20,
},

link: {
  color: '#FFD700', 
  fontWeight: 'bold',
},
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10, 
  },

  supportText: {
    color: '#cce0ff',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 25, 
    alignItems: 'center',
  },

  buttonText: {
    color: '#1E3C72',
    fontWeight: 'bold',
    fontSize: 16,
  },

  back: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});

export default styles;