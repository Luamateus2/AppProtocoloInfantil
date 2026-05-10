import {
  StyleSheet,
} from 'react-native';

const styles =
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'space-between',

      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 20,
    },

    backButton: {
      width: 42,
      height: 42,

      justifyContent:
        'center',

      alignItems: 'center',

      borderRadius: 999,
    },

    sideSpace: {
      width: 42,
    },

    title: {
      flex: 1,
      textAlign: 'center',

      color: '#FFFFFF',
      fontSize: 22,
      fontWeight: '700',
    },
  });

export default styles;