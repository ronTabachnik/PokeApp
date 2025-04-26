// navigation/TabNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PokedexStack from "./PokedexStack";

import HomeScreen from "../screens/HomeScreen";
import PokedexScreen from "../screens/PokedexScreen";
// import MyTeamScreen from '../screens/MyTeamScreen';
// import QuizScreen from '../screens/QuizScreen';
// import AboutScreen from '../screens/AboutScreen';

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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="Pokédex"
          component={PokedexStack}
          options={{ headerShown: false }}
        />
        {/* <Tab.Screen name="MyTeam" component={MyTeamScreen} />
        <Tab.Screen name="Quiz" component={QuizScreen} />
        <Tab.Screen name="About" component={AboutScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
