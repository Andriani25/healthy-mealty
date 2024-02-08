import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/Home/Home";
import AddFood from "../views/AddFood";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = function () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddFood"
          component={AddFood}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
