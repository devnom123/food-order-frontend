import { cuisineList } from "@/config/restaurant-config";
import { Label } from "./ui/label";
import { Check } from "lucide-react";
import { ChangeEvent } from "react";

type Props = {
  onChange: (cuisine: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
}
const CuisineFilter = ({
  onChange,
  selectedCuisines
}: Props) => {
  const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value
    const isChecked = event.target.checked

    const newCuisineList = isChecked ? [...selectedCuisines, clickedCuisine] : selectedCuisines.filter(cuisine => cuisine !== clickedCuisine)
    onChange(newCuisineList)
  }
  const handleResetFilter = () => {
    onChange([])
  }
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">
          Filter by Cuisine
        </div>
        <div onClick={handleResetFilter} className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500">
          Reset Filter
        </div>
      </div>
      <div className="space-y2 flex flex-col">
        {cuisineList.map((cuisine) => {
          const isSelected = selectedCuisines.includes(cuisine)
          return <div className="flex">
            <input
              type="checkbox"
              id={`cuisine_${cuisine}`}
              value={cuisine}
              checked={isSelected}
              onChange={handleCuisineChange}
              className="hidden"
            />
            <Label htmlFor={`cuisine_${cuisine}`} className={`flex flex-1 items-center cursor-pointer text-sm 
              rounded-full px-4 py-2 font-semibold 
              ${isSelected ? "border border-green-600 text-green-600":"border border-slate-300"}`}>
              {isSelected && <Check size={20} strokeWidth={3} />}
              {cuisine}
            </Label>
          </div>
        })}
      </div>
    </>
  )
}

export default CuisineFilter