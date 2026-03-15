import React from 'react'

const ProductSkeleton = () => {
    return (
        <div className="min-h-screen px-6 py-12" style={{ background: "radial-gradient(ellipse at 20% 10%, #1a1510 0%, #0a0a0a 60%)" }}>

            {/* Header skeleton */}
            <div className="max-w-7xl mx-auto mb-10 flex flex-col gap-3">
                <div className="h-3 w-32 rounded-full bg-zinc-800 animate-pulse" />
                <div className="h-10 w-56 rounded-lg bg-zinc-800 animate-pulse" />
                <div className="h-3 w-24 rounded-full bg-zinc-800 animate-pulse" />
            </div>

            {/* Cards grid */}
            <div className="max-w-7xl mx-auto grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col overflow-hidden rounded-2xl"
                        style={{ background: "#141414", border: "1px solid #2a2a2a" }}
                    >
                        {/* Image placeholder */}
                        <div className="w-full bg-zinc-800 animate-pulse" style={{ height: 200 }} />

                        {/* Content */}
                        <div className="flex flex-col flex-1 p-4 gap-3">
                            {/* Brand */}
                            <div className="h-2.5 w-1/3 rounded-full bg-zinc-800 animate-pulse" />
                            {/* Title */}
                            <div className="flex flex-col gap-2">
                                <div className="h-3.5 w-full rounded bg-zinc-800 animate-pulse" />
                                <div className="h-3.5 w-4/5 rounded bg-zinc-800 animate-pulse" />
                            </div>
                            {/* Description */}
                            <div className="flex flex-col gap-1.5">
                                <div className="h-2.5 w-full rounded bg-zinc-800 animate-pulse" />
                                <div className="h-2.5 w-2/3 rounded bg-zinc-800 animate-pulse" />
                            </div>
                            {/* Stars */}
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, j) => (
                                    <div key={j} className="w-3 h-3 rounded-full bg-zinc-800 animate-pulse" />
                                ))}
                                <div className="h-2.5 w-6 rounded ml-1 bg-zinc-800 animate-pulse" />
                            </div>
                            {/* Price + badge */}
                            <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #222" }}>
                                <div className="h-5 w-14 rounded bg-zinc-800 animate-pulse" />
                                <div className="h-5 w-16 rounded-full bg-zinc-800 animate-pulse" />
                            </div>
                            {/* Button */}
                            <div className="h-9 w-full rounded-xl bg-zinc-800 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination skeleton */}
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 mt-12">
                <div className="h-9 w-20 rounded-xl bg-zinc-800 animate-pulse" />
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded bg-zinc-800 animate-pulse" />
                    <div className="h-3 w-3 rounded bg-zinc-800 animate-pulse" />
                    <div className="h-4 w-6 rounded bg-zinc-800 animate-pulse" />
                </div>
                <div className="h-9 w-20 rounded-xl bg-zinc-800 animate-pulse" />
            </div>

        </div>
    );
}

export default ProductSkeleton;
