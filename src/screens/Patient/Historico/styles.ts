import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  header: {
    height: 100,
    backgroundColor: '#2F5DA8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },

  patientContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },

  patientName: {
    borderWidth: 1,
    borderColor: '#2F5DA8',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 6,
    color: '#2F5DA8',
    fontWeight: '500',
  },

  timelineContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },

  line: {
    width: 2,
    backgroundColor: '#2F5DA8',
    marginRight: 10,
  },

  list: {
    paddingBottom: 20,
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2F5DA8',
    marginRight: 10,
    marginTop: 10,
  },

  card: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },

  date: {
    fontSize: 12,
    color: '#555',
  },

  title: {
    fontWeight: '600',
    color: '#2F5DA8',
    marginTop: 4,
  },

  description: {
    fontSize: 12,
    color: '#555',
  },

  arrow: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: '#2F5DA8',
  },

  bottomNav: {
    height: 70,
    backgroundColor: '#2F5DA8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navItem: {
    color: '#FFF',
    fontSize: 20,
  },
});