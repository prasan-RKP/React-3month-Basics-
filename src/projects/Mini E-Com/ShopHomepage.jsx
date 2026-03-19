import { useEffect, useState } from "react";
import ShopSkeleton from "./assets/ShopSkeleton.jsx";
import AddToCart from "./assets/AddToCart.jsx";


const tagColors = {
    Bestseller: "bg-amber-500 text-white",
    New: "bg-emerald-500 text-white",
    Sale: "bg-rose-500 text-white",
    Popular: "bg-sky-500 text-white",
    Limited: "bg-violet-500 text-white",
};



export default function ShopHomepage() {

    // My Codees are here
    const [loading, setLoading] = useState(true);
    let [products, setProducts] = useState([]);
    let [cartItems, setCartItems] = useState([]);
    let [cartModal, setcartModal] = useState(false);


    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [addedId, setAddedId] = useState(null);

    const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
    const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);


    const myAddtoCart = (product) => {

        let myCartItems = JSON.parse(localStorage.getItem("CART")) || [];

        let existProd = myCartItems.find(item => item?.id === product?.id);

        if (existProd) {
            existProd.qty += 1;
            existProd.total = existProd.qty * existProd.price;
        }
        else {
            myCartItems?.push({
                id: product.id,
                img: product.images[0],
                price: product.price,
                qty: 1,
                total: product.price
            })
        }

        // localStorage.setItem("CART", JSON.stringify(myCartItems));
        setCartItems(myCartItems);

    }

    const filtered = products.filter((p) =>
        p?.title?.toLowerCase().includes(search.toLowerCase()) ||
        p?.category?.toLowerCase().includes(search.toLowerCase())
    );



    const fetchProducts = async () => {

        try {
            let res = await fetch('https://dummyjson.com/products');
            if (!res.ok) {
                throw new Error("Network Error");
            }
            let data = await res.json();

            setProducts(data?.products);
            setLoading(true);
        } catch (error) {
            console.log("This is the Error in catch", error);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchProducts();
    }, [])


    useEffect(() => {
        try {
            let storedCartItems = JSON.parse(localStorage.getItem("CART")) || [];
            setCartItems(storedCartItems);
        } catch (error) {
            setCartItems([]);
        }

    }, [])

    useEffect(() => {
        localStorage.setItem("CART", JSON.stringify(cartItems));
    }, [cartItems]);


    console.log("CartItems: ", cartItems);
    //console.log(products);


    return loading ? <ShopSkeleton /> :
        (
            <>
                <div className="min-h-screen bg-stone-50 font-serif flex flex-col">

                    {/* HEADER */}
                    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
                        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">

                            {/* Shop Name */}
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="text-2xl">🌿</span>
                                <span className="text-2xl font-bold tracking-tight text-stone-800" style={{ fontFamily: "'Georgia', serif" }}>
                                    Bloom & Co
                                </span>
                            </div>

                            {/* Search Input */}
                            <div className="flex-1 relative max-w-md mx-auto">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search products or categories..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 rounded-full border border-stone-300 bg-stone-50 text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition placeholder-stone-400"
                                />
                            </div>

                            <div className="flex items-center gap-3 shrink-0">

                                {/* Cart Button */}
                                <button
                                    onClick={() => setcartModal(true)}
                                    className="relative flex items-center gap-2 
             border border-stone-300 hover:border-stone-500 
             bg-white text-stone-700 text-sm 
             px-4 py-2.5 rounded-full font-medium 
             transition-all duration-200 active:scale-95"
                                >
                                    {/* Cart Icon */}
                                    <span className="text-xl">🛒</span>

                                    {/* Cart Length Badge (always visible space) */}
                                    <span className="absolute -top-2 -right-2 
                   bg-amber-500 text-white 
                   text-[10px] 
                   min-w-[18px] h-[18px] 
                   px-1 
                   rounded-full 
                   flex items-center justify-center 
                   font-bold">
                                        {cartItems?.length || 0}
                                    </span>

                                    {/* Button Text */}
                                    <span className="hidden sm:inline">Cart</span>
                                </button>
                            </div>
                        </div>

                        {/* Cart Dropdown */}
                        {cartModal && (
                            <AddToCart setcartModal={setcartModal} />
                        )}
                    </header>

                    {/* HERO BAND */}
                    <div className="bg-linear-to-r from-amber-50 via-stone-50 to-rose-50 py-8 text-center border-b border-stone-100">
                        <p className="text-stone-500 text-sm tracking-widest uppercase mb-1">Spring Collection 2026</p>
                        <h1 className="text-4xl font-bold text-stone-800" style={{ fontFamily: "'Georgia', serif" }}>
                            Curated for the <em className="text-amber-600">Modern Home</em>
                        </h1>
                        <p className="text-stone-400 mt-2 text-sm">Free shipping on orders over $75 · Handpicked items · Sustainable packaging</p>
                    </div>

                    {/* PRODUCT GRID */}
                    <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">
                        {search && (
                            <p className="text-stone-400 text-sm mb-6">
                                Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "<span className="text-stone-700 font-medium">{search}</span>"
                            </p>
                        )}

                        {filtered.length === 0 ? (
                            <div className="text-center py-20 text-stone-400">
                                <div className="text-5xl mb-4">🔍</div>
                                <p className="text-lg">No products found</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.map((product) => (
                                    <div
                                        key={product.id}
                                        className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                    >
                                        {/* Product Image Area */}
                                        <div className={`bg-linear-to-br ${product.bg} h-48 flex items-center justify-center relative`}>
                                            <img
                                                src={product?.images?.[0]}
                                                alt={product?.name || "product image"}
                                                className="w-40 h-40 object-contain group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${tagColors[product.tag]}`}>
                                                {product.tag}
                                            </span>
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-5">
                                            <span className="text-xs text-stone-400 uppercase tracking-wider">{product.category}</span>
                                            <h3 className="font-bold text-stone-800 text-lg mt-0.5 mb-3">{product.name}</h3>

                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-bold text-stone-800">₹{product.price}</span>
                                                <button
                                                    onClick={() => myAddtoCart(product)}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 ${addedId === product.id
                                                        ? "bg-emerald-500 text-white scale-95"
                                                        : "bg-stone-800 hover:bg-amber-500 text-white"
                                                        }`}
                                                >
                                                    {addedId === product.id ? "✓ Added!" : "Add to Cart"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>

                    {/* FOOTER */}
                    <footer className="bg-stone-900 text-stone-300 mt-auto">
                        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xl">🌿</span>
                                    <span className="text-white font-bold text-lg" style={{ fontFamily: "'Georgia', serif" }}>Bloom & Co</span>
                                </div>
                                <p className="text-stone-400 text-sm leading-relaxed">
                                    Thoughtfully curated goods for a more intentional life. Made with care, shipped with love.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
                                <ul className="space-y-2 text-sm">
                                    {["New Arrivals", "Bestsellers", "Kitchen", "Bedroom", "Garden"].map((l) => (
                                        <li key={l}><a href="#" className="hover:text-amber-400 transition">{l}</a></li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Help</h4>
                                <ul className="space-y-2 text-sm">
                                    {["Shipping & Returns", "FAQ", "Contact Us", "Track Order", "Gift Cards"].map((l) => (
                                        <li key={l}><a href="#" className="hover:text-amber-400 transition">{l}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-stone-800 px-6 py-4">
                            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-stone-500">
                                <p>© 2026 Bloom & Co. All rights reserved.</p>
                                <div className="flex gap-4">
                                    {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((l) => (
                                        <a key={l} href="#" className="hover:text-stone-300 transition">{l}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </footer>

                    {/* Click outside to close cart */}
                    {cartModal && <div className="fixed inset-0 z-40" onClick={() => setCartOpen(false)} />}
                </div>

            </>
        );

}