import React, { useEffect, useRef, useState } from "react";
import PostCard from "../PostCard";
import SkeletonCard from "../SkeletonCard";
import { Loader2 } from "lucide-react";

const MyCompo = () => {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);
  const isFetching = useRef(false);

  let limit = 5;


  const fetchData = async () => {
    if (!hasMore) return;

    isFetching.current = true;
    setLoading(true);
    try {
      let skip = (page - 1) * limit;
      let res = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);

      let data = await res.json();

      if (data?.posts?.length === 0) {
        setHasMore(false);
      }
      setPosts((prev => [...prev, ...data?.posts]));

    } catch (error) {
      console.log(error?.message);
    }
    finally {
      isFetching.current = false;
      setLoading(false);
    }
  }

  useEffect(()=> {
       fetchData();
  }, [page]);


  useEffect(()=> {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if(first.isIntersecting && hasMore && !loading){
            setPage(prev => prev + 1);
        }
      },{rootMargin: "100px"}
    )

    const current = loaderRef.current;
    if(current) {
      observer.observe(current);
    }

    return () => {
     if(current) observer.unobserve(current);
    }
  }, [loading, hasMore]);



  return (
    <div className="min-h-screen bg-black text-white py-6 px-6">

      {/* 🔹 Header */}
      <div className="max-w-lg mx-auto bg-gray-600 rounded-xl py-4 text-center mb-6">
        <h1 className="text-xl font-semibold">
          Infinite Scroll
        </h1>
      </div>

      {/* 🔹 Posts */}
      <div className="max-w-lg mx-auto space-y-4">
        {loading && posts?.length === 0 ? (
          Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : (
          posts?.map((post, idx) => (
            <PostCard key={idx + 1} post={post} />
          ))
        )}
      </div>

      {/* 🔹 Loader */}
      <div ref={loaderRef} className="flex justify-center py-6">
        {loading && posts.length > 0 && (
          <Loader2 className="h-6 w-6 animate-spin" />
        )}

        {!hasMore && (
          <p className="text-gray-400 text-sm">
            No more posts
          </p>
        )}

      </div>
    </div>
  );
};

export default MyCompo;