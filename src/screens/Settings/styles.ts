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
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },

  body: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    paddingHorizontal: 20,
    paddingTop: 24,
    marginTop: -10,
  },

  messageCard: {
    width: '100%',
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },

  messageSuccess: {
    borderColor: '#2E9E5B',
  },

  messageError: {
    borderColor: '#D9534F',
  },

  messageInfo: {
    borderColor: '#214192',
  },

  messageLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  messageTexts: {
    flex: 1,
    marginLeft: 10,
  },

  messageTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#214192',
  },

  messageText: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },

  confirmCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 22,
    borderWidth: 1.5,
    borderColor: '#D9534F',
    elevation: 4,
  },

  confirmTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#214192',
  },

  confirmText: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },

  confirmButtons: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 12,
  },

  cancelButton: {
    paddingVertical: 11,
    paddingHorizontal: 24,
    borderRadius: 14,
    backgroundColor: '#E8EEF9',
  },

  cancelButtonText: {
    color: '#214192',
    fontSize: 14,
    fontWeight: '700',
  },

  exitButton: {
    paddingVertical: 11,
    paddingHorizontal: 28,
    borderRadius: 14,
    backgroundColor: '#D9534F',
  },

  exitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

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

  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#214192',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 4,
  },

  photoButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },

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

  logoutCard: {
    marginTop: 4,
  },

  logoutIcon: {
    backgroundColor: '#FFF1F1',
    borderColor: '#D9534F',
  },

  logoutText: {
    color: '#D9534F',
    fontSize: 17,
    fontWeight: '700',
  },
});