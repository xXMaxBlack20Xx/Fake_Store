import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ScrollView,
    Platform,
    ToastAndroid,
    Animated,
} from "react-native";
import type { Product } from "../api/types/IProducts";

type Props = {
    product: Product;
    primaryLabel?: string;
    secondaryLabel?: string;
    onPrimaryPress?: () => void;
    onSecondaryPress?: () => void;
};

export default function ProductDetailCard({
    product,
    primaryLabel = "Agregar",
    secondaryLabel = "Volver",
    onPrimaryPress,
    onSecondaryPress,
}: Props) {
    const [showToast, setShowToast] = useState(false);
    const opacity = useRef(new Animated.Value(0)).current;

    const triggerToast = () => {
        if (Platform.OS === "android") {
            ToastAndroid.show("Agregado al carrito", ToastAndroid.SHORT);
            return;
        }

        // iOS / fallback
        setShowToast(true);
        opacity.setValue(0);

        Animated.sequence([
            Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
            Animated.delay(900),
            Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
        ]).start(() => setShowToast(false));
    };

    const handlePrimaryPress = () => {
        onPrimaryPress?.();
        triggerToast();
    };

    return (
        <View style={{ flex: 1 }}>
            {/* iOS toast */}
            {showToast && Platform.OS !== "android" ? (
                <Animated.View style={[styles.toast, { opacity }]}>
                    <Text style={styles.toastText}>Agregado al carrito</Text>
                </Animated.View>
            ) : null}

            <ScrollView
                style={styles.wrapper}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.detailCard}>
                    <Image source={{ uri: product.image }} style={styles.image} />

                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                    <Text style={styles.desc}>{product.description}</Text>

                    {(onSecondaryPress || onPrimaryPress) && (
                        <View style={styles.row}>
                            {onSecondaryPress && (
                                <Pressable onPress={onSecondaryPress} style={styles.secondaryBtn}>
                                    <Text style={styles.secondaryText}>{secondaryLabel}</Text>
                                </Pressable>
                            )}

                            {onPrimaryPress && (
                                <Pressable onPress={handlePrimaryPress} style={styles.primaryBtn}>
                                    <Text style={styles.primaryText}>{primaryLabel}</Text>
                                </Pressable>
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { flex: 1 },

    content: { paddingBottom: 32 },

    detailCard: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        padding: 14,
        backgroundColor: "#FFFFFF",
    },

    image: {
        width: "100%",
        height: 240,
        resizeMode: "contain",
        marginBottom: 10,
    },

    title: {
        fontSize: 18,
        fontWeight: "900",
        color: "#111827",
    },

    price: {
        fontSize: 18,
        fontWeight: "900",
        color: "#111827",
        marginTop: 6,
    },

    desc: {
        fontSize: 14,
        color: "#4B5563",
        lineHeight: 20,
        marginTop: 10,
    },

    row: {
        flexDirection: "row",
        gap: 10,
        marginTop: 16,
    },

    primaryBtn: {
        flex: 1,
        height: 48,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111827",
    },

    primaryText: { color: "#fff", fontWeight: "900" },

    secondaryBtn: {
        flex: 1,
        height: 48,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },

    secondaryText: { fontWeight: "900", color: "#111827" },

    toast: {
        position: "absolute",
        top: 10,
        left: 16,
        right: 16,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 14,
        backgroundColor: "#111827",
        zIndex: 50,
    },
    toastText: {
        color: "#FFFFFF",
        fontWeight: "900",
        textAlign: "center",
    },
});