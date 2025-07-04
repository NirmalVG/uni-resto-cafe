import Header from "@/components/Header/Header"
import CategoryTabs from "@/components/CategoryTabs/CategoryTabs"
import ProductList from "@/components/ProductList/ProductList"
import { ApiResponse } from "@/types"
import { ReduxProvider } from "@/store/provider"

interface RawApiResponse {
  data: ApiResponse[]
}

async function getMenuData(): Promise<ApiResponse | null> {
  try {
    const response = await fetch(
      "https://zartek-task.vercel.app/api/resto-cafe",
      {
        cache: "no-store",
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Error: ${response.status} - ${errorText}`)
      throw new Error(`Failed to fetch menu data: ${response.status}`)
    }

    const rawResult: RawApiResponse = await response.json()
    console.log("Raw API response:", rawResult)

    if (Array.isArray(rawResult.data) && rawResult.data.length > 0) {
      const actualData = rawResult.data[0]
      console.log("Parsed API response (first element):", actualData)

      return actualData as ApiResponse
    } else {
      console.error(
        "API response 'data' array is empty or not an array:",
        rawResult
      )
      return null
    }
  } catch (error) {
    console.error("Error fetching menu data:", error)
    return null
  }
}

export default async function Home() {
  const data = await getMenuData()
  console.log("Fetched data in Home component:", data)

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Failed to load menu data. Please try again later.</p>
      </div>
    )
  }

  return (
    <ReduxProvider>
      <div>
        <Header data={data} />
        <CategoryTabs data={data?.table_menu_list} />
        <ProductList data={data} />
      </div>
    </ReduxProvider>
  )
}
