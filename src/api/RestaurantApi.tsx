import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createRestaurantRequest = async (restaurant: FormData):Promise<Restaurant[]> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/restaurant/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurant,
        });

        if (!response.ok) {
            throw new Error("Error creating restaurant");
        }

        return response.json();
    };

    const { mutateAsync: createRestaurant, isError, isLoading, isSuccess } = useMutation(createRestaurantRequest);

    if(isSuccess ){
        toast.success("Restaurant created successfully");
    }

    if(isError){
        toast.error("Error creating restaurant");
    }

    return { createRestaurant, isError, isLoading, isSuccess };

}

export const getMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getRestaurantRequest = async ():Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/restaurant/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error fetching restaurant");
        }

        return response.json();
    };

    const { data:restaurant, isError, isLoading } = useQuery("restaurant", getRestaurantRequest);

    return { restaurant, isError, isLoading };
}

export const updateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateRestaurantRequest = async (restaurant: FormData):Promise<Restaurant[]> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/restaurant/`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurant,
        });

        if (!response.ok) {
            throw new Error("Error updating restaurant");
        }

        return response.json();
    };

    const { mutateAsync: updateRestaurant, isError, isLoading, isSuccess } = useMutation(updateRestaurantRequest);

    if(isSuccess ){
        toast.success("Restaurant updated successfully");
    }

    if(isError){
        toast.error("Error updating restaurant");
    }

    return { updateRestaurant, isError, isLoading, isSuccess };

}