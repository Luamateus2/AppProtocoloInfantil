import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  top: {
    height: 120,
    backgroundColor: '#2F63B5',
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 42,
    backgroundColor: '#F4F4F4',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#214192',
    marginBottom: 12,
    letterSpacing: 0.3,
  },

  description: {
    fontSize: 16,
    color: '#1F1F1F',
    marginBottom: 30,
    lineHeight: 24,
  },

  label: {
    fontSize: 15,
    marginBottom: 8,
    color: '#333',
    fontWeight: '600',
  },

  input: {
    height: 58,
    borderWidth: 1.8,
    borderColor: '#214192',
    borderRadius: 16,
    paddingHorizontal: 18,
    marginBottom: 35,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#222',
  },

  buttonWrapper: {
    alignSelf: 'center',
    borderRadius: 35,
    overflow: 'hidden',

    shadowColor: '#214192',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 6,
  },

  button: {
    width: 250,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.3,
  },

  footer: {
    height: 16,
    backgroundColor: '#214192',
  },
});

export default styles;