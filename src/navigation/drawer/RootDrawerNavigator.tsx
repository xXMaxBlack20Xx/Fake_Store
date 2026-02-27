import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import type { RootDrawerParamList } from "../type/types";
import { MainStackNavigator } from "../stack/MainStackNavigator";
import CustomDrawerContent from "../../components/CustomDrawerContainer";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export function RootDrawerNavigator() {
    return (
        <Drawer.Navigator
            id="MainDraw"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: true,
                drawerActiveTintColor: "#0c3a0b",
            }}
        >
            <Drawer.Screen
                name="MainStack"
                component={MainStackNavigator}
                options={({ route }) => {
                    const routeName =
                        getFocusedRouteNameFromRoute(route) ?? "Home";

                    return {
                        title: routeName,
                    };
                }}
            />
        </Drawer.Navigator>
    );
}