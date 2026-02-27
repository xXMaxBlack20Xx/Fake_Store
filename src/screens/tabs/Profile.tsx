import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../auth/AuthContext";
import { HttpError } from "../../api";

export default function Login() {
    const { signIn } = useAuth();

    const [username, setUsername] = useState("mor_2314");
    const [password, setPassword] = useState("83r5^_");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setLoading(true);
            setError(null);
            await signIn(username.trim(), password);
        } catch (e) {
            if (e instanceof HttpError) setError(e.message);
            else setError("No se pudo iniciar sesión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <Text style={styles.title}>Iniciar sesión</Text>

                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Usuario"
                    autoCapitalize="none"
                    style={styles.input}
                />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Contraseña"
                    secureTextEntry
                    style={styles.input}
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <Pressable disabled={loading} onPress={onSubmit} style={styles.btn}>
                    <Text style={styles.btnText}>{loading ? "Entrando..." : "Entrar"}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#fff" },
    container: { flex: 1, padding: 20, gap: 12, justifyContent: "center" },
    title: { fontSize: 28, fontWeight: "900", color: "#111827", marginBottom: 12 },
    input: {
        height: 48,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        paddingHorizontal: 12,
        fontWeight: "700",
    },
    btn: {
        height: 48,
        borderRadius: 14,
        backgroundColor: "#111827",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6,
    },
    btnText: { color: "#fff", fontWeight: "900" },
    error: { color: "#B91C1C", fontWeight: "800" },
});