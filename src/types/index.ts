export interface CategoryDish {
  dish_id: string
  dish_name: string
  dish_price: number
  dish_image: string
  dish_currency: string
  dish_calories: number
  dish_description: string
  dish_Availability: boolean
  dish_Type: number
  addonCat?: AddonCategory[]
}

export interface AddonCategory {
  addon_category: string
  addon_category_id: string
  addon_selection: number
  nexturl: string
  Addons: Addon[]
}

export interface Addon {
  dish_Availability: boolean
  addon_price: number
  addon_name: string
  addon_id: string
}

export interface Dish {
  dish_id: string
  dish_name: string
  dish_price: number
  dish_image: string
  dish_currency: string
  dish_calories: number
  dish_description: string
  dish_Availability: boolean
  dish_Type: number
}

export interface Category {
  menu_category_id: string
  menu_category: string
  menu_category_image: string
  nexturl: string
  category_dishes: Dish[]
}

export interface ApiResponse {
  restaurant_name: string
  restaurant_image: string
  table_id: string
  table_name: string
  branch_name: string
  nexturl: string
  table_menu_list: Category[]
}
