import { useParams, useNavigate } from "react-router-dom";

export default function Item() {
  const items = [
    "Item 1", "Item 2", "Item 3", "Item 4", "Item 5",
    "Item 6", "Item 7", "Item 8", "Item 9", "Item 10",
    "Item 11", "Item 12", "Item 13", "Item 14", "Item 15"
  ];

  const itemsPerPage = 5;

  let {page} = useParams();
  let currentPageNum = parseInt(page) || 1;

  let totalPageNum = parseInt(items.length / itemsPerPage);
  let startIdx = (currentPageNum - 1) * itemsPerPage ;

  let currItems = items.slice(startIdx, currentPageNum * itemsPerPage) // 

  
  let navigate = useNavigate();
  const changeURL = (pageNum) => navigate(`/item/${pageNum}`)



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Pagination Example</h2>

        <ul className="space-y-2">
          {currItems.map((item, index) => (
            <li key={index} className="p-2 bg-blue-100 rounded text-center">
              {item}
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-6">
          <button
          onClick={()=> changeURL(currentPageNum - 1)}
            disabled={currentPageNum === 1}
            className={`px-4 py-2 ${currentPageNum === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-400 hover:cursor-pointer"} rounded text-white `}
          >
            Previous
          </button>

          <span className="font-semibold">
            {currentPageNum} / {totalPageNum}
          </span>

          <button
            onClick={()=> changeURL(currentPageNum + 1)}
            disabled={currentPageNum === totalPageNum}
            className={`px-4 py-2 rounded text-white 
                ${currentPageNum === 3 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-400 hover:cursor-pointer "} `}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}