import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { Product } from "../../api/types/IProducts";
import { getAllProducts } from "../../api/products/getAllProducts";
import { useCart } from "../../components/CartContext";
import ProductDetailCard from "../../components/ProductDetailCard";

export default function Home() {
    const { addItem } = useCart();

    const [hideHeader, setHideHeader] = useState(false);
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
                if (mounted) setError(e instanceof Error ? e.message : "Unknown error");
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const header = useMemo(() => {
        return (
            <View style={styles.headerWrap}>
                <Text style={styles.kicker}>Tienda Trigo</Text>
                <Text style={styles.title}>Bienvenido</Text>
                <Text style={styles.subtitle}>
                    Listo para empezar con las compras impulsivas?
                </Text>
            </View>
        );
    }, []);

    const onListScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setHideHeader(offsetY > 40);
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safe}>
                <StatusBar barStyle="dark-content" />
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
                <StatusBar barStyle="dark-content" />
                <View style={styles.center}>
                    <Text style={styles.errorTitle}>Error</Text>
                    <Text style={styles.muted}>{error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.container}>
                {selected ? (
                    <ProductDetailCard
                        product={selected}
                        secondaryLabel="Volver"
                        primaryLabel="Agregar al carrito"
                        onSecondaryPress={() => setSelected(null)}
                        onPrimaryPress={() => addItem(selected, 1)}
                    />
                ) : (
                    <FlatList
                        data={products}
                        keyExtractor={(item) => String(item.id)}
                        numColumns={2}
                        columnWrapperStyle={{ gap: 12 }}
                        contentContainerStyle={styles.listContent}
                        ListHeaderComponent={!hideHeader ? header : null}
                        onScroll={onListScroll}
                        scrollEventThrottle={16}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => setSelected(item)} style={styles.card}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <Text numberOfLines={2} style={styles.cardTitle}>
                                    {item.title}
                                </Text>
                                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                            </Pressable>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
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
    },

    headerWrap: {
        marginBottom: 16,
    },

    kicker: {
        fontSize: 13,
        fontWeight: "600",
        color: "#6B7280",
        letterSpacing: 1.5,
        marginBottom: 6,
    },

    title: {
        fontSize: 41,
        fontWeight: "900",
        color: "#111827",
        lineHeight: 44,
    },

    subtitle: {
        marginTop: 8,
        fontSize: 16,
        color: "#4B5563",
        lineHeight: 22,
    },

    listContent: {
        gap: 12,
        paddingBottom: 24,
    },

    card: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        padding: 12,
        backgroundColor: "#FFFFFF",
    },

    image: {
        height: 120,
        width: "100%",
        resizeMode: "contain",
        marginBottom: 10,
    },

    cardTitle: {
        fontSize: 13,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 6,
    },

    price: {
        fontSize: 14,
        fontWeight: "900",
        color: "#111827",
    },

    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: 24,
    },

    muted: { color: "#6B7280", textAlign: "center" },
    errorTitle: { fontSize: 18, fontWeight: "900", color: "#111827" },
});