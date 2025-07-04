import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
  category_dish_id: string
  dish_name: string
  dish_price: number
  quantity: number
  dish_currency: string
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalAmount: number
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(
        (item) => item.category_dish_id === action.payload.category_dish_id
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.dish_price * item.quantity,
        0
      )
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item.category_dish_id === action.payload
      )

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1
        } else {
          state.items = state.items.filter(
            (item) => item.category_dish_id !== action.payload
          )
        }
      }

      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.dish_price * item.quantity,
        0
      )
    },
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalAmount = 0
    },
  },
})

export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
