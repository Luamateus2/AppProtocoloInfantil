import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#1e40af', 
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  logoPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  logoText: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  headerTitle: { 
    color: '#FFF', 
    fontSize: 14, 
    flex: 1, 
    marginLeft: 15,
    fontWeight: '500'
  },
  avatar: { 
    width: 45, 
    height: 45, 
    borderRadius: 25, 
    borderWidth: 2, 
    borderColor: '#FFF' 
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#3b82f6',
    width: '23%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: { 
    marginBottom: 8 
  },
  actionLabel: { 
    color: '#FFF', 
    fontSize: 10, 
    textAlign: 'center', 
    fontWeight: '600' 
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1e3a8a' 
  },
  viewAll: { 
    color: '#3b82f6', 
    fontSize: 13,
    fontWeight: '500'
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#1e40af',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarCircleText: { 
    color: '#1e40af', 
    fontWeight: 'bold', 
    fontSize: 15 
  },
  cardInfo: { 
    flex: 1 
  },
  patientName: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#1e3a8a' 
  },
  patientStatus: { 
    fontSize: 12, 
    color: '#6b7280',
    marginTop: 2
  },
  bottomNav: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#1e40af',
    height: 65,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  navItemActive: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 14,
  }
});