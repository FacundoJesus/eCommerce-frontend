import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../shared/ProductCard";
import HeroBanner from "./heroBanner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions/actions";


const Home = () => {

    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    },[dispatch])

    return (

        <div className="lg:px-14 sm:px-8 px-4">
            <div className="py-6">
                <HeroBanner />
            </div>
            
            <div className="py-5">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-slate-800 text-4xl font-bold">Products</h1>
                        <span className="text-slate-700">
                            Discover our handpicked selection of top-reted items just for you !
                        </span>
                </div>
            </div>
            
            <div className="min-h-175">
                <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                    {products &&
                    products?.slice(0,8)
                             .map((item,i) => <ProductCard key={i} {...item}/>)}
                </div>             
            </div>
        </div>
    )
}

export default Home;