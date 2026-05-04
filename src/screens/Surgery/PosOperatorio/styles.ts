import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    height: 110,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },

  body: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    padding: 20,
    marginTop: -10,
  },

  dateContainer: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#214192',
    paddingVertical: 5,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginBottom: 20,
  },

  dateText: {
    color: '#214192',
    fontWeight: '500',
    fontSize: 12,
  },

  /* 🔥 LINHA COM DIVISÃO */
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.6,
    borderBottomColor: '#C5C5C5',
  },

  label: {
    color: '#214192',
    fontWeight: '500',
    fontSize: 18,
  },

  /* 🔥 SELECT ESTILO PILL */
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#214192',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    minWidth: 120,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  selectText: {
    color: '#214192',
    fontSize: 12,
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#214192',
    borderRadius: 12,
    padding: 12,
    height: 90,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginTop: 8,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  button: {
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
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