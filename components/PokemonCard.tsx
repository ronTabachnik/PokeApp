import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  name: string;
  image: string;
  backgroundColor: string;
  onPress: () => void;
};

export const PokemonCard = ({
  name,
  image,
  backgroundColor,
  onPress
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.8} // smoother tap effect
    >
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{name.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "45%", // slightly more controlled width
    aspectRatio: 1, // keep card always square
    margin: 8,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4
  },
  image: {
    width: "70%", // relative size
    height: "70%",
    marginBottom: 8
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.5)", // slightly softer shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    textAlign: "center"
  }
});
