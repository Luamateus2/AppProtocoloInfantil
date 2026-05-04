import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingBottom: 30,
    marginBottom:30
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logoBox: {
    width: 50,
    height: 50,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    color: '#fff',
    flex: 1,
    marginHorizontal: 10,
    fontSize: 12,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },

  /* 🔥 FUNDO BRANCO SEPARADO */
  body: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
  },

  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -20,
  },

  menuCard: {
    width: 75,
    height: 90,
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  menuText: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 6,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3C72',
  },

  seeAll: {
    color: '#4A90E2',
    fontSize: 13,
  },

  list: {
    paddingHorizontal: 20,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },

  initialCircle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  initialText: {
    color: '#4A90E2',
    fontWeight: '600',
  },

  name: {
    fontWeight: '600',
    color: '#1E3C72',
  },

  subtitle: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },

  /* 🔥 FOOTER CORRETO */
  bottomWrapper: {
    backgroundColor: '#1E3C72',
  },

  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 14,
  },
});

export default styles;