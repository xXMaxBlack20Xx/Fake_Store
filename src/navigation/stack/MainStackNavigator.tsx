import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { MainStackParamList } from "../type/types";
import { HomeTabsNavigator } from "../tabs/HomeTabsNavigator";

import Details from "../../screens/drawer/Details";
import About from "../../screens/drawer/About";
import Search from "../../screens/drawer/Search";
import Checkout from "../../screens/tabs/Checkout";

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            id="MainStack">
            <Stack.Screen
                name="HomeTabs"
                component={HomeTabsNavigator}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Search"
                component={Search}
                options={{ title: "Buscar" }}
            />

            <Stack.Screen name="Checkout" component={Checkout} />

            <Stack.Screen
                name="Details"
                component={Details}
                options={{ title: "Detalles" }}
            />

            <Stack.Screen
                name="About"
                component={About}
                options={{ title: "Acerca de" }}
            />
        </Stack.Navigator>
    );
}