import { TCartItem } from '@/types/cart';
import { RentalItem } from '@/types/rental';
import React, { createContext, useContext, useState } from 'react';
// import { CartItem, RentalItem } from '../';

interface CartContextType {
  cart: TCartItem[];
  addToCart: (item: RentalItem, startDate: string, endDate: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<TCartItem[]>([]);

  const addToCart = (item: RentalItem, startDate: string, endDate: string, quantity: number = 1) => {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.item.id === item.id);
    
    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        startDate,
        endDate,
        quantity
      };
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, { item, startDate, endDate, quantity }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, cartItem) => {
    const start = new Date(cartItem.startDate);
    const end = new Date(cartItem.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const price = cartItem.item.price['daily'] * (days || 1) * cartItem.quantity;
    return total + price;
  }, 0);

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};