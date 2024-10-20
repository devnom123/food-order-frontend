import ManageRestaurantForm from '../forms/manage-restaurant-form/ManageRestaurantForm'
import { createMyRestaurant, getMyRestaurant, updateMyRestaurant } from '@/api/RestaurantApi'

const ManageRestaurantPage = () => {
  const {createRestaurant,isLoading} = createMyRestaurant()
  const { restaurant, isLoading:getLoading} = getMyRestaurant()
  const {updateRestaurant,isLoading:updateLoading} = updateMyRestaurant()
  console.log("createRestaurant",createRestaurant)
  const isEditing = !!restaurant
  return (
    <ManageRestaurantForm 
    restaurant={restaurant}
    onSave = {isEditing ? updateRestaurant : createRestaurant} 
    isLoading={isLoading || updateLoading} 
    />
  )
}

export default ManageRestaurantPage