import React from 'react'

const ShopSkeleton = () => {
  return (
    <div>
      <div className="min-h-screen bg-stone-50 font-serif flex flex-col">

        {/* HEADER SKELETON */}
        <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">

            {/* Shop Name */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 rounded-full bg-stone-200 animate-pulse" />
              <div className="w-28 h-7 rounded-lg bg-stone-200 animate-pulse" />
            </div>

            {/* Search Input */}
            <div className="flex-1 max-w-md mx-auto">
              <div className="w-full h-10 rounded-full bg-stone-200 animate-pulse" />
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden sm:block w-28 h-10 rounded-full bg-stone-200 animate-pulse" />
              <div className="w-24 h-10 rounded-full bg-stone-200 animate-pulse" />
            </div>
          </div>
        </header>

        {/* HERO BAND SKELETON */}
        <div className="bg-gradient-to-r from-amber-50 via-stone-50 to-rose-50 py-8 text-center border-b border-stone-100">
          <div className="w-48 h-3 rounded-full bg-stone-200 animate-pulse mx-auto mb-3" />
          <div className="w-80 h-9 rounded-xl bg-stone-200 animate-pulse mx-auto mb-3" />
          <div className="w-64 h-3 rounded-full bg-stone-200 animate-pulse mx-auto" />
        </div>

        {/* PRODUCT GRID SKELETON */}
        <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Image Area */}
                <div className="h-48 bg-stone-200 animate-pulse" />

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  {/* Category */}
                  <div className="w-16 h-3 rounded-full bg-stone-200 animate-pulse" />
                  {/* Product Name */}
                  <div className="w-36 h-5 rounded-lg bg-stone-200 animate-pulse" />
                  {/* Price + Button */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="w-14 h-7 rounded-lg bg-stone-200 animate-pulse" />
                    <div className="w-28 h-9 rounded-full bg-stone-200 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* FOOTER SKELETON */}
        <footer className="bg-stone-900 mt-auto">
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-stone-700 animate-pulse" />
                <div className="w-24 h-5 rounded-lg bg-stone-700 animate-pulse" />
              </div>
              <div className="w-full h-3 rounded-full bg-stone-700 animate-pulse" />
              <div className="w-4/5 h-3 rounded-full bg-stone-700 animate-pulse" />
              <div className="w-3/5 h-3 rounded-full bg-stone-700 animate-pulse" />
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              <div className="w-16 h-4 rounded-lg bg-stone-700 animate-pulse mb-4" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-24 h-3 rounded-full bg-stone-700 animate-pulse" />
              ))}
            </div>

            {/* Column 3 */}
            <div className="space-y-3">
              <div className="w-16 h-4 rounded-lg bg-stone-700 animate-pulse mb-4" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-28 h-3 rounded-full bg-stone-700 animate-pulse" />
              ))}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-stone-800 px-6 py-4">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="w-40 h-3 rounded-full bg-stone-700 animate-pulse" />
              <div className="flex gap-4">
                {[80, 96, 72].map((w, i) => (
                  <div key={i} className={`w-${w === 80 ? '20' : w === 96 ? '24' : '18'} h-3 rounded-full bg-stone-700 animate-pulse`} />
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default ShopSkeleton
