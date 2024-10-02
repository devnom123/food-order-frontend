import { updateMyUser, getMyUser } from "@/api/MyUserApi"
import UserProfileForm from "../forms/user-profile-form/UserProfileForm"

const UserProfilePage = () => {
  const { updateUser, isLoading } = updateMyUser()
  const { getUser, isLoading: getLoading } = getMyUser()
  if (getLoading) {
    return <div>Loading...</div>
  }
  if(!getUser) {
    return <div>Unable to load user profile</div>
  }
  return (
    <UserProfileForm user={getUser} onSave={updateUser} isLoading={isLoading} />
  )
}

export default UserProfilePage