import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F5DA8',
  },

  header: {
    height: 100,
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  content: {
    backgroundColor: '#EAEAEA',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  dateContainer: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#2F5DA8',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  dateText: {
    color: '#2F5DA8',
    fontWeight: '500',
  },

  field: {
    marginBottom: 15,
  },

  label: {
    color: '#2F5DA8',
    fontWeight: '600',
    marginBottom: 6,
  },

  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2F5DA8',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },

  selectText: {
    color: '#2F5DA8',
    fontSize: 13,
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#2F5DA8',
    borderRadius: 12,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#2F5DA8',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  footer: {
    height: 70,
    backgroundColor: '#2F5DA8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default styles;