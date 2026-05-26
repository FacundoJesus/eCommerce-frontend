import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({type: "IS_FETCHING"});
        const {data} = await api.get(`/public/products?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        });
        dispatch({type:"IS_SUCCESS"});

    }catch(error) {
        console.log(error);
        dispatch({ 
            type:"IS_ERROR",
            payload: error?.response?.data?.message || "Failer to fetch Products."
        })

    }
}

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({type: "CATEGORY_LOADER"});
        const {data} = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        });
        dispatch({type:"CATEGORY_SUCCESS"});

    }catch(error) {
        console.log(error);
        dispatch({ 
            type:"IS_ERROR",
            payload: error?.response?.data?.message || "Failer to fetch Categories."
        })

    }
}


export const addToCart = (data, quantity=1,toast) => 
    (dispatch, getState) => {

        // Find the product
        const {products} = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        )

        // Check for stocks
        const isQuantityExist = getProduct.quantity >= quantity;

        // If in stock -> add
        if(isQuantityExist) {
            dispatch({type:"ADD_CART", 
                      payload:{...data, quantity: quantity}
                    });
            toast.success(`${data?.productName} added tu the Cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));

        } else {

            //If not -> error
            toast.error(`Out of Stock`);

        }

        



}