import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  logo: {
    width: width * 0.28,
    height: width * 0.28,
    resizeMode: 'contain',
  },

  content: {
    flex: 1,
    padding: 20,
  },

  form: {
    flexGrow: 0,
  },

  actions: {
    marginTop: 20,
  },

  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 10,
  },

  description: {
    color: '#eee',
    marginBottom: 20,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },

  label: {
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: '#1E1E1E',
  },

  supportText: {
    color: '#cce0ff',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 10,
    fontFamily: 'Inter_400Regular',
  },

  button: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: '#1E3C72',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },

  backButton: {
    marginTop: 16,
    alignItems: 'center',
  },

  back: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },

  // 🔥 SÓ ISSO FOI ADICIONADO (necessário para o Login-style funcionar)

  inputError: {
    borderWidth: 1,
    borderColor: '#F8F9FA',
  },

  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },

  errorText: {
    color: '#F8F9FA',
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'Inter_400Regular',
  },
});

export default styles;