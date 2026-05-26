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

// Añadir producto al Carrito
export const addToCart = (data, qty=1,toast) => 
    (dispatch, getState) => {

        // Buscar el producto en el store Redux
        const {products} = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        )

        // Chequear Stocks
        const isQuantityExist = getProduct.quantity >=  qty;

        // Si hay stock, lo añado
        if(isQuantityExist) {
            dispatch({type:"ADD_CART", 
                      payload:{...data, quantity: qty}
                    });
            toast.success(`${data?.productName} added tu the Cart`);
            // Guardo el carrito en el navegador
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));

        } else {

            // Si no hay stock envio mensaje.
            toast.error(`Out of Stock`);

        }
        

}

// Incrementar la cantidad del producto del Carrito
export const increaseCartQuantity = 
    (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {
        // Find the product
        const { products } = getState().products;
        
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

        if (isQuantityExist) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);

            dispatch({
                type: "ADD_CART",
                payload: {...data, 
                          quantity: newQuantity + 1 
                        }
            });
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));

        } else {
            toast.error("Quantity Reached to Limit");
        }

    };


// Decrementar cantidad del producto del carrito.
export const decreaseCartQuantity = 
    (data, newQuantity) => (dispatch, getState) => {
        dispatch({
            type: "ADD_CART",
            payload: {...data, quantity: newQuantity},
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    }

// Remover Producto del Carrito.
export const removeFromCart =  (data, toast) => (dispatch, getState) => {
    dispatch({type: "REMOVE_CART", payload: data });
    toast.success(`${data.productName} removed from cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}