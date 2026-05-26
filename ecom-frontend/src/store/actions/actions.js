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


export const addToCart = (productToAdd, qty=1,toast) => 
    (dispatch, getState) => {

        // Buscar el producto en el store Redux
        const {products} = getState().products;
        const getProduct = products.find(
            (item) => item.productId === productToAdd.productId
        )

        // Chequear Stocks
        const isQuantityExist = getProduct.quantity >=  qty;

        // Si hay stock, lo añado
        if(isQuantityExist) {
            dispatch({type:"ADD_CART", 
                      payload:{...productToAdd, quantity: qty}
                    });
            toast.success(`${productToAdd?.productName} added tu the Cart`);
            // Guardo el carrito en el navegador
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));

        } else {

            // Si no hay stock envio mensaje.
            toast.error(`Out of Stock`);

        }

}