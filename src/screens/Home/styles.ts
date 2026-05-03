import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

 header: {
  backgroundColor: '#2F5DA8',
  paddingHorizontal: 20,
  paddingBottom: 70,
},

  headerContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop:20,
},

  logo: {
    width: 45,
    height: 45,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  headerTitle: {
    color: '#FFF',
    flex: 1,
    marginHorizontal: 10,
    fontSize: 13,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  actionsContainer: {
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 20,
    marginTop: -25, 
    marginBottom: 60,
    paddingTop:20
  },

  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  actionCard: {
    backgroundColor: '#3E6FD8',
    width: '23%',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',

    // sombra (efeito moderno)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  actionLabel: {
    color: '#FFF',
    fontSize: 10,
    marginTop: 5,
    textAlign: 'center',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F5DA8',
    marginBottom: 10,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2F5DA8',
  },

  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#2F5DA8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  avatarCircleText: {
    color: '#2F5DA8',
    fontWeight: 'bold',
  },

  patientName: {
    fontWeight: 'bold',
    color: '#2F5DA8',
  },

  patientStatus: {
    fontSize: 12,
    color: '#555',
  },

  bottomNav: {
    backgroundColor: '#2F5DA8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
  },
});