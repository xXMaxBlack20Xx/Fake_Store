import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { linking } from "./link/linking";
import { navTheme } from "./theme";
import { RootDrawerNavigator } from "./drawer/RootDrawerNavigator";

export function RootNavigation() {
    return (
        <NavigationContainer linking={linking} theme={navTheme} >
            <RootDrawerNavigator />
        </NavigationContainer>
    );
}