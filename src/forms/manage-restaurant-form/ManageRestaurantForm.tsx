import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DetailsSection from './DetailsSection';
import { Separator } from '@radix-ui/react-separator';
import CuisineSection from './CuisineSection';
import MenuSection from './MenuSection';
import ImageSection from './ImageSection';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Restaurant } from '@/types';
import { useEffect } from 'react';

const formSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }),
    city: z.string({
        required_error: "City is required"
    }),
    country: z.string({
        required_error: "Country is required"
    }),
    deliveryFee: z.coerce.number({
        required_error: "Delivery Fee is required",
        invalid_type_error: "Delivery Fee must be a number"
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "Estimated Delivery Time is required"
    }),
    cuisines: z.array(z.string({
        required_error: "Cuisines is required",
    })),
    menuItems: z.array(z.object({
        name: z.string({
            required_error: "Menu Item Name is required"
        }),
        price: z.coerce.number({
            required_error: "Menu Item Price is required"
        })
    })),
    image: z.instanceof(File, { message: "Image is required" }),
}).refine(data => data.image , {
    message: "Image is required",
    path: ["image"],
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
    restaurant?: Restaurant;
    onSave: (restaurntFormData: FormData) => void;
    isLoading: boolean;
}

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
    console.log("onSave", onSave)
    const formData = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }]
        }
    });

    useEffect(() => {
        if(!restaurant) return;

        const deliveryPriceFormatted = parseInt((restaurant.deliveryFee/100).toFixed(2));
        const menuItemsFormatted = restaurant.menuItems.map(menuItem => {
            return {
                name: menuItem.name,
                price: parseInt((menuItem.price/100).toFixed(2))
            }
        });
        const imageFile = new File([], restaurant.image);
        const updatedRestaurant = {
            ...restaurant,
            image: imageFile,
            deliveryFee: deliveryPriceFormatted,
            menuItems: menuItemsFormatted
        }
        formData.reset(updatedRestaurant);
    },[restaurant,formData])


    const onSubmit = (data: RestaurantFormData) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("city", data.city);
        formData.append("country", data.country);
        //lowest unit of currency
        formData.append("deliveryFee", (data.deliveryFee * 100).toString());
        formData.append("estimatedDeliveryTime", data.estimatedDeliveryTime.toString());
        data.cuisines.forEach((cuisine,index) => formData.append(`cuisines${index}`, cuisine));
        data.menuItems.forEach((menuItem,index) => {
            formData.append(`menuItems[${index}][name]`, (menuItem.name));
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
        });
        if(data.image){
            formData.append("image", data.image);
        }
        onSave(formData);
    }
    return (
        <Form {...formData}>
            <form onSubmit={formData.handleSubmit(onSubmit)}
                className='space-y-8 bg-gray-50 p-10 rounded-lg'>
                    <DetailsSection />
                    <Separator />
                    <CuisineSection />
                    <MenuSection />
                    <Separator />
                    <ImageSection />
                    { isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button> }
            </form>
        </Form>
    )
}

export default ManageRestaurantForm