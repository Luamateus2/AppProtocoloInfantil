import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: 'contain',
  },

  content: {
    flex: 1,
    padding: 24,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#FFF',
    marginBottom: 8,
  },

  description: {
    color: '#E3F2FD',
    marginBottom: 24,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },

  label: {
    color: '#FFF',
    marginTop: 14,
    marginBottom: 6,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },

  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    borderWidth: 1,
    borderColor: 'transparent',
  },

  inputError: {
    borderColor: '#EF4444',
  },

  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 2,
  },

  errorText: {
    color: '#F8F9FA',
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'Inter_400Regular',
  },

  forgot: {
    color: '#D6E4FF',
    marginTop: 10,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },

  button: {
    backgroundColor: '#F2F2F2',
    borderRadius: 28,
    paddingVertical: 16,
    marginTop: 28,
    alignItems: 'center',
  },

  buttonText: {
    color: '#2F5DA8',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },

  register: {
    color: '#EAF3FA',
    textAlign: 'center',
    marginTop: 28,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },

  link: {
    textDecorationLine: 'underline',
    fontFamily: 'Inter_600SemiBold',
    color: '#FFF',
  },
});

export default styles;