import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  safeArea: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'transparent',

    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  container: {
    height: 68,

    borderRadius: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    paddingHorizontal: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },

    shadowOpacity: 0.15,
    shadowRadius: 8,

    elevation: 12,
  },

  tabButton: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },

  iconBox: {
    width: 42,
    height: 42,

    borderRadius: 14,

    borderWidth: 1.5,
    borderColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',
  },

  activeIconBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },

});

export default styles;