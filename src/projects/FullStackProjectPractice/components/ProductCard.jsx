import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const ProductCard = ({ prod }) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [isAdding, setIsAdding] = useState(false);



    const onAddToCart = (prod) => {
        if (!prod) return;

        const stored = JSON.parse(localStorage.getItem("ADD_CART")) || [];

        const isExist = stored.some((item) => item.id === prod.id);
        if (isExist) return;

        setIsAdding(true);

        const prodDetail = {
            id: prod.id,
            category: prod.category,
            img: prod.images[0],
            desc: prod.description,
            price: prod.price,
            qty: 1,
        };

        const updated = [...stored, prodDetail]; // ✅ use stored, not state

        setCartProducts(updated);

        setTimeout(() => setIsAdding(false), 300); // small delay for UX
    };

    const isInCart = cartProducts.some((item) => item?.id === prod?.id);

    useEffect(() => {
        localStorage.setItem("ADD_CART", JSON.stringify(cartProducts));
    }, [cartProducts])

    return (
        <div className="w-full max-w-sm border rounded overflow-hidden shadow-lg text-white bg-gray-900">
            <img
                className="w-full h-48 object-cover"
                src={prod?.images[0]}
                alt={prod?.brand}
            />

            <div className="px-6 py-4 space-y-2">
                <p className="text-sm text-gray-400">
                    Brand: <span className="text-white">{prod?.brand}</span>
                </p>
                <p className="text-sm text-gray-400">
                    Category:{" "}
                    <span className="text-white capitalize">{prod?.category}</span>
                </p>
                <p className="text-lg font-semibold">
                    ₹{prod?.price}
                    <span className="ml-2 text-green-400 text-sm">
                        ({prod?.discountPercentage}% OFF)
                    </span>
                </p>
                <p className="text-gray-400 text-sm line-clamp-2">
                    {prod?.description}
                </p>
            </div>

            <div className="px-6 pb-4">
                <button
                    onClick={() => onAddToCart(prod)}
                    disabled={isInCart}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-70 px-4 py-2 rounded"
                >
                    {isAdding ? (
                        <div className="flex justify-center items-center">
                            <Loader2 className="animate-spin h-5 w-5" />
                        </div>
                    ) : isInCart ? (
                        "Added ✅"
                    ) : (
                        "Add To Cart"
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;