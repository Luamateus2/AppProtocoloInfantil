import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  top: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 30,
  },

  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },

  content: {
    flex: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 28,
    paddingHorizontal: 25,
    paddingVertical: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#214192',
    marginBottom: 12,
    textAlign: 'center',
  },

  description: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#214192',
    marginBottom: 10,
  },

  input: {
    height: 58,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 18,
    borderWidth: 1.5,
    borderColor: '#D9E2F2',
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 25,
  },

  buttonWrapper: {
    borderRadius: 18,
    overflow: 'hidden',
  },

  button: {
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});