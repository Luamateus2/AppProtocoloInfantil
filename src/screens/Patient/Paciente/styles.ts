import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  /* BODY */

  body: {
    flex: 1,
    backgroundColor: '#F4F4F4',

    marginTop: -12,
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  /* PESQUISA */

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  searchBox: {
    flex: 1,
    height: 50,

    borderRadius: 16,

    paddingHorizontal: 16,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#2A4FB2', // importante pra não parecer input “quebrado”

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,

    elevation: 4,

    borderWidth: 0, // remove qualquer borda/foco estranho
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,

    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',

    borderWidth: 0, // garante sem borda
  },

  filterButton: {
    width: 46,
    height: 46,

    borderRadius: 14,

    marginLeft: 10,

    backgroundColor: '#3563C7',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,

    elevation: 4,
  },

  /* CARD */

  card: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderWidth: 2.2,
    borderColor: '#2A4FB2',

    borderRadius: 20,

    paddingVertical: 16,
    paddingHorizontal: 14,

    marginBottom: 14,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  /* AVATAR */

  avatar: {
    width: 56,
    height: 56,

    borderRadius: 999,

    borderWidth: 2.2,
    borderColor: '#2A4FB2',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 14,
  },

  avatarText: {
    color: '#2A4FB2',
    fontWeight: '700',
    fontSize: 18,
  },

  /* INFO */

  cardInfo: {
    flex: 1,
  },

  name: {
    color: '#2A4FB2',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 4,
  },

  details: {
    color: '#6A78A0',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },

  /* ESTADOS */

  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },

  emptyText: {
    marginTop: 10,
    color: '#214192',
    fontSize: 16,
    fontWeight: '600',
  },

  loading: {
    marginTop: 40,
  },

  /* FOOTER */

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