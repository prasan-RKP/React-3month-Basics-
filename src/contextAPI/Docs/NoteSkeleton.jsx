import React from 'react'

const NoteSkeleton = () => {
    return (
        <div>
            <div>
                <div>
                    <div className="flex items-start justify-between mb-8 animate-pulse">
                        <div>
                            <div className="h-6 w-32 bg-zinc-800 rounded mb-2"></div>
                            <div className="h-4 w-48 bg-zinc-900 rounded"></div>
                        </div>
                        <div className="flex gap-2 flex-wrap justify-end">
                            {[...Array(3)].map((_, i) => (
                                <span
                                    key={i}
                                    className="h-5 w-12 bg-zinc-800 rounded-full"
                                ></span>
                            ))}
                        </div>
                    </div>

                    <div className="w-full h-10 bg-zinc-900 rounded-xl mb-5 animate-pulse"></div>

                    <div className="flex gap-2 mb-7 flex-wrap animate-pulse">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="h-6 w-16 bg-zinc-800 rounded-full"
                            ></div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="relative rounded-xl p-5 flex flex-col gap-3 border border-zinc-800 bg-zinc-950 animate-pulse"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="h-5 w-12 bg-zinc-800 rounded-full"></div>
                                    <div className="h-4 w-16 bg-zinc-900 rounded"></div>
                                </div>

                                <div>
                                    <div className="h-5 w-32 bg-zinc-800 rounded mb-2"></div>
                                    <div className="h-4 w-48 bg-zinc-900 rounded"></div>
                                </div>

                                <div className="h-4 w-20 bg-zinc-800 rounded mt-2"></div>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-[11px] text-zinc-800 mt-8">
                        loading notes...
                    </p>
                </div>
            </div>

        </div>
    )
}

export default NoteSkeleton
