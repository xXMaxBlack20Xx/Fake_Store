import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerContentComponentProps,
    DrawerItem,
    DrawerNavigationProp,
} from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../screens/auth/AuthContext";
import { RootDrawerParamList } from "../navigation/type/types";

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { signOut } = useAuth();

    type Nav = DrawerNavigationProp<RootDrawerParamList, "MainStack">;
    const nav = props.navigation as unknown as Nav;

    const go = (screen: any, params?: any) => {
        nav.navigate("MainStack", { screen, params });
        nav.closeDrawer();
    };

    const handleLogout = async () => {
        nav.closeDrawer();
        nav.navigate("MainStack", { screen: "Profile" });
        await signOut();
    };

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.brandRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>Tienda Trigo</Text>
                        <Text style={styles.sub}>FakeStore · Expo</Text>
                    </View>

                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>v1</Text>
                    </View>
                </View>
            </View>

            {/* Main items */}
            <View style={styles.items}>
                <DrawerItemList {...props} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Más</Text>

                    <DrawerItem
                        label="Buscar"
                        labelStyle={styles.itemLabel}
                        icon={({ size, color }) => (
                            <AntDesign name="search" size={size} color={color} />
                        )}
                        onPress={() => go("Search")}
                        inactiveTintColor="#6B7280"
                        activeTintColor="#111827"
                        inactiveBackgroundColor="transparent"
                        activeBackgroundColor="#F3F4F6"
                        style={styles.drawerItem}
                    />

                    <DrawerItem
                        label="Detalles"
                        labelStyle={styles.itemLabel}
                        icon={({ size, color }) => (
                            <AntDesign name="profile" size={size} color={color} />
                        )}
                        onPress={() => go("Details", { from: "drawer" })}
                        inactiveTintColor="#6B7280"
                        activeTintColor="#111827"
                        inactiveBackgroundColor="transparent"
                        activeBackgroundColor="#F3F4F6"
                        style={styles.drawerItem}
                    />

                    <DrawerItem
                        label="Acerca de"
                        labelStyle={styles.itemLabel}
                        icon={({ size, color }) => (
                            <AntDesign name="info-circle" size={size} color={color} />
                        )}
                        onPress={() => go("About")}
                        inactiveTintColor="#6B7280"
                        activeTintColor="#111827"
                        inactiveBackgroundColor="transparent"
                        activeBackgroundColor="#F3F4F6"
                        style={styles.drawerItem}
                    />
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={handleLogout}
                    activeOpacity={0.9}
                    style={styles.logoutBtn}
                >
                    <AntDesign name="logout" size={16} color="#7F1D1D" />
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>

                <Text style={styles.footerHint}>© 2026 MiApp</Text>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: { flexGrow: 1, backgroundColor: "#FFFFFF" },

    header: {
        paddingHorizontal: 18,
        paddingTop: 14,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        backgroundColor: "#FAFAFA",
    },

    brandRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: "900",
        color: "#111827",
        lineHeight: 20,
    },

    sub: {
        marginTop: 2,
        fontSize: 12,
        fontWeight: "600",
        color: "#6B7280",
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#374151",
    },

    items: {
        flex: 1,
        paddingTop: 8,
        paddingHorizontal: 10,
    },

    section: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },

    sectionTitle: {
        paddingHorizontal: 10,
        paddingBottom: 8,
        fontSize: 12,
        fontWeight: "800",
        color: "#9CA3AF",
        letterSpacing: 1,
        textTransform: "uppercase",
    },

    drawerItem: {
        borderRadius: 12,
        marginVertical: 2,
    },

    itemLabel: {
        fontWeight: "800",
    },

    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },

    logoutBtn: {
        height: 46,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#FCA5A5",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FEF2F2",
        flexDirection: "row",
        gap: 10,
    },

    logoutText: {
        color: "#7F1D1D",
        fontSize: 14,
        fontWeight: "900",
    },

    footerHint: {
        marginTop: 10,
        textAlign: "center",
        fontSize: 12,
        color: "#9CA3AF",
        fontWeight: "600",
    },
});