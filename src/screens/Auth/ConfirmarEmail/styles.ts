import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 120,
    backgroundColor: '#2F63B5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 220,
    height: 70,
  },

  content: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 35,
  },

  topRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C4FA3',
    marginLeft: 12,
  },

  iconContainer: {
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmarImage: {
    width: 180,
    height: 180,
  },

  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 16,
  },

  email: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4A90E2',
    marginBottom: 22,
    textAlign: 'center',
  },

  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },

  buttonWrapper: {
    width: '100%',
    marginTop: 10,
  },

  button: {
    height: 58,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },

  footer: {
    height: 18,
    backgroundColor: '#2F63B5',
  },
});

export default styles;