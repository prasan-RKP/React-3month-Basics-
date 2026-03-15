import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ProductSkeleton from "./ProductSkeleton";


const PaginationAPI = () => {


    let [products, setProducts] = useState([]);
    let [loading, setLoading] = useState(false);
    let [totalPage, setTotalPage] = useState(0);
    let [totalItems, setTotalItems] = useState(0);

    const ITEMS_PER_PAGE = 10;

    let { page } = useParams();
    let currPage = parseInt(page) || 1;
    const navigate = useNavigate();

    const goURL = (page) => navigate(`/products/${page}`);

    const fetchProducts = async () => {
        setLoading(true);
        try {

            let mySkip = (currPage - 1) * ITEMS_PER_PAGE;
            console.log(`My CurrentPage-${currPage} & mySkip-${mySkip}`);

            let res = await fetch(`https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${mySkip}`)

            if (!res.ok) {
                toast.error("Network Error !!");
                return;
            }

            let data = await res.json();

            let totalItems = parseInt(data?.total);
            let totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
            setTotalPage(totalPages);
            setTotalItems(totalItems);
            setProducts(data?.products);

        } catch (error) {
            toast.error("Something went wrong, Please try Again..")
            setLoading(false)
        }
        finally {
            setLoading(false);
        }
    }

    let visible = products;


    useEffect(() => {
        fetchProducts();
    }, [currPage]);


    //console.log('skip value', skip);


    return (

        loading ? <ProductSkeleton /> : (
            <>
                <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Mono:wght@400;500&display=swap');
    .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  `}</style>

                <div className="min-h-screen px-6 py-12 bg-[radial-gradient(ellipse_at_20%_10%,#1a1510_0%,#0a0a0a_60%)]">

                    {/* Header */}
                    <div className="max-w-7xl mx-auto mb-10">
                        <p className="text-xs uppercase tracking-widest mb-2 text-[#d4a853] font-mono">
                            Curated Collection
                        </p>

                        <h1 className="text-5xl font-bold mb-2 text-[#e8e8e8] font-serif">
                            New Arrivals
                        </h1>

                        <p className="text-sm text-[#444] font-mono">
                            {totalItems} products
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="max-w-7xl mx-auto grid gap-5 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
                        {visible.length === 0 ? (

                            <div className="max-w-7xl mx-auto flex items-center justify-center h-[300px] border border-[#2a2a2a] rounded-2xl bg-[#141414]">
                                <p className="text-[#777] text-sm font-mono uppercase tracking-widest">
                                    No items found
                                </p>
                            </div>

                        ) : (

                            <div className="max-w-7xl mx-auto grid gap-5 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
                                {visible.map((p) => (
                                    <div
                                        key={p.id}
                                        className="flex flex-col overflow-hidden rounded-2xl bg-[#141414] border border-[#2a2a2a] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(212,168,83,0.1)]"
                                    >
                                        {/* Image */}
                                        <div className="relative overflow-hidden h-[200px] bg-[#111]">
                                            <img
                                                src={p.images[0]}
                                                alt={p.title}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                onError={(e) => (e.currentTarget.style.display = "none")}
                                            />

                                            <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full uppercase tracking-widest bg-black/70 text-[#d4a853] border border-[#d4a8534d] backdrop-blur font-mono">
                                                {p.category}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col flex-1 p-4 gap-2">
                                            <p className="text-xs uppercase tracking-widest text-[#555] font-mono">
                                                {p.brand}
                                            </p>

                                            <h3 className="font-semibold leading-snug text-[#e8e8e8] font-serif text-[0.95rem] line-clamp-2">
                                                {p.title}
                                            </h3>

                                            <p className="text-xs leading-relaxed text-[#555] line-clamp-2">
                                                {p.description}
                                            </p>

                                            {/* Price + Stock */}
                                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#222]">
                                                <span className="text-xl font-bold text-[#d4a853] font-mono">
                                                    ₹{p.price.toFixed(2)}
                                                </span>

                                                <span
                                                    className={`text-xs px-2 py-0.5 rounded-full border font-mono
                            ${p.stock <= 5
                                                            ? "border-red-600 text-red-600"
                                                            : p.stock <= 30
                                                                ? "border-[#d4a853] text-[#d4a853]"
                                                                : "border-[#3a3a3a] text-[#555]"
                                                        }`}
                                                >
                                                    {p.stock <= 5
                                                        ? `${p.stock} left`
                                                        : p.stock <= 30
                                                            ? "Low stock"
                                                            : "In stock"}
                                                </span>
                                            </div>

                                            <button className="w-full py-2.5 rounded-xl text-xs uppercase tracking-widest font-mono bg-gradient-to-br from-[#d4a853] to-[#b8872e] text-black hover:opacity-90 transition">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        )}
                    </div>

                    {/* Pagination */}
                    <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 mt-12">

                        <button
                            onClick={() => goURL(currPage - 1)}
                            disabled={currPage <= 1}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-mono border transition
        ${currPage <= 1
                                    ? "border-[#3a3a3a] bg-[#d4a8530f] text-[#333] cursor-not-allowed"
                                    : "border-[#3a3a3a] bg-[#d4a8530f] text-[#d4a853] hover:bg-[#d4a85324] hover:border-[#d4a853]"
                                }`}
                        >
                            Prev
                        </button>

                        <span className="font-mono">
                            <span className="text-[#d4a853] text-lg font-semibold">{currPage}</span>
                            <span className="text-[#444] mx-1">/</span>
                            <span className="text-[#555]">{totalPage}</span>
                        </span>

                        <button
                            onClick={() => goURL(currPage + 1)}
                            disabled={currPage === totalPage}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-mono border transition
        ${currPage === totalPage
                                    ? "border-[#3a3a3a] bg-[#d4a8530f] text-[#333] cursor-not-allowed"
                                    : "border-[#3a3a3a] bg-[#d4a8530f] text-[#d4a853] hover:bg-[#d4a85324] hover:border-[#d4a853]"
                                }`}
                        >
                            Next
                        </button>

                    </div>
                </div>
            </>
        )
    );
}

export default PaginationAPI;