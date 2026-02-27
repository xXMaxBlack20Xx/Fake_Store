import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../auth/AuthContext";
import { HttpError } from "../../api/https";
import { getStoredToken } from "../../api/auth/auth";
import { request } from "../../api/https";

export default function Profile() {
    const { signIn, signOut, token, isAuthenticated } = useAuth();

    const [username, setUsername] = useState("mor_2314");
    const [password, setPassword] = useState("83r5^_");
    const [loading, setLoading] = useState(false);

    const [statusMsg, setStatusMsg] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");

    // Sanity check: read token directly from SecureStore too
    useEffect(() => {
        (async () => {
            const stored = await getStoredToken();
            setStatusMsg(`Context token: ${token ? "YES" : "NO"} | Stored token: ${stored ? "YES" : "NO"}`);
        })();
    }, [token]);

    const handleLogin = async () => {
        try {
            setLoading(true);
            setErrorMsg("");
            setStatusMsg("Logging in...");

            await signIn(username.trim(), password);

            setStatusMsg("Login success ✅ Token saved & context updated.");
        } catch (e) {
            if (e instanceof HttpError) {
                setErrorMsg(`Login failed (${e.status}): ${e.message}\nBody: ${JSON.stringify(e.body)}`);
            } else {
                setErrorMsg("Login failed: Unknown error");
            }
            setStatusMsg("");
        } finally {
            setLoading(false);
        }
    };

    /**
     * FakeStore does NOT have a clean "me" endpoint.
     * So for sanity checking auth wiring, we do:
     * - call any endpoint with auth:true to confirm header attachment
     * - and show what happens (some endpoints ignore auth; some might 401 depending on clone/server)
     */
    const verifyAuthHeader = async () => {
        try {
            setLoading(true);
            setErrorMsg("");
            setStatusMsg("Verifying auth header (request with auth:true)...");

            // Use a simple endpoint; FakeStore may ignore auth.
            // If YOUR server/clone requires auth, it will validate the Bearer token here.
            const data = await request<any>("/carts", { auth: true });

            setStatusMsg(`Verify success ✅ Received ${Array.isArray(data) ? data.length : "data"} from /carts`);
        } catch (e) {
            if (e instanceof HttpError) {
                setErrorMsg(`Verify failed (${e.status}): ${e.message}\nBody: ${JSON.stringify(e.body)}`);
            } else {
                setErrorMsg("Verify failed: Unknown error");
            }
            setStatusMsg("");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await signOut();
        setStatusMsg("Logged out ✅ Token cleared.");
        setErrorMsg("");
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <Text style={styles.title}>Profile (Auth Control)</Text>

                <View style={styles.card}>
                    <Text style={styles.label}>Auth state</Text>
                    <Text style={styles.value}>
                        isAuthenticated: {String(isAuthenticated)}
                    </Text>
                    <Text style={styles.value}>
                        token in context: {token ? `${token.slice(0, 18)}...` : "null"}
                    </Text>
                </View>

                {!isAuthenticated ? (
                    <>
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

                        <Pressable disabled={loading} onPress={handleLogin} style={styles.btn}>
                            <Text style={styles.btnText}>{loading ? "Entrando..." : "Entrar"}</Text>
                        </Pressable>
                    </>
                ) : (
                    <>
                        <Pressable disabled={loading} onPress={verifyAuthHeader} style={styles.btnSecondary}>
                            <Text style={styles.btnSecondaryText}>
                                {loading ? "Verificando..." : "Verify auth header"}
                            </Text>
                        </Pressable>

                        <Pressable onPress={handleLogout} style={styles.btnDanger}>
                            <Text style={styles.btnText}>Cerrar sesión</Text>
                        </Pressable>
                    </>
                )}

                {statusMsg ? <Text style={styles.status}>{statusMsg}</Text> : null}
                {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

                <View style={{ height: 12 }} />

                <Pressable
                    onPress={async () => {
                        const stored = await getStoredToken();
                        setStatusMsg(`Manual check → Stored token: ${stored ? stored.slice(0, 18) + "..." : "null"}`);
                    }}
                    style={styles.btnGhost}
                >
                    <Text style={styles.btnGhostText}>Check stored token</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#F9FAFB"
    },

    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
        gap: 14,
        justifyContent: "flex-start",
    },

    title: {
        fontSize: 20,
        fontWeight: "800",
        color: "#1F2937",
        marginBottom: 6
    },

    card: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        padding: 16,
        gap: 6,
        backgroundColor: "#FFFFFF",
    },

    label: {
        fontSize: 12,
        fontWeight: "700",
        color: "#6B7280",
        letterSpacing: 0.4
    },

    value: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1F2937"
    },

    input: {
        height: 48,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        paddingHorizontal: 14,
        fontWeight: "600",
        backgroundColor: "#FFFFFF",
    },

    btn: {
        height: 48,
        borderRadius: 14,
        backgroundColor: "#374151",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
    },

    btnDanger: {
        height: 48,
        borderRadius: 14,
        backgroundColor: "#9B1C1C",
        alignItems: "center",
        justifyContent: "center",
    },

    btnSecondary: {
        height: 48,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },

    btnSecondaryText: {
        color: "#1F2937",
        fontWeight: "700"
    },

    btnText: {
        color: "#FFFFFF",
        fontWeight: "800"
    },

    status: {
        color: "#047857",
        fontWeight: "700"
    },

    error: {
        color: "#9B1C1C",
        fontWeight: "700"
    },

    btnGhost: {
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    btnGhostText: {
        fontWeight: "700",
        color: "#6B7280"
    },
});