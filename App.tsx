import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootNavigation } from "./src/navigation";
import { AuthProvider } from "./src/screens/auth/AuthContext";
import { CartProvider } from "./src/components/CartContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <CartProvider>
            <RootNavigation />
          </CartProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}