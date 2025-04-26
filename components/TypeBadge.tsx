import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  name: string;
  width: number;
  backgroundColor?: string; // optional background
  textColor?: string; // 👈 NEW optional text color
};

export const TypeBadge = ({
  name,
  width,
  backgroundColor,
  textColor
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        { width, backgroundColor: backgroundColor || "#fff" }
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: textColor || "#333" } // 👈 use passed textColor if available
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff", // fallback (redundant but safe)
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    marginBottom: 8
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#fff",
    textAlign: "center"
  }
});
