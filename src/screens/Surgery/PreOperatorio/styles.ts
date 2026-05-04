import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    height: 115,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 22,
  },

  back: {
    position: 'absolute',
    left: 20,
    bottom: 22,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
    paddingBottom:10,
  },

  body: {
    flex: 1,
    backgroundColor: '#ECECEC',
    paddingHorizontal: 20,
    paddingTop: 15,
    marginTop: -10,
  },

  date: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#214192',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 22,
    marginBottom: 15,
  },

  dateText: {
    color: '#214192',
    fontSize: 12,
  },

  section: {
    color: '#214192',
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.6,
    borderBottomColor: '#C5C5C5',
  },

  label: {
    color: '#214192',
    fontSize: 16,
    fontWeight: '400',
    marginBottom:12,
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#214192',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    width: 120,
    justifyContent: 'space-between',
  },

  inputText: {
    fontSize: 14,
    color: '#214192',
    fontWeight: '400',
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#214192',
    borderRadius: 12,
    padding: 12,
    height: 85,
    marginTop: 12,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  placeholder: {
    fontSize: 12,
    color: '#777',
  },

  button: {
    marginTop: 25,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  navWrapper: {
    backgroundColor: '#214192',
  },

  nav: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  navItem: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    padding: 8,
  },
});