import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerContentComponentProps,
    DrawerItem,
} from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.avatarWrap}>
                    <Image
                        source={{
                            uri: "https://cdn0.expertoanimal.com/es/razas/9/0/5/rana-arboricola-verde_509_0_600.webp",
                        }}
                        style={styles.avatar}
                    />
                </View>

                <Text style={styles.name}>Rodrigo Maximo Trigo</Text>
                <Text style={styles.email}>rtrigom@outlook.com</Text>
            </View>

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
                        onPress={() => {
                            props.navigation.navigate("MainStack", { screen: "Search" } as never);
                            props.navigation.closeDrawer();
                        }}
                        inactiveTintColor="#6B7280"
                        activeTintColor="#111827"
                    />

                    <DrawerItem
                        label="Detalles"
                        labelStyle={styles.itemLabel}
                        icon={({ size, color }) => (
                            <AntDesign name="profile" size={size} color={color} />
                        )}
                        onPress={() => {
                            props.navigation.navigate(
                                "MainStack",
                                { screen: "Details", params: { from: "drawer" } } as never
                            );
                            props.navigation.closeDrawer();
                        }}
                        inactiveTintColor="#6B7280"
                        activeTintColor="#111827"
                    />

                    <DrawerItem
                        label="Acerca de"
                        labelStyle={styles.itemLabel}
                        icon={({ size, color }) => (
                            <AntDesign name="info-circle" size={size} color={color} />
                        )}
                        onPress={() => {
                            props.navigation.navigate("MainStack", { screen: "About" } as never);
                            props.navigation.closeDrawer();
                        }}
                        inactiveTintColor="#6B7280"
                        activeTintColor="#111827"
                    />

                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => props.navigation.closeDrawer()}
                    activeOpacity={0.9}
                    style={styles.logoutBtn}
                >
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
        paddingHorizontal: 24,
        paddingTop: 15,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },
    avatarWrap: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        overflow: "hidden",
    },
    avatar: { width: 56, height: 56 },
    name: {
        fontSize: 18,
        fontWeight: "900",
        color: "#111827",
        lineHeight: 22,
    },
    email: {
        marginTop: 4,
        fontSize: 13,
        fontWeight: "600",
        color: "#6B7280",
    },
    items: {
        flex: 1,
        paddingTop: 8,
        paddingHorizontal: 8,
    },

    section: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },
    sectionTitle: {
        paddingHorizontal: 16,
        paddingBottom: 6,
        fontSize: 12,
        fontWeight: "800",
        color: "#9CA3AF",
        letterSpacing: 1,
    },
    itemLabel: {
        fontWeight: "800",
    },

    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },
    logoutBtn: {
        height: 46,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    logoutText: { color: "#111827", fontSize: 14, fontWeight: "800" },
    footerHint: {
        marginTop: 10,
        textAlign: "center",
        fontSize: 12,
        color: "#9CA3AF",
        fontWeight: "600",
    },
});