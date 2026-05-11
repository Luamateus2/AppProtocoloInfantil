import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  content: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 24,
    paddingTop: 16,
  },

  scrollContent: {
    paddingBottom: 120,
  },

  patientBadge: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#214192',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 34,
    marginBottom: 26,

    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  },

  patientBadgeText: {
    color: '#214192',
    fontSize: 18,
    fontWeight: '700',
  },

  timelineWrapper: {
    position: 'relative',
    paddingBottom: 30,
  },

  timelineLine: {
    position: 'absolute',
    left: 35,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#4E73B8',
    borderRadius: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 22,
  },

  leftCol: {
    width: 70,
    alignItems: 'center',
    paddingTop: 31,
    zIndex: 2,
  },

  dot: {
    
    elevation: 4,
  },

  dotIcon: {
    width: 24,
    height: 24,
  },

  card: {
    flex: 1,
    minHeight: 78,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#214192',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
    position: 'relative',

    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
  },

  date: {
    fontSize: 15,
    color: '#4E73B8',
    fontWeight: '600',
    marginBottom: 2,
  },

  title: {
    fontSize: 16,
    color: '#214192',
    fontWeight: '800',
    marginBottom: 2,
  },

  description: {
    fontSize: 15,
    color: '#2F5DA8',
    fontWeight: '500',
    paddingRight: 30,
  },

  arrowImage: {
    position: 'absolute',
    right: 13,
    top: 27,
    width: 22,
    height: 22,
    tintColor: '#214192',
  },

  emptyBox: {
    marginTop: 40,
    alignItems: 'center',
  },

  emptyText: {
    color: '#777',
    fontSize: 15,
    fontWeight: '500',
  },
});