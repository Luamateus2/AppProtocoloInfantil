import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({

  safeArea: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'transparent',
  },

  container: {
    width: '100%',
    height: 95,

    paddingBottom: 20,

    backgroundColor: '#214192',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    paddingHorizontal: 24,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: -4,
    },

    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 10,
  },

  tabButton: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },

  iconWrapper: {
    width: 54,
    height: 54,

    borderRadius: 18,

    borderWidth: 1.6,
    borderColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'transparent',
  },

  activeWrapper: {
    backgroundColor: '#FFFFFF',

    borderColor: '#FFFFFF',
  },

});

export default styles;