"use client"
import React, { useEffect } from "react"
import { Category } from "@/types"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setCategories, setActiveCategory } from "@/store/slices/menuSlice"

interface CategoryProps {
  data: Category[]
}

const CategoryTabs: React.FC<CategoryProps> = ({ data }) => {
  const dispatch = useAppDispatch()
  const { activeCategory } = useAppSelector((state) => state.menu)

  const handleCategoryClick = (categoryId: string) => {
    dispatch(setActiveCategory(categoryId))
  }

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(setCategories(data))
    }
  }, [data, dispatch])

  return (
    <div className="flex overflow-x-auto pb-1 scrollbar-thin cursor-pointer">
      {data?.map((category) => {
        return (
          <button
            key={category.menu_category_id}
            className={`px-10 flex-shrink-0 border-b-2 cursor-pointer ${
              activeCategory === category.menu_category_id
                ? "text-red-500 border-red-500"
                : "text-gray-600 border-transparent hover:text-red-400"
            }`}
            onClick={() => handleCategoryClick(category.menu_category_id)}
          >
            {category.menu_category}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryTabs
