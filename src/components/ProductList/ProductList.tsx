"use client"
import React from "react"
import { useAppSelector } from "@/store/hooks"
import ProductCard from "@/components/ProductCard/ProductCard"
import type { ApiResponse } from "@/types"

interface ProductListProps {
  data: ApiResponse
}

const ProductList: React.FC<ProductListProps> = ({ data }) => {
  const { activeCategory } = useAppSelector((state) => state.menu)

  const activeCategories = data?.table_menu_list?.find(
    (category) => category.menu_category_id === activeCategory
  )

  const dishes = activeCategories?.category_dishes || []

  if (dishes.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">No dishes available in this category.</p>
      </div>
    )
  }
  return (
    <section>
      {dishes.map((dish) => (
        <ProductCard key={dish.dish_id} dish={dish} />
      ))}
    </section>
  )
}

export default ProductList
