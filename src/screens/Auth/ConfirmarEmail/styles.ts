import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  blueHeader: {
    height: 110,
    backgroundColor: '#2F63B5',
  },

  content: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 28,
  },

  topRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 38,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#214192',
    marginLeft: 14,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  confirmarImage: {
    width: 210,
    height: 210,
  },

  text: {
    fontSize: 18,
    color: '#2D2D2D',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 26,
    marginBottom: 14,
  },

  email: {
    fontSize: 23,
    fontWeight: '700',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 22,
  },

  description: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 42,
    paddingHorizontal: 8,
  },

  buttonWrapper: {
    width: '100%',
    marginTop: 5,
  },

  button: {
    height: 60,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#214192',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  footer: {
    height: 16,
    backgroundColor: '#2F63B5',
  },
});

export default styles;