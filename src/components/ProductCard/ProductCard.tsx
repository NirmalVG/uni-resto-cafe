import React from "react"
import Image from "next/image"
import type { CategoryDish } from "@/types"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addItem, removeItem } from "@/store/slices/cartSlice"

interface ProductCardProps {
  dish: CategoryDish
}

const ProductCard: React.FC<ProductCardProps> = ({ dish }) => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)

  const currentItem = cartItems.find(
    (item) => item.category_dish_id === dish.dish_id
  )

  const quantity = currentItem?.quantity || 0

  const handleAddItem = () => {
    dispatch(
      addItem({
        category_dish_id: dish.dish_id,
        dish_name: dish.dish_name,
        dish_price: dish.dish_price,
        dish_currency: dish.dish_currency,
      })
    )
  }

  const handleRemoveItem = () => {
    dispatch(removeItem(dish.dish_id))
  }

  const getDishTypeIndicator = () => {
    return dish.dish_Type === 1 ? (
      <div className="border-2 border-green-500 w-5 h-5 flex items-center justify-center my-1">
        <div className="bg-green-500 rounded-full w-3 h-3"></div>
      </div>
    ) : (
      <div className="border-2 border-red-500 w-5 h-5 flex items-center justify-center my-1">
        <div className="bg-red-500 rounded-full w-3 h-3"></div>
      </div>
    )
  }

  const hasCustomizations = dish?.addonCat && dish?.addonCat.length > 0

  return (
    <div className="bg-white px-4 py-4 md:px-5 md:py-5 border-b border-gray-100">
      <div className="flex gap-3 md:hidden">
        <div className="flex-shrink-0 pt-1">{getDishTypeIndicator()}</div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 pr-3">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {dish?.dish_name}
              </h2>
              <p className="text-sm font-medium text-gray-900 mb-2">
                {dish?.dish_currency} {dish?.dish_price.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {dish?.dish_calories} calories
              </span>
              <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={
                    dish?.dish_image || "/placeholder.svg?height=64&width=64"
                  }
                  alt={dish.dish_name}
                  fill
                  className="object-cover"
                  sizes="64px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=64&width=64"
                  }}
                />
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-sm mb-3 leading-relaxed pr-20">
            {dish?.dish_description}
          </p>

          <div className="flex items-center justify-between">
            {dish?.dish_Availability ? (
              <div className="flex items-center bg-green-600 rounded-full px-4 py-2 min-w-[120px]">
                <button
                  onClick={handleRemoveItem}
                  disabled={quantity === 0}
                  className="text-white text-lg font-bold w-6 h-6 flex items-center justify-center disabled:opacity-50"
                  aria-label="Remove item"
                >
                  −
                </button>
                <span className="text-white font-medium mx-4 min-w-[1.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleAddItem}
                  className="text-white text-lg font-bold w-6 h-6 flex items-center justify-center"
                  aria-label="Add item"
                >
                  +
                </button>
              </div>
            ) : (
              <span className="text-red-500 text-sm font-medium">
                Not available
              </span>
            )}

            {hasCustomizations && (
              <span className="text-red-500 text-sm font-medium">
                Customizations Available
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:flex justify-between w-full">
        <div className="flex justify-start gap-3">
          <div className="flex-shrink-0">{getDishTypeIndicator()}</div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold">{dish?.dish_name}</h2>
            <p className="text-sm my-1">
              {dish?.dish_currency} {dish?.dish_price.toFixed(2)}
            </p>
            <p className="text-gray-400 my-1 text-sm leading-relaxed">
              {dish?.dish_description}
            </p>
            {dish?.dish_Availability ? (
              <div className="flex justify-between items-center rounded-2xl h-10 w-35 bg-green-700 text-white my-2 px-2">
                <button
                  onClick={handleRemoveItem}
                  className="w-8 h-8 cursor-pointer text-white flex items-center justify-center transition-colors text-lg font-bold"
                  aria-label="Remove item"
                >
                  -
                </button>
                <span className="min-w-[2rem] text-center font-medium text-lg">
                  {quantity}
                </span>
                <button
                  onClick={handleAddItem}
                  disabled={!dish?.dish_Availability}
                  className="w-8 h-8 text-white flex items-center cursor-pointer justify-center transition-colors disabled:cursor-not-allowed text-lg font-bold"
                  aria-label="Add item"
                >
                  +
                </button>
              </div>
            ) : (
              <p className="text-red-500">Not available</p>
            )}
            {hasCustomizations && (
              <p className="text-red-500">Customization available</p>
            )}
          </div>
        </div>
        <div className="flex flex-shrink-0 flex-row md:gap-50 justify-between">
          <div>{dish?.dish_calories} calories</div>
          <div className="w-[120px] h-[120px] relative">
            <Image
              src={dish?.dish_image || "/placeholder.svg?height=120&width=120"}
              alt={dish.dish_name}
              fill
              className="object-cover rounded-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=120&width=120"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
