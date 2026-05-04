import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  top: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 200,
    height: 200,
  },

  content: {
    flex: 1,
    padding: 24,
    marginTop: 10,
    backgroundColor: '#F4F4F4', 
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#214192',
    marginBottom: 10,
    letterSpacing: 0.3,
  },

  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 25,
    lineHeight: 20,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },

  input: {
    borderWidth: 1.5,
    borderColor: '#1E3C72',
    borderRadius: 12,
    padding: 14,
    marginBottom: 25,
    backgroundColor: '#fff',
  },

  buttonWrapper: {
    alignSelf: 'center',
    borderRadius: 25,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  button: {
    width: 235,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 25,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default styles;