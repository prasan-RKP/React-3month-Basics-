import React, { useState } from "react";

const NumberPagination = () => {
    const images = [
        {
            id: 1,
            url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
            title: "Mountain Lake",
            photographer: "John Doe",
        },
        {
            id: 2,
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            title: "Ocean Waves",
            photographer: "Jane Smith",
        },
        {
            id: 3,
            url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            title: "Forest Path",
            photographer: "Mike Johnson",
        },
        {
            id: 4,
            url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
            title: "Rocky Mountains",
            photographer: "Sarah Wilson",
        },
        {
            id: 5,
            url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
            title: "City Lights",
            photographer: "Alex Brown",
        },
        {
            id: 6,
            url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
            title: "Northern Lights",
            photographer: "Emma Davis",
        },
        {
            id: 7,
            url: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
            title: "Waterfall",
            photographer: "Chris Lee",
        },
        {
            id: 8,
            url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
            title: "Sunset Beach",
            photographer: "Lisa Anderson",
        },
        {
            id: 9,
            url: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
            title: "Snow Mountain",
            photographer: "Tom Harris",
        },
        {
            id: 10,
            url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
            title: "Countryside",
            photographer: "Nina Patel",
        },
        {
            id: 11,
            url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
            title: "Urban Street",
            photographer: "Ryan Cooper",
        },
        {
            id: 12,
            url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            title: "Starry Night",
            photographer: "Mia Foster",
        },
        {
            id: 13,
            url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            title: "Autumn Forest",
            photographer: "Lucas Grant",
        },
        {
            id: 14,
            url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
            title: "Tropical Beach",
            photographer: "Sofia Ruiz",
        },
        {
            id: 15,
            url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
            title: "Misty Mountains",
            photographer: "Oliver Chen",
        },
        {
            id: 16,
            url: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3",
            title: "Lavender Field",
            photographer: "Emma Watson",
        },
        {
            id: 17,
            url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
            title: "Cherry Blossom",
            photographer: "Yuki Tanaka",
        },
        {
            id: 18,
            url: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
            title: "Desert Night",
            photographer: "Ahmed Hassan",
        },
        {
            id: 19,
            url: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
            title: "Frozen Lake",
            photographer: "Erik Johansson",
        },
        {
            id: 20,
            url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
            title: "Rainforest",
            photographer: "Maria Garcia",
        },
    ];

    let [currentPage, setCurrentPage] = useState(1);

    const totalPages = 5;
    const imagesPerPage = 4;

    let startIdx = (currentPage - 1) * imagesPerPage;
    let endIdx = startIdx + imagesPerPage;

    let currentImages = images.slice(startIdx, endIdx);


    const handlePageChange = (pageNum) => {
        if (pageNum >= 1 && pageNum <= 5) {
            setCurrentPage(pageNum);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Beautiful Image Gallery
                    </h1>
                    <p className="text-gray-600">Showing {currentImages.length} images</p>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {currentImages.map((image) => (
                        <div
                            key={image.id}
                            className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                                <img
                                    src={`${image.url}?w=400&h=300&fit=crop`}
                                    alt={image.title}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />
                            </div>

                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <h3 className="font-semibold text-lg">{image.title}</h3>
                                    <p className="text-sm text-gray-200">by {image.photographer}</p>
                                </div>
                            </div>

                            {/* Image Info (visible on mobile/without hover) */}
                            <div className="p-4 bg-white md:hidden">
                                <h3 className="font-semibold text-gray-800">{image.title}</h3>
                                <p className="text-sm text-gray-600">{image.photographer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination UI — no logic, ready for your implementation */}
                <div className="flex items-center justify-center space-x-2">
                    {/* Previous Button */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${currentPage === 1 ? "hover:cursor-not-allowed bg-white text-black" : "bg-white text-gray-700 hover:bg-blue-400 hover:shadow-md border "} border-gray-300`}>
                        ← Prev
                    </button>

                    {/* Page Numbers */}
                    <div className="flex">
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <button
                                    onClick={() => handlePageChange(pageNumber)}
                                    key={pageNumber}
                                    className={`
                    px-4 py-2 text-sm font-medium transition-all duration-200 border border-gray-300
                     hover:shadow
                    ${pageNumber === currentPage ? "bg-blue-400 hover:bg-blue-500 rounded-xl" : "bg-white text-gray-700 hover:bg-gray-100"}
                    ${index === 0 ? "rounded-l-lg" : ""}
                    ${index === totalPages - 1 ? "rounded-r-lg" : ""}
                  `}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${currentPage === totalPages ? "bg-white text-black cursor-not-allowed" : "bg-white text-gray-700 hover:shadow-md border hover:bg-blue-400"}  border-gray-300`}>
                        Next →
                    </button>
                </div>

                {/* Page Indicator */}
                <div className="text-center mt-4 text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                </div>
            </div>
        </div>
    );
};

export default NumberPagination;