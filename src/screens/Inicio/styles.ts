import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } =
  Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },

  logoImage: {
    width: width * 0.8,
    height: width * 0.8,
  },

  footer: {
    width: '100%',
    alignItems: 'center',
  },

  button: {
    width: '100%',
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    borderRadius: 28,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;