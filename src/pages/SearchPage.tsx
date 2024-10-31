import { searchRestaurants } from "@/api/RestaurantApi"
import { useParams } from "react-router-dom"

const SearchPage = () => {
    const {city} = useParams()
    const { restaurants} = searchRestaurants(city)
    console.log(restaurants)
  return (
    <span>
        User searched for {city}{""}
        <span>
            {restaurants?.data.map((restaurant) => (
               <span> found - {restaurant.name}, {restaurant.city}</span>
            ))}
        </span>
    </span>
  )
}

export default SearchPage