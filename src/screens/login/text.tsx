import React, { useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { useAuth } from "../auth/AuthContext";
import { HttpError } from "../../api";

export default function LoginScreen() {
    const { signIn } = useAuth();
    const [username, setUsername] = useState("mor_2314");
    const [password, setPassword] = useState("83r5^_");
    const [error, setError] = useState<string | null>(null);

    const onLogin = async () => {
        setError(null);
        try {
            await signIn(username.trim(), password);
        } catch (e) {
            if (e instanceof HttpError) setError(e.message);
            else setError("Unexpected error");
        }
    };

    return (
        <View style={{ padding: 16, gap: 10 }}>
            <TextInput value={username} onChangeText={setUsername} placeholder="username" />
            <TextInput value={password} onChangeText={setPassword} placeholder="password" secureTextEntry />
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
            <Pressable onPress={onLogin} style={{ padding: 12, backgroundColor: "black" }}>
                <Text style={{ color: "white", fontWeight: "800" }}>Login</Text>
            </Pressable>
        </View>
    );
}