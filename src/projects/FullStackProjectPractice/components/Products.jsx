import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import ProductSkeleton from '../../../Pagination/ProductSkeleton';
import useDebounce from '../../../hooks/useDebounce';

const Products = () => {

    const [input, setInput] = useState('');
    const [quesry, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [loadingCart, setLoadingCart] = useState(false);
    const [cartId, setCartId] = useState(null);

    const navigate = useNavigate();

    let debounceSearch = useDebounce(input, 500);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://dummyjson.com/products');
            if (!res.ok) {
                throw new Error("Network Error");
            }

            let data = await res.json();
            setProducts(data?.products);

        } catch (error) {
            setError(error?.message);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }

    }

    const filteredPosts = useMemo(() => {
        if (!debounceSearch) return products;

        const searchTerm = debounceSearch.trim().toLowerCase();

        return products.filter(pr =>
            pr?.category?.toLowerCase().includes(searchTerm) ||
            pr?.description?.toLowerCase().includes(searchTerm)
        );

    }, [debounceSearch, products]);

    useEffect(() => {
        fetchProducts();
    }, [])


    return (
        <div className='min-h-screen bg-black '>
            <div className='flex flex-col'>
                <div className='flex items-center justify-center gap-6 mt-10 ml-12'>
                    <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Search items ...' className='bg-gray-300 rounded-md h-10 w-65 text-black pl-4' />
                    <button className='bg-blue-500 hover:bg-gray-400 hover: text-black cursor-pointer px-4 py-2 rounded-xl'>Search</button>
                    <button onClick={() => navigate("/add")} className='bg-blue-500 hover:bg-gray-400 hover: text-black cursor-pointer px-4 py-2 rounded-xl'>Go to Cart</button>
                </div>
                <div className=' flex flex-wrap items-start justify-center gap-4 text-white m-4 p-4 mt-12'>
                    {loading ? (
                        <ProductSkeleton />
                    ) : error ? (
                        <div className="w-full h-[200px] max-w-sm border rounded shadow-lg bg-red-900 text-white p-4 flex flex-col justify-center items-center">
                            <p className="font-bold text-lg"> Failed to load product ⚠️</p>
                            <p className="text-sm text-red-200 mt-2">{error}</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="w-full h-[200px] max-w-sm border rounded shadow-lg bg-blue-500 text-white p-4 flex flex-col justify-center items-center">
                            <p className="font-bold text-lg">No Products Found ❌</p>
                            <p className="text-sm text-red-200 mt-2">Try again..</p>
                        </div>
                    ) : (
                        filteredPosts.map((prod, idx) => (
                            <ProductCard key={idx} prod={prod} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Products;
