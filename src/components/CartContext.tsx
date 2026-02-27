import React, { createContext, useContext, useMemo, useReducer } from "react";
import type { Product } from "../api/types/IProducts";

export type CartItem = {
    product: Product;
    qty: number;
};

type CartState = {
    items: Record<number, CartItem>; // key = product.id
};

type CartAction =
    | { type: "ADD"; product: Product; qty: number }
    | { type: "REMOVE"; productId: number }
    | { type: "SET_QTY"; productId: number; qty: number }
    | { type: "CLEAR" };

const initialState: CartState = { items: {} };

function reducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD": {
            const id = action.product.id;
            const existing = state.items[id];
            const nextQty = (existing?.qty ?? 0) + action.qty;

            return {
                ...state,
                items: {
                    ...state.items,
                    [id]: { product: action.product, qty: nextQty },
                },
            };
        }
        case "REMOVE": {
            const next = { ...state.items };
            delete next[action.productId];
            return { ...state, items: next };
        }
        case "SET_QTY": {
            if (action.qty <= 0) {
                const next = { ...state.items };
                delete next[action.productId];
                return { ...state, items: next };
            }
            const existing = state.items[action.productId];
            if (!existing) return state;
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.productId]: { ...existing, qty: action.qty },
                },
            };
        }
        case "CLEAR":
            return initialState;
        default:
            return state;
    }
}

type CartContextValue = {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    addItem: (product: Product, qty?: number) => void;
    removeItem: (productId: number) => void;
    setQty: (productId: number, qty: number) => void;
    clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const items = useMemo(() => Object.values(state.items), [state.items]);

    const totalItems = useMemo(
        () => items.reduce((sum, it) => sum + it.qty, 0),
        [items]
    );

    const totalPrice = useMemo(
        () => items.reduce((sum, it) => sum + it.qty * it.product.price, 0),
        [items]
    );

    const value = useMemo<CartContextValue>(() => ({
        items,
        totalItems,
        totalPrice,
        addItem: (product, qty = 1) => dispatch({ type: "ADD", product, qty }),
        removeItem: (productId) => dispatch({ type: "REMOVE", productId }),
        setQty: (productId, qty) => dispatch({ type: "SET_QTY", productId, qty }),
        clear: () => dispatch({ type: "CLEAR" }),
    }), [items, totalItems, totalPrice]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within <CartProvider />");
    return ctx;
}