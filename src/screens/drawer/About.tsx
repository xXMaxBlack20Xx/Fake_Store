import React from "react";
import { View, Text, StyleSheet, Pressable, StatusBar } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/type/types";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<MainStackParamList, "About">;

export default function About({ navigation }: Props) {
    const onActionCardPress = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.container}>
                <Text style={styles.kicker}>MIAPP_V2</Text>
                <Text style={styles.title}>Acerca de</Text>
                <Text style={styles.subtitle}>
                    Una app de práctica para mejorar UI, navegación y manejo de inputs.
                </Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Versión</Text>
                    <Text style={styles.cardValue}>1.0.0</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Tecnologías</Text>
                    <Text style={styles.cardValue}>Expo • React Native • Navigation</Text>
                </View>

                {/* ✅ Action Card */}
                <Pressable onPress={onActionCardPress} style={styles.actionCard}>
                    <Text style={styles.actionTitle}>Abrir menú</Text>
                </Pressable>

                {/* Buttons */}
                <View style={styles.row}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.secondaryBtn}>
                        <Text style={styles.secondaryText}>Volver</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate("HomeTabs", { screen: "Settings" })}
                        style={styles.primaryBtn}
                    >
                        <Text style={styles.primaryText}>Settings</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    kicker: {
        fontSize: 12,
        fontWeight: "800",
        color: "#6B7280",
        letterSpacing: 1,
        marginBottom: 8,
    },
    title: {
        fontSize: 34,
        fontWeight: "900",
        color: "#111827",
        lineHeight: 40,
    },
    subtitle: {
        marginTop: 10,
        fontSize: 14,
        color: "#4B5563",
        lineHeight: 20,
        marginBottom: 18,
    },
    card: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
        backgroundColor: "#FFFFFF",
    },
    cardTitle: {
        fontSize: 12,
        color: "#6B7280",
        fontWeight: "800",
        marginBottom: 6,
        letterSpacing: 0.3,
    },
    cardValue: {
        fontSize: 15,
        color: "#111827",
        fontWeight: "800",
    },
    actionCard: {
        borderWidth: 1,
        borderColor: "#111827",
        borderRadius: 16,
        padding: 16,
        marginTop: 6,
        backgroundColor: "#111827",
    },
    actionTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "900",
        marginBottom: 6,
    },
    row: {
        flexDirection: "row",
        gap: 10,
        marginTop: 16
    },
    secondaryBtn: {
        flex: 1,
        height: 52,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    secondaryText: {
        color: "#111827",
        fontWeight: "900"
    },
    primaryBtn: {
        flex: 1,
        height: 52,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111827",
    },
    primaryText: {
        color: "#FFFFFF",
        fontWeight: "900"
    },
});