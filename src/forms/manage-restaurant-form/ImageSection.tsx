import { AspectRatio } from "@/components/ui/aspect-ratio"
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

const ImageSection = () => {
    const { control, watch } = useFormContext()
    const image = watch("image")
    console.log("image", image)
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Image</h2>
                <FormDescription>
                    Add an image to represent your restaurant.
                </FormDescription>
            </div>
            <div className="flex flex-col gap-8 md:w-[50%]">
                {image && (
                    <AspectRatio ratio={ 16 / 9}>
                        <img src={image?.name} alt="restaurant" 
                        className="rounded-md object-contain h-full w-full" />
                    </AspectRatio>
                )}
                <FormField
                    control={control}
                    name="image"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="file"
                                    name="image"
                                    className="bg-white"
                                    accept=".jpg, .jpeg, .png" 
                                    onChange={(e) => {
                                        field.onChange(e.target.files? e.target.files[0]: null)
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}

export default ImageSection