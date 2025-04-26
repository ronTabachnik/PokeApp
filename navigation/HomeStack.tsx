// navigation/HomeStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PokemonDetailsScreen from "../screens/PokemonDetailsScreen";

export type HomeStackParamList = {
  Home: undefined;
  PokemonDetails: { name: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="PokemonDetails"
        component={PokemonDetailsScreen}
        options={{ title: "Details" }}
      />
      {/* Later: <Stack.Screen name="Future" component={FutureScreen} /> */}
    </Stack.Navigator>
  );
}
