// navigation/TabNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PokedexStack from "./PokedexStack";
import HomeStack from "./HomeStack";

export type RootTabParamList = {
  Home: undefined;
  Pokédex: undefined;
  MyTeam: undefined;
  Quiz: undefined;
  About: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Pokédex"
          component={PokedexStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
