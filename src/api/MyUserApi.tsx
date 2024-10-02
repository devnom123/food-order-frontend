import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
    auth0Id: string;
    email: string;
}

export const createMyUser = () => {
    //it works only with the Auth0ProviderWithNavigate.tsx
    const {getAccessTokenSilently} = useAuth0();
    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/user/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Error creating user");
        }
    }

    const { mutateAsync:createUser, isError, isLoading, isSuccess } = useMutation(createMyUserRequest);

    return { createUser, isError, isLoading, isSuccess };
}

type updateMyUserRequest = {
    name: string;
    address: string;
    city: string;
    country: string;
}

export const updateMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();
    const updateMyUserRequest = async (formData: updateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/user/`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error("Error updating user");
        }
    }

    const { mutateAsync:updateUser, isError, isLoading, isSuccess, error, reset } = useMutation(updateMyUserRequest);

    if (isSuccess) {
        toast.success("User updated successfully");
    }

    if (error) {
        console.log(error);
        toast.error(error.toString());
        reset();
    }

    return { updateUser, isError, isLoading, isSuccess };
}

export const getMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();
    const getUserRequest = async (): Promise<User>=> {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/user/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error("Error fetching user");
        }
        return response.json();
    }

    const { data:getUser, isError, isLoading, error } = useQuery("fetchUser", getUserRequest);

    if (error) {
        toast.error(error.toString());
    }

    return { getUser, isLoading };
}