import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    height: 110,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },

  body: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    paddingHorizontal: 20,
    paddingTop: 30,
    marginTop: -10,
  },

  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E8EEF9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 4,
  },

  name: {
    color: '#214192',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 14,
  },

  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#214192',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },

  photoButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 3,
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#E8EEF9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  cardText: {
    color: '#214192',
    fontSize: 16,
    fontWeight: '600',
  },

  logoutCard: {
    marginTop: 10,
  },

  logoutIcon: {
    backgroundColor: '#FFEAEA',
  },

  logoutText: {
    color: '#D9534F',
    fontSize: 16,
    fontWeight: '700',
  },
  avatarImage: {
  width: '100%',
  height: '100%',
  borderRadius: 50,
},

loadingAvatar: {
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: 50,
  backgroundColor: 'rgba(0,0,0,0.35)',
  alignItems: 'center',
  justifyContent: 'center',
},
});