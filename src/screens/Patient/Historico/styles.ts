// styles.ts

import { StyleSheet } from 'react-native';

export default StyleSheet.create({

 

  content: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  list: {
    paddingBottom: 120,
  },

  absoluteLine: {
    position: 'absolute',
    left: 26,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#2F5DA8',
  },

  itemRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },

  circleContainer: {
    width: 30,
    alignItems: 'center',
    zIndex: 10,
  },

  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2F5DA8',
    marginTop: 18,
    borderWidth: 3,
    borderColor: '#FFF',
  },

  card: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#2F5DA8',
    borderRadius: 14,
    padding: 12,
    marginLeft: 10,
    minHeight: 90,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },

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
    marginBottom: 2,
  },

  patient: {
    fontSize: 13,
    fontWeight: '600',
    color: '#214192',
    marginBottom: 4,
  },

  description: {
    fontSize: 12,
    color: '#666',
    paddingRight: 20,
    lineHeight: 18,
  },

  arrow: {
    position: 'absolute',
    right: 12,
    top: 12,
    fontSize: 16,
    color: '#2F5DA8',
    fontWeight: '700',
  },

  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: '#214192',
    fontWeight: '600',
  },

});