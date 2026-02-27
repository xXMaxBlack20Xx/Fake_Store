import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    Pressable,
    TextInput,
    FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { MainStackParamList } from "../../navigation/type/types";
import type { Product } from "../../api/types/IProducts";
import { getAllProducts } from "../../api/products/getAllProducts";
import { useCart } from "../../components/CartContext";
import ProductDetailCard from "../../components/ProductDetailCard";

type Props = NativeStackScreenProps<MainStackParamList, "Search">;

export default function Search({ navigation }: Props) {
    const { addItem } = useCart();

    const [query, setQuery] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [selected, setSelected] = useState<Product | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getAllProducts();
                if (mounted) setProducts(data);
            } catch (e) {
                if (mounted) setError(e instanceof Error ? e.message : "Error desconocido");
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return products;
        return products.filter((p) => {
            return (
                p.title.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
            );
        });
    }, [query, products]);

    if (loading) {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.center}>
                    <ActivityIndicator />
                    <Text style={styles.muted}>Cargando productos...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.center}>
                    <Text style={styles.errorTitle}>No se pudo cargar</Text>
                    <Text style={styles.muted}>{error}</Text>

                    <Pressable onPress={() => navigation.goBack()} style={styles.secondaryBtn}>
                        <Text style={styles.secondaryText}>Volver</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                {/* Search bar */}
                <View style={styles.searchWrap}>
                    <TextInput
                        value={query}
                        onChangeText={(t) => {
                            setQuery(t);
                            setSelected(null); // reset detail when typing
                        }}
                        placeholder="Buscar productos..."
                        placeholderTextColor="#9CA3AF"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.searchInput}
                    />
                    {query.length > 0 ? (
                        <Pressable onPress={() => { setQuery(""); setSelected(null); }} style={styles.clearBtn}>
                            <Text style={styles.clearText}>×</Text>
                        </Pressable>
                    ) : null}
                </View>

                {selected ? (
                    <ProductDetailCard
                        product={selected}
                        secondaryLabel="Volver a resultados"
                        primaryLabel="Agregar"
                        onSecondaryPress={() => setSelected(null)}
                        onPrimaryPress={() => addItem(selected, 1)}
                    />
                ) : (
                    <>
                        <Text style={styles.kicker}>
                            {query.trim()
                                ? `${filtered.length} resultado(s)`
                                : `Todos los productos (${products.length})`}
                        </Text>

                        <FlatList
                            data={filtered}
                            keyExtractor={(item) => String(item.id)}
                            contentContainerStyle={{ paddingBottom: 24 }}
                            renderItem={({ item }) => (
                                <Pressable onPress={() => setSelected(item)} style={styles.resultRow}>
                                    <Image source={{ uri: item.image }} style={styles.thumb} />
                                    <View style={{ flex: 1 }}>
                                        <Text numberOfLines={2} style={styles.resultTitle}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.resultMeta}>
                                            {item.category} · ${item.price.toFixed(2)}
                                        </Text>
                                    </View>
                                </Pressable>
                            )}
                            ListEmptyComponent={
                                <View style={styles.empty}>
                                    <Text style={styles.muted}>No hay resultados para “{query.trim()}”.</Text>
                                </View>
                            }
                        />
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#fff" },
    container: { flex: 1, padding: 20, gap: 12 },

    searchWrap: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 14,
        paddingHorizontal: 12,
        height: 48,
        backgroundColor: "#FFFFFF",
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: "#111827",
        fontWeight: "700",
    },
    clearBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F3F4F6",
    },
    clearText: {
        fontSize: 22,
        fontWeight: "900",
        color: "#111827",
        marginTop: -2
    },
    kicker: {
        fontSize: 12,
        fontWeight: "900",
        color: "#6B7280",
        letterSpacing: 0.6,
        marginTop: 4,
    },

    resultRow: {
        flexDirection: "row",
        gap: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
        alignItems: "center",
    },
    thumb: { width: 44, height: 44, resizeMode: "contain", backgroundColor: "#fff" },
    resultTitle: { fontSize: 14, fontWeight: "900", color: "#111827" },
    resultMeta: { marginTop: 4, fontSize: 12, color: "#6B7280", fontWeight: "700" },

    detailCard: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        padding: 14,
        backgroundColor: "#FFFFFF",
    },
    image: { width: "100%", height: 220, resizeMode: "contain", marginBottom: 10 },
    title: { fontSize: 16, fontWeight: "900", color: "#111827" },
    price: { fontSize: 16, fontWeight: "900", color: "#111827", marginTop: 6 },
    desc: { fontSize: 13, color: "#4B5563", lineHeight: 19, marginTop: 8 },

    row: { flexDirection: "row", gap: 10, marginTop: 12 },

    primaryBtn: {
        flex: 1,
        height: 48,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111827",
    },
    primaryText: { color: "#fff", fontWeight: "900" },

    secondaryBtnInline: {
        flex: 1,
        height: 48,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    secondaryBtn: {
        marginTop: 12,
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
    },
    secondaryText: { fontWeight: "900", color: "#111827" },

    center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10, padding: 20 },
    muted: { color: "#6B7280", textAlign: "center" },
    errorTitle: { fontSize: 18, fontWeight: "900", color: "#111827" },
    empty: { paddingVertical: 20 },
});