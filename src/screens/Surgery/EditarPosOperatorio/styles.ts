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
    paddingTop: 24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -10,
  },

  dateContainer: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#214192',
    paddingVertical: 6,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginBottom: 26,
    backgroundColor: '#fff',
  },

  dateText: {
    color: '#214192',
    fontWeight: '600',
    fontSize: 13,
  },

  row: {
    marginBottom: 20,
  },

  label: {
    color: '#214192',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 10,
  },

  booleanContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  booleanButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#D5DCE8',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  booleanButtonActive: {
    backgroundColor: '#214192',
    borderColor: '#214192',
  },

  booleanButtonActiveRed: {
    backgroundColor: '#D9534F',
    borderColor: '#D9534F',
  },

  booleanText: {
    color: '#214192',
    fontSize: 15,
    fontWeight: '600',
  },

  booleanTextActive: {
    color: '#fff',
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D5DCE8',
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    color: '#214192',
    fontSize: 15,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  timeButton: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D5DCE8',
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  timeText: {
    color: '#214192',
    fontSize: 15,
    fontWeight: '600',
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#D5DCE8',
    borderRadius: 14,
    padding: 14,
    minHeight: 110,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    color: '#214192',
    fontSize: 15,
    marginBottom: 22,

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  button: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,

    shadowColor: '#214192',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
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