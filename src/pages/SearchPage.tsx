import { searchRestaurants } from "@/api/RestaurantApi"
import CuisineFilter from "@/components/CuisineFilter"
import PaginationSelector from "@/components/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import SearchResultCard from "@/components/SearchResultCard"
import SearchResultInfo from "@/components/SearchResultInfo"
import { useState } from "react"
import { useParams } from "react-router-dom"

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines?: string[];
}

const SearchPage = () => {
  const { city } = useParams()
  const [searchState, setSearchState] = useState<SearchState>({ 
    searchQuery: "",
    page: 1 ,
    selectedCuisines: []
  })
  const { restaurants, isLoading } = searchRestaurants(searchState, city)

  const setSelectedCuisines = (cuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines: cuisines,
      page: 1
    }))
  }

  const setSearchQuery = (searchFormData: SearchForm) => {
    console.log(searchFormData)
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.query
    }))
  }

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page
    }))
  }

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1
    })
    )
  }

  console.log(restaurants)
  if (isLoading) {
    return <span>Loading...</span>
  }
  if (!restaurants?.data && !city) {
    return <span>No results found</span>
  }
  return (
    // <span>
    //   User searched for {city}{""}
    //   <span>
    //     {restaurants?.data.map((restaurant) => (
    //       <span> found - {restaurant.name}, {restaurant.city}</span>
    //     ))}
    //   </span>
    // </span>
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter 
          onChange={setSelectedCuisines} 
          selectedCuisines={searchState.selectedCuisines || []} 
          isExpanded={true} 
          onExpandedClick={() => {}}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant name"
          onReset={resetSearch} />
        <SearchResultInfo total={restaurants?.data.length || 0} city={city || ""} />
        {restaurants?.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={restaurants?.meta.currentPage || 1}
          pages={restaurants?.meta.totalPages || 1}
          onPageChange={(page) => setPage(page)} 
        />
      </div>
    </div>
  )
}

export default SearchPage