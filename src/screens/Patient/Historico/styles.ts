import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  content: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  /* LINHA CENTRAL REAL (igual imagem) */
  timelineLine: {
    position: 'absolute',
    left: 18,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#2F5DA8',
  },

  /* LINHA DO ITEM */
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 22,
  },

  /* COLUNA DA BOLINHA */
  leftCol: {
    width: 36,
    alignItems: 'center',
    paddingTop: 18,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2F5DA8',
    borderWidth: 2,
    borderColor: '#FFF',
  },

  /* CARD */
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#2F5DA8',
    borderRadius: 14,
    padding: 12,
    position: 'relative',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  date: {
    fontSize: 11,
    color: '#777',
    marginBottom: 4,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2F5DA8',
  },

  patient: {
    fontSize: 13,
    fontWeight: '600',
    color: '#214192',
    marginTop: 2,
  },

  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    lineHeight: 18,
  },

  arrow: {
    position: 'absolute',
    right: 10,
    top: 10,
    fontSize: 18,
    color: '#2F5DA8',
  },

});