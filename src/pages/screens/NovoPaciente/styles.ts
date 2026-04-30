import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A365D',
  },

  header: {
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },

  emptyView: {
    width: 24,
  },

  content: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  sectionTitle: {
    color: '#2C5282',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  label: {
    color: '#4A5568',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1.5,
    borderColor: '#4299E1',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FFF',
  },

  textArea: {
    borderWidth: 1.5,
    borderColor: '#4299E1',
    borderRadius: 12,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#FFF',
  },

  row: {
    flexDirection: 'row',
  },

  inputGroup: {
    flex: 1,
  },

  selectContainer: {
    borderWidth: 1.5,
    borderColor: '#4299E1',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  selectText: {
    color: '#A0AEC0',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  buttonCancel: {
    width: '47%',
    borderWidth: 2,
    borderColor: '#2B6CB0',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },

  buttonCancelText: {
    color: '#2B6CB0',
    fontWeight: 'bold',
    fontSize: 16,
  },

  buttonSave: {
    width: '47%',
    backgroundColor: '#3182CE',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },

  buttonSaveText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  footer: {
    height: 80,
    backgroundColor: '#1A365D',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  profileIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});