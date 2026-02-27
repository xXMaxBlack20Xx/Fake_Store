import React from "react";
import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../components/CartContext";
import { useAuth } from "../auth/AuthContext";

export default function Cart() {
    const navigation = useNavigation<any>(); // quick + safe fix (you can strongly type later)
    const { items, totalPrice, setQty, removeItem, clear } = useCart();
    const { isAuthenticated } = useAuth();

    if (items.length === 0) {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.container}>
                    <Text style={styles.title}>Carrito</Text>
                    <Text style={styles.muted}>Tu carrito está vacío.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>Carrito</Text>
                    <Pressable onPress={clear} style={styles.clearBtn}>
                        <Text style={styles.clearText}>Vaciar</Text>
                    </Pressable>
                </View>

                <FlatList
                    data={items}
                    keyExtractor={(it) => String(it.product.id)}
                    contentContainerStyle={{ paddingBottom: 140 }}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Image source={{ uri: item.product.image }} style={styles.image} />

                            <View style={{ flex: 1 }}>
                                <Text numberOfLines={2} style={styles.itemTitle}>
                                    {item.product.title}
                                </Text>
                                <Text style={styles.price}>${item.product.price.toFixed(2)}</Text>

                                <View style={styles.qtyRow}>
                                    <Pressable
                                        onPress={() => setQty(item.product.id, item.qty - 1)}
                                        style={styles.qtyBtn}
                                    >
                                        <Text style={styles.qtyBtnText}>−</Text>
                                    </Pressable>

                                    <Text style={styles.qtyText}>{item.qty}</Text>

                                    <Pressable
                                        onPress={() => setQty(item.product.id, item.qty + 1)}
                                        style={styles.qtyBtn}
                                    >
                                        <Text style={styles.qtyBtnText}>+</Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => removeItem(item.product.id)}
                                        style={styles.removeBtn}
                                    >
                                        <Text style={styles.removeText}>Eliminar</Text>
                                    </Pressable>
                                </View>
                            </View>

                            <Text style={styles.lineTotal}>
                                ${(item.qty * item.product.price).toFixed(2)}
                            </Text>
                        </View>
                    )}
                />

                <View style={styles.footer}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
                    </View>

                    <Pressable
                        onPress={() => {
                            // You said Profile controls login, so send unauth users there
                            navigation.navigate(isAuthenticated ? "Checkout" : "Profile");
                        }}
                        style={styles.checkoutBtn}
                    >
                        <Text style={styles.checkoutText}>Checkout</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#fff" },
    container: { flex: 1, padding: 20 },

    headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    title: { fontSize: 28, fontWeight: "900", color: "#111827" },
    muted: { marginTop: 10, color: "#6B7280", fontWeight: "700" },

    clearBtn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    clearText: { fontWeight: "900", color: "#111827" },

    row: {
        flexDirection: "row",
        gap: 12,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
        alignItems: "flex-start",
    },
    image: { width: 54, height: 54, resizeMode: "contain" },

    itemTitle: { fontSize: 14, fontWeight: "900", color: "#111827" },
    price: { marginTop: 6, fontSize: 13, fontWeight: "800", color: "#111827" },

    qtyRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 },
    qtyBtn: {
        width: 34,
        height: 34,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
    },
    qtyBtnText: { fontSize: 18, fontWeight: "900", color: "#111827", marginTop: -1 },
    qtyText: { fontWeight: "900", color: "#111827", minWidth: 18, textAlign: "center" },

    removeBtn: { marginLeft: "auto", paddingHorizontal: 8, paddingVertical: 6 },
    removeText: { color: "#B91C1C", fontWeight: "900" },

    lineTotal: { fontWeight: "900", color: "#111827" },

    footer: {
        position: "absolute",
        left: 20,
        right: 20,
        bottom: 16,
        padding: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#fff",
    },
    totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
    totalLabel: { fontWeight: "900", color: "#111827" },
    totalValue: { fontWeight: "900", color: "#111827" },

    checkoutBtn: {
        height: 48,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111827",
    },
    checkoutText: { color: "#fff", fontWeight: "900" },
});