import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormControl, Form, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const FormSchema = z.object({
    query: z.string({
        required_error: "Restaurant name is required",
    }),
});

export type SearchForm = z.infer<typeof FormSchema>;

type Props = {
    onSubmit: (formData: SearchForm) => void;
    placeHolder: string;
    onReset?: () => void; 
}

const SearchBar = ({onSubmit,onReset,placeHolder}:Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        query: "",
    },
  });

  const handleReset = () => {
    form.reset({query: ""});
    onReset && onReset();
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center flex-1 gap-3 
            justify-between flex-row border-2 rounded-full p-3 mx-5 ${form.formState.errors.query && "border-red-500"}`}>
            <Search strokeWidth={2.5} size={30} className="ml-1 text-orange-500 hidden md:block" />
            <FormField control={form.control} name="query" render={({field})=><FormItem className="flex-1">
                <FormControl>
                    <Input {...field} 
                    className="border-none shadow-none text-xl focus-visible:ring-0"
                    placeholder={placeHolder}/>
                </FormControl>
            </FormItem>} />
            {form.formState.isDirty && 
            <Button onClick={handleReset} type="button" variant="outline" className="rounded-full">Clear</Button>}
        </form>
    </Form>
  )
}

export default SearchBar