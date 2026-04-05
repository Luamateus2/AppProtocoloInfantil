import React, { useState } from "react";
import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface TimePickerFieldProps {
  label: string;
  value: Date;
  onChange: (time: Date) => void;
  width?: string | number;
}

export const TimePickerField = ({ label, value, onChange, width = "100%" }: TimePickerFieldProps) => {
  const [show, setShow] = useState(false);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <View style={[styles.container, { width }]}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.button} onPress={() => setShow(true)}>
        <Text style={styles.text}>{formatTime(value)}</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          value={value}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedTime) => {
            setShow(false);
            if (selectedTime) onChange(selectedTime);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
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