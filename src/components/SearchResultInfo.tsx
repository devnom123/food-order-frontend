import { Link } from "react-router-dom";

type Props = {
    total: number;
    city: string;
}

const SearchResultInfo = ({ total, city }: Props) => {
    return (
        <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
            <span>
                {total} restaurants found in {city}
                <Link to="/"
                    className="text-sm font-semibold underline cursor-pointer text-blue-500 ml-1">
                    Change location
                </Link>
            </span>
            <span>Sort by:</span>
            <select className="border-2 border-gray-300 rounded-md p-1">
                <option value="best_match">Best Match</option>
                <option value="rating">Rating</option>
                <option value="review_count">Review Count</option>
                <option value="distance">Distance</option>
            </select>
        </div>
    )
}

export default SearchResultInfo