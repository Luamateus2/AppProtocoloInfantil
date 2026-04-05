import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform, ViewStyle } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerFieldProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  width?: number; // Use apenas number (pixels)
}

export const DatePickerField = ({ label, value, onChange, width }: DatePickerFieldProps) => {
  const [show, setShow] = useState(false);

  const styleWithWidth: ViewStyle = { marginBottom: 12, width }; // width opcional, tipo number

  return (
    <View style={styleWithWidth}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.button} onPress={() => setShow(true)}>
        <Text style={styles.text}>{value.toLocaleDateString()}</Text>
      </Pressable>

      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedDate) => {
            setShow(false);
            if (selectedDate) onChange(selectedDate);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 13, color: "#546E7A", marginBottom: 4, fontWeight: "500" },
  button: {
    borderWidth: 1,
    borderColor: "#90CAF9",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#E3F2FD",
  },
  text: { fontSize: 16, color: "#212121" },
});