import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  header: {
    height: 90,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  dateBox: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#2F6FB6",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  dateText: {
    color: "#2F6FB6",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F4FA3",
    marginBottom: 16,
  },

  formGroup: {
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    color: "#1F2D4D",
    marginBottom: 6,
    fontWeight: "500",
  },

  inputBox: {
    borderWidth: 1,
    borderColor: "#2F6FB6",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },

  value: {
    color: "#1F2D4D",
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#2F6FB6",
    borderRadius: 14,
    padding: 12,
    height: 100,
    backgroundColor: "#fff",
    textAlignVertical: "top",
    marginTop: 6,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#2F6FB6",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },

  bottomBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1F4FA3",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  tabItem: {
    width: 22,
    height: 22,
    backgroundColor: "#fff",
    borderRadius: 6,
    opacity: 0.8,
  },
});