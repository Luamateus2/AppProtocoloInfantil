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
    alignItems: 'center',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },

  back: {
    fontSize: 20,
    marginRight: 10,
    color: '#1E3C72',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3C72',
  },

  icon: {
    marginVertical: 30,
  },

  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },

  email: {
    color: '#1E3C72',
    fontWeight: 'bold',
    marginBottom: 15,
  },

  textSmall: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
    fontSize: 13,
  },

  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;