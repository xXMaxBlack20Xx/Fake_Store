import React from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/type/types";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<MainStackParamList, "Details">;

export default function Details({ navigation, route }: Props) {

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.container}>
                <Text style={styles.kicker}>MIAPP_V2</Text>
                <Text style={styles.title}>Detalles</Text>

                {/* Card principal */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Información</Text>
                    <Text style={styles.cardText}>
                        Aquí puedes mostrar datos dinámicos, parámetros de navegación
                        o contenido detallado relacionado a un elemento.
                    </Text>
                </View>

                {/* Botón volver */}
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
    safe: {
        flex: 1,
        backgroundColor: "#FFFFFF",
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
        padding: 16,
        marginBottom: 14,
        backgroundColor: "#FFFFFF",
    },
    cardTitle: {
        fontSize: 12,
        color: "#6B7280",
        fontWeight: "800",
        marginBottom: 6,
        letterSpacing: 0.3,
    },
    cardText: {
        fontSize: 14,
        color: "#111827",
        fontWeight: "600",
        lineHeight: 20,
    },
    secondaryBtn: {
        height: 50,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    secondaryText: {
        fontSize: 14,
        fontWeight: "900",
        color: "#111827",
    },
});