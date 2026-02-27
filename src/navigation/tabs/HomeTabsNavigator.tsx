import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import type { HomeTabsParamList } from "../type/types";

import Home from "../../screens/tabs/Home";
import Cart from "../../screens/tabs/Cart";
import Profile from "../../screens/tabs/Profile";
import Settings from "../../screens/tabs/Settings";

import { useCart } from "../../components/CartContext";

const Tab = createBottomTabNavigator<HomeTabsParamList>();

export function HomeTabsNavigator() {
    const { totalItems } = useCart();

    return (
        <Tab.Navigator
            id="MainTabs"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#020202",
                tabBarInactiveTintColor: "#94a3b8",
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    title: "Carrito",
                    tabBarBadge: totalItems > 0 ? totalItems : undefined,
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="shopping-cart" size={size} color={color} />
                    ),
                }}
            />


            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    title: "Ajustes",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="setting" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}