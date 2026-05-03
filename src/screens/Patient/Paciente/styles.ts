import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  header: {
    height: 100,
    backgroundColor: '#2F5DA8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  searchBox: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },

  searchInput: {
    color: '#FFF',
    height: 40,
  },

  filterButton: {
    marginLeft: 10,
    backgroundColor: '#2F5DA8',
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterText: {
    color: '#FFF',
    fontSize: 18,
  },

  suggestions: {
    backgroundColor: '#6C8CD5',
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 10,
  },

  suggestionText: {
    color: '#FFF',
    marginBottom: 4,
  },

  list: {
    padding: 16,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6ECF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  avatarText: {
    color: '#2F5DA8',
    fontWeight: '600',
  },

  cardInfo: {
    flex: 1,
  },

  name: {
    fontWeight: '600',
    color: '#2F5DA8',
  },

  details: {
    fontSize: 12,
    color: '#555',
  },

  arrow: {
    fontSize: 18,
    color: '#2F5DA8',
  },

  bottomNav: {
    height: 70,
    backgroundColor: '#2F5DA8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navItem: {
    color: '#FFF',
    fontSize: 20,
  },
});