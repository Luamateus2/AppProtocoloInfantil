import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
  keyboardType?: "default" | "numeric";
  multiline?: boolean;
  placeholder?: string;
  width?: string | number;
}

export const InputField = ({
  label,
  value,
  onChange,
  keyboardType = "default",
  multiline = false,
  placeholder = "Preencher...",
  width = "100%",
}: InputFieldProps) => (
  <View style={[styles.inputBox, { width }]}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.textArea]}
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
      multiline={multiline}
      placeholder={placeholder}
      placeholderTextColor="#90A4AE"
    />
  </View>
);

const styles = StyleSheet.create({
  inputBox: { marginBottom: 12 },
  label: { fontSize: 13, color: "#546E7A", marginBottom: 4, fontWeight: "500" },
  input: {
    borderWidth: 1,
    borderColor: "#90CAF9",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#E3F2FD",
    color: "#212121",
  },
  textArea: { height: 90, textAlignVertical: "top" },
});