import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F8',
  },

  container: {
    flex: 1,
    backgroundColor: '#F3F4F8',
  },

  /* LOGO - TELA INICIO */

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoImage: {
    width:50,
    height:50,
  },

  footer: {
    width: '100%',
    paddingHorizontal: 24,
  },

  /* HEADER */

  headerGradient: {
    height: 180,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    justifyContent: 'space-between',
  },

logoBox: {
  width: 48,
  height: 48,
  backgroundColor: '#E8E8E8',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2,
  overflow: 'hidden',
},

  headerText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 11,
    marginHorizontal: 18,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  body: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    marginTop: -20,
    paddingTop: 24,
  },

  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },

  menuCard: {
    width: 74,
    height: 92,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#3563C7',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,

    elevation: 6,
  },

  menuText: {
    color: '#FFFFFF',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 14,
  },

  /* SECTION */

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 24,
    marginTop: 30,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2346A0',
  },

  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3563C7',
  },

  /* LIST */

  list: {
    paddingHorizontal: 24,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderWidth: 1.5,
    borderColor: '#3563C7',

    borderRadius: 18,

    paddingVertical: 16,
    paddingHorizontal: 14,

    marginBottom: 14,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,

    elevation: 4,
  },

  initialCircle: {
    width: 50,
    height: 50,
    borderRadius: 999,

    borderWidth: 1.5,
    borderColor: '#3563C7',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 14,
  },

  initialText: {
    color: '#2346A0',
    fontWeight: '700',
    fontSize: 18,
  },

  infoContainer: {
    flex: 1,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2346A0',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#5A6A85',
  },

  /* BOTÃO INICIO */

  button: {
    width: '100%',
    height: 58,

    backgroundColor: '#214192',

    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 20,

    shadowColor: '#214192',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  /* FOOTER */

  footerSafe: {
    backgroundColor: '#2346A0',
  },

  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    paddingTop: 14,
    paddingBottom: 12,

    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },

  tabButton: {
    width: 42,
    height: 42,

    borderRadius: 12,

    borderWidth: 1.5,
    borderColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  tabButtonActive: {
    width: 42,
    height: 42,

    borderRadius: 12,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;