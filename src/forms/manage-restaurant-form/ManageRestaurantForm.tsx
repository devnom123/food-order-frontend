import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DetailsSection from './DetailsSection';
import { Separator } from '@radix-ui/react-separator';
import CuisineSection from './CuisineSection';
import MenuSection from './MenuSection';

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
    deliveryFee: z.number({
        required_error: "Delivery Fee is required",
        invalid_type_error: "Delivery Fee must be a number"
    }),
    estimatedDeliveryTime: z.number({
        required_error: "Estimated Delivery Time is required"
    }),
    cuisines: z.array(z.string({
        required_error: "Cuisines is required",
    })),
    menuItems: z.array(z.object({
        name: z.string({
            required_error: "Menu Item Name is required"
        }),
        price: z.number({
            required_error: "Menu Item Price is required"
        })
    })),
    image: z.instanceof(File, { message: "Image is required" }),
})

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaurntFormData: FormData) => void;
    isLoading: boolean;
}

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
    const formData = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }]
        }
    });

    const onSubmit = (data: RestaurantFormData) => {

    }
    return (
        <Form {...formData}>
            <form onSubmit={formData.handleSubmit(onSubmit)}
                className='space-y-8 bg-gray-50 p-10 rounded-lg'>
                    <DetailsSection />
                    <Separator />
                    <CuisineSection />
                    <MenuSection />
            </form>
        </Form>
    )
}

export default ManageRestaurantForm