import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: 110,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },

  body: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 24,
    paddingHorizontal: 20,
    marginTop: -10,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  searchBox: {
    flex: 1,
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D5DCE8',

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#214192',
    fontSize: 15,
  },

  filterButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    marginLeft: 12,
    backgroundColor: '#214192',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#214192',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E8EEF9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  avatarText: {
    color: '#214192',
    fontWeight: '700',
    fontSize: 16,
  },

  cardInfo: {
    flex: 1,
  },

  name: {
    color: '#214192',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },

  details: {
    color: '#6B7280',
    fontSize: 13,
    marginBottom: 2,
  },

  navWrapper: {
    backgroundColor: '#214192',
  },

  nav: {
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 6,
  },

  navItem: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: 14,
    padding: 10,
  },
});