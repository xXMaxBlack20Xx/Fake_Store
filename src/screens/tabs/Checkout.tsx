import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../components/CartContext";

export default function Checkout() {
    const navigation = useNavigation<any>();
    const { clear, totalItems, totalPrice } = useCart();

    // 1) Snapshot totals BEFORE clearing
    const [snapshot] = useState(() => ({
        items: totalItems,
        total: totalPrice,
    }));

    // 2) Clear only once
    const clearedRef = useRef(false);
    useEffect(() => {
        if (clearedRef.current) return;
        clearedRef.current = true;
        clear();
    }, [clear]);

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <Text style={styles.kicker}>¡Listo!</Text>
                <Text style={styles.title}>Gracias por tu compra</Text>

                <Text style={styles.subtitle}>
                    Tu pedido fue procesado correctamente. En breve recibirás una confirmación.
                </Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Resumen</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Artículos</Text>
                        <Text style={styles.value}>{snapshot.items}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Total</Text>
                        <Text style={styles.value}>${snapshot.total.toFixed(2)}</Text>
                    </View>

                    <Text style={styles.hint}>
                        Nota: este es un checkout de demostración (FakeStore).
                    </Text>
                </View>

                <Pressable
                    onPress={() => navigation.navigate("HomeTabs")}
                    style={styles.primaryBtn}
                >
                    <Text style={styles.primaryText}>Seguir comprando</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.secondaryBtn}
                >
                    <Text style={styles.secondaryText}>Volver</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#fff" },

    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 28,
        gap: 14,
    },

    kicker: {
        fontSize: 12,
        fontWeight: "800",
        color: "#6B7280",
        letterSpacing: 1,
        textTransform: "uppercase",
    },

    title: {
        fontSize: 30,
        fontWeight: "900",
        color: "#111827",
        lineHeight: 36,
    },

    subtitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#4B5563",
        lineHeight: 20,
    },

    card: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        padding: 16,
        backgroundColor: "#FFFFFF",
        gap: 10,
    },

    cardTitle: {
        fontSize: 12,
        fontWeight: "900",
        color: "#6B7280",
        letterSpacing: 0.6,
        textTransform: "uppercase",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    label: { color: "#6B7280", fontWeight: "800" },
    value: { color: "#111827", fontWeight: "900" },

    hint: {
        marginTop: 6,
        fontSize: 12,
        color: "#9CA3AF",
        fontWeight: "600",
        lineHeight: 16,
    },

    primaryBtn: {
        height: 48,
        borderRadius: 14,
        backgroundColor: "#111827",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6,
    },
    primaryText: { color: "#fff", fontWeight: "900" },

    secondaryBtn: {
        height: 48,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    secondaryText: { color: "#111827", fontWeight: "900" },
});