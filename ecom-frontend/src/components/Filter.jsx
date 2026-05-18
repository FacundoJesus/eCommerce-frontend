import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Filter = () => {

    const categories = [
        {categoryId: 1, categoryName: "Electronics"},
        {categoryId: 2, categoryName: "Clothing"},
        {categoryId: 3, categoryName: "Laptops"},
        {categoryId: 4, categoryName: "Books"},
        {categoryId: 5, categoryName: "Toys"},
    ];

    const [categorie, setCategory] = useState("all");

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            <div className="relative flex items-center 2xl:w-112.5 sm:w-105 w-full">
                <input type="text"
                       placeholder = "Search Products"
                       className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
                />
                <FiSearch className="absolute left-3 text-slate-800 size={20}" />
            </div>
        </div>
    )


}

export default Filter;