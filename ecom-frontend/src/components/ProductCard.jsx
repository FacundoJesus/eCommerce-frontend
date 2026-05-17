import { useState } from "react";

const ProductCard = ({productId, productName, image, description, quantity, price, discount, specialPrice}) => {
    
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;

    return (
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">

            <div onClick={() => {}} 
                 className="w-full overflow-hidden aspect-3/2">
                <img className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"
                     src={image}
                     alt={productName}>   
                </img>
            </div>

            <div className="p-4">
                <h2 onClick={() => {}}
                    className="text-lg font-semibold mg-2 cursor-pointer">
                    {productName}
                </h2>

                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">
                        {description}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    {specialPrice ? (
                        <div className="flex flex-col">
                            <span className="text-gray-400 line-through">
                                ${Number(price).toFixed(2)}
                            </span>
                            <span className="text-xl font-bold text-slate-700">
                                ${Number(specialPrice).toFixed(2)}
                            </span>
                        </div>
                    ) : (
                        <span className="text-gray-400 line-through">
                            {" "}
                            ${Number(price).toFixed(2)}
                        </span>
                    )}
                </div>

                <button className="">
                    {isAvailable ? "Add to Cart" : "Stock Out"}
                </button>
                

            </div>
        </div>
    )
}

export default ProductCard;