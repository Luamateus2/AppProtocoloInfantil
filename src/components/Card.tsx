import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type CardModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
};

export default function CardModal({
  visible,
  onClose,
  children,
  containerStyle,
}: CardModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.card, containerStyle]}>
          {children}
        </View>

        {/* área clicável fora do card para fechar */}
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  card: {
    width: "85%",
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 18,

    // sombra iOS
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },

    // sombra Android
    elevation: 8,

    zIndex: 2,
  },
});