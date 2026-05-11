import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  /* HEADER */

  header: {
    height: 110,

    paddingHorizontal: 20,
    paddingBottom: 20,

    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  headerTitle: {
    color: '#FFFFFF',

    fontSize: 24,
    fontWeight: '700',
  },

  /* BODY */

  body: {
    flex: 1,

    backgroundColor: '#F4F6FA',

    paddingHorizontal: 20,
    paddingTop: 30,

    marginTop: -10,

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  /* PERFIL */

  profileContainer: {
    alignItems: 'center',

    marginBottom: 34,
  },

  avatar: {
    width: 110,
    height: 110,

    borderRadius: 55,

    backgroundColor: '#E8EEF9',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 14,

    borderWidth: 2,
    borderColor: '#3563C7',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.10,
    shadowRadius: 5,

    elevation: 5,
  },

  avatarImage: {
    width: '100%',
    height: '100%',

    borderRadius: 55,
  },

  loadingAvatar: {
    position: 'absolute',

    width: '100%',
    height: '100%',

    borderRadius: 55,

    backgroundColor: 'rgba(0,0,0,0.35)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    color: '#214192',

    fontSize: 22,
    fontWeight: '700',

    marginBottom: 16,
  },

  /* BOTÃO FOTO */

  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#214192',

    borderRadius: 14,

    paddingVertical: 12,
    paddingHorizontal: 20,

    shadowColor: '#214192',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.20,
    shadowRadius: 5,

    elevation: 4,
  },

  photoButtonText: {
    color: '#FFFFFF',

    marginLeft: 8,

    fontWeight: '600',
    fontSize: 14,
  },

  /* CARDS */

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#FFFFFF',

    borderWidth: 1.5,
    borderColor: '#3563C7',

    borderRadius: 18,

    paddingVertical: 18,
    paddingHorizontal: 16,

    marginBottom: 16,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.10,
    shadowRadius: 4,

    elevation: 3,
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 42,
    height: 42,

    borderRadius: 12,

    borderWidth: 1.5,
    borderColor: '#3563C7',

    backgroundColor: '#F5F8FF',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 14,
  },

  cardText: {
    fontSize: 17,
    fontWeight: '700',

    color: '#2346A0',
  },

  /* LOGOUT */

  logoutCard: {
    marginTop: 4,
  },

  logoutIcon: {
    backgroundColor: '#FFF1F1',

    borderColor: '#3563C7',
  },

  logoutText: {
    color: '#D9534F',

    fontSize: 17,
    fontWeight: '700',
  },
});