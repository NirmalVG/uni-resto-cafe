import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Category } from "@/types"

interface MenuState {
  categories: Category[]
  activeCategory: string
  isLoading: boolean
  error: string | null
}

const initialState: MenuState = {
  categories: [],
  activeCategory: "",
  isLoading: false,
  error: null,
}

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload
      if (action.payload.length > 0 && !state.activeCategory) {
        state.activeCategory = action.payload[0].menu_category_id
      }
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setCategories, setActiveCategory, setLoading, setError } =
  menuSlice.actions
export default menuSlice.reducer
