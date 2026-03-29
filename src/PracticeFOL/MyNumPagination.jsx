import React, { useState } from "react";

const MyNumPagination = () => {
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

    let [currentPage, setCurrentPage] = useState (1);

    const totalPages = 5;
    let showRange = 4;
    let end = currentPage + showRange;

    // 

    const handlePageChange = (pageNum) => {
        setCurrentPage(Number(pageNum));
    }

    let showItems = images.slice(currentPage, end);


    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Image Gallery
                </h1>

                {/* Show ALL images (no slicing) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {showItems.map((image) => (
                        <div key={image.id} className="bg-white rounded-lg shadow p-2">
                            <img
                                src={image.url}
                                alt={image.title}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h3 className="mt-2 font-semibold">{image.title}</h3>
                            <p className="text-sm text-gray-500">{image.photographer}</p>
                        </div>
                    ))}
                </div>



                {/* Static Buttons (no logic) */}
                <div className="flex justify-center gap-2">
                    <button
                         disabled={currentPage === 1}
                         onClick={()=> setCurrentPage(currentPage - 1)}
                        className={`px-4 py-2 text-sm border rounded bg-blue-500  ${currentPage === 1 ? "cursor-not-allowed" : "hover:bg-blue-600"}`}
                    >
                        ← Prev
                    </button>
                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                onClick={() => handlePageChange(pageNumber)}
                                key={pageNumber}
                                className={`px-4 py-2 text-sm border rounded  ${pageNumber === currentPage ? "bg-blue-400" : "bg-white hover:bg-gray-100"}`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                    <button
                    disabled={currentPage === totalPages}
                    onClick={()=> setCurrentPage(currentPage + 1)}
                        className={`px-4 py-2 text-sm border rounded bg-blue-500 hover:bg-gray-100 ${currentPage === totalPages ? "cursor-not-allowed" : "hover:bg-blue-600"}`}
                    >
                        Next -
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MyNumPagination;