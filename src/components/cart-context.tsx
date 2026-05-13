"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  productId: number;
  slug: string;
  title: string;
  image_url: string;
  quantity: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "bioathos.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, qty = 1) => {
    setItems((cur) => {
      const idx = cur.findIndex((i) => i.productId === item.productId);
      if (idx === -1) return [...cur, { ...item, quantity: qty }];
      const copy = [...cur];
      copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
      return copy;
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((cur) => cur.filter((i) => i.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: number, quantity: number) => {
    setItems((cur) =>
      cur
        .map((i) => (i.productId === productId ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items]
  );

  return (
    <Ctx.Provider value={{ items, count, addItem, removeItem, setQuantity, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
