import { useEffect, useState } from "react";
import ProductSkeleton from "./ProductSkeleton";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const NewPaginationAPI = () => {

    const {page} = useParams();
    let currPage = parseInt(page) || 1;


    const TOTAL_PAGE = 20;
    const ITEMS_PER_PAGE = 10;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [error, setError] = useState('');


    const fetchProducts = async () => {
        setLoading(true);
        try {
            let skip = (currPage - 1) * ITEMS_PER_PAGE;
            let res = await fetch(`https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${skip}`);
            const data = await res.json();

            if (!res.ok) {
                toast.error("Network Error !!");
                return;
            }

            let totalPg = Math.ceil(parseInt(data?.total) / ITEMS_PER_PAGE);
            setTotalPage(totalPg);
            setProducts(data?.products);
            setTotalItems(parseInt(data?.total));

        } catch (error) {
            setError(error);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    }


    const goURL = (page) => navigate(`/products/${page}`);

    useEffect(() => {
        fetchProducts();
    }, [currPage]);


    if (loading) {
        return <ProductSkeleton />;
    }

    return (
        <>
            <style>{`
                .line-clamp-2 { 
                    display:-webkit-box; 
                    -webkit-line-clamp:2; 
                    -webkit-box-orient:vertical; 
                    overflow:hidden; 
                }
            `}</style>

            <div className="min-h-screen px-6 py-12 bg-[#0a0a0a]">

                {/* Header */}
                <div className="max-w-7xl mx-auto mb-10">
                    <p className="text-xs uppercase tracking-widest mb-2 text-[#d4a853]">
                        Curated Collection
                    </p>

                    <h1 className="text-5xl font-bold mb-2 text-[#e8e8e8]">
                        New Arrivals
                    </h1>

                    <p className="text-sm text-[#444]">
                        {totalItems} products
                    </p>
                </div>

                {/* Grid */}
                <div className="max-w-7xl mx-auto grid gap-5 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
                    {error && products?.length === 0 && (
                        <div className="flex items-center justify-center h-[300px] border border-[#2a2a2a] rounded-2xl bg-[#141414]">
                            <p className="text-[#777] text-sm uppercase">
                                  Failed to Fetch, Please try again Later..
                            </p>
                        </div>
                    )}
                    {products.length === 0 && !error ? (
                        <div className="flex items-center justify-center h-[300px] border border-[#2a2a2a] rounded-2xl bg-[#141414]">
                            <p className="text-[#777] text-sm uppercase">
                                No items found
                            </p>
                        </div>
                    ) : (
                        products.map((p) => (
                            <div
                                key={p.id}
                                className="flex flex-col overflow-hidden rounded-2xl bg-[#141414] border border-[#2a2a2a]"
                            >
                                {/* Image */}
                                <div className="h-[200px] bg-[#111]">
                                    <img
                                        src={p.images[0]}
                                        alt={p.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 p-4 gap-2">
                                    <p className="text-xs text-[#555]">
                                        {p.brand}
                                    </p>

                                    <h3 className="text-[#e8e8e8] text-[0.95rem] line-clamp-2">
                                        {p.title}
                                    </h3>

                                    <p className="text-xs text-[#555] line-clamp-2">
                                        {p.description}
                                    </p>

                                    {/* Price + Stock */}
                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#222]">
                                        <span className="text-xl font-bold text-[#d4a853]">
                                            ₹{p.price}
                                        </span>

                                        <span className="text-xs text-[#555]">
                                            {p.stock} items
                                        </span>
                                    </div>

                                    <button className="w-full py-2.5 rounded-xl text-xs uppercase bg-[#d4a853] text-black">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination UI (no logic) */}
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 mt-12">

                    <button
                        disabled={currPage === 1}
                        onClick={()=> goURL(currPage + 1)} className={`px-5 py-2.5 rounded-xl text-xs border text-[#d4a853] ${currPage === 1 ? 'cursor-not-allowed' : ""}`}>
                        Prev
                    </button>

                    <span>
                        <span className="text-[#d4a853] text-lg font-semibold">
                            {currPage}
                        </span>
                        <span className="text-[#444] mx-1">/</span>
                        <span className="text-[#555]">{totalPage}</span>
                    </span>

                    <button
                        disabled={currPage === totalPage}
                        onClick={()=> goURL(currPage - 1)} className={`px-5 py-2.5 rounded-xl text-xs border text-[#d4a853] ${currPage === totalPage ? "cursor-not-allowed" : ""}`}>
                        Next
                    </button>

                </div>
            </div>
        </>
    );
};

export default NewPaginationAPI;