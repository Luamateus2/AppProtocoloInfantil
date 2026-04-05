import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

interface SwitchFieldProps {
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}

export const SwitchField = ({ label, value, onValueChange }: SwitchFieldProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#CFD8DC", true: "#42A5F5" }}
      thumbColor={value ? "#1E88E5" : "#F4F3F4"}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#CFD8DC",
  },
  label: { fontSize: 15, color: "#212121" },
});