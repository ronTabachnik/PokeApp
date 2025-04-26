import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokedexScreen from "../screens/PokedexScreen";
import PokemonDetailsScreen from "../screens/PokemonDetailsScreen";

export type PokedexStackParamList = {
  Home: undefined; // 👈 add
  Pokedex: undefined;
  PokemonDetails: { name: string };
};

const Stack = createNativeStackNavigator<PokedexStackParamList>();

export default function PokedexStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokedex"
        component={PokedexScreen}
        options={{ title: "Pokédex" }}
      />
      <Stack.Screen
        name="PokemonDetails"
        component={PokemonDetailsScreen}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
}
