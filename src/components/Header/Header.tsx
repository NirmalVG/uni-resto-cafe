"use client"

import React from "react"
import { FaShoppingCart } from "react-icons/fa"
import { useAppSelector } from "@/store/hooks"
import { ApiResponse } from "@/types"

interface HeaderProps {
  data: ApiResponse
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const { totalItems } = useAppSelector((state) => state.cart)
  return (
    <div className="flex items-center justify-between p-4">
      <h2 className="text-2xl text-[#878787]">{data.restaurant_name}</h2>

      <ul className="flex flex-row space-x-4">
        <li className="text-lg text-[#878787] cursor-pointer">My orders</li>

        <li className="text-[#878787] relative cursor-pointer">
          <FaShoppingCart className="w-6 h-6 text-gray-600" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {totalItems}
            </span>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Header
