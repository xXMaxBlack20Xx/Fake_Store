import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Settings() {
    return (
        <SafeAreaProvider style={styles.safe}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.container}>
                <Text style={styles.kicker}>Configuración</Text>
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.subtitle}>
                    Personaliza la experiencia en la aplicación.
                </Text>

                <View style={styles.section}>
                    <Pressable style={styles.item}>
                        <Text style={styles.itemText}>Perfil</Text>
                    </Pressable>

                    <Pressable style={styles.item}>
                        <Text style={styles.itemText}>Notificaciones</Text>
                    </Pressable>

                    <Pressable style={styles.item}>
                        <Text style={styles.itemText}>Privacidad</Text>
                    </Pressable>

                    <Pressable style={styles.item}>
                        <Text style={styles.itemText}>Modo oscuro</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        alignItems: "flex-start",
    },
    kicker: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6B7280",
        marginBottom: 8,
        letterSpacing: 1,
    },
    title: {
        fontSize: 36,
        fontWeight: "900",
        color: "#111827",
    },
    subtitle: {
        marginTop: 10,
        fontSize: 15,
        color: "#4B5563",
        marginBottom: 30,
    },
    section: {
        width: "100%",
    },
    item: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    itemText: {
        fontSize: 16,
        color: "#111827",
        fontWeight: "500",
    },
});