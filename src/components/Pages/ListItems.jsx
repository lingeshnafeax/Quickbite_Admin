import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "../ui/DeleteIcon";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const ListItems = () => {
  const [foodList, setFoodList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);

  const nextPage = () => {
    const page = Number(searchParams.get("page"));
    if (page < totalPages) {
      // Go to next page only if there is a next page 6->7 ✔️ (Can go to next page) 7->7 ❌ (Can't go to next page)
      setSearchParams({
        page: page + 1,
        limit: Number(searchParams.get("limit")),
      });
    }
  };
  const prevPage = () => {
    const page = Number(searchParams.get("page"));
    if (page > 1) {
      // Only go to previous page if the page is greater than 1
      setSearchParams({
        page: page - 1,
        limit: Number(searchParams.get("limit")),
      });
    }
  };

  const fetchFoods = async () => {
    // Getting the page and limit from the search params

    const pageNumber = Number(searchParams.get("page"));
    const limitNumber = Number(searchParams.get("limit"));
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/food/list?page=${pageNumber}&limit=${limitNumber}`
      );
      if (response.data.success) {
        setFoodList(response.data.data);
        setTotalPages(response.data.totalPages); // Total number of pages from backend
      }
    } catch (err) {
      toast.error("Failed to fetch food items");
      console.log("Error fetching food items:", err);
    }
  };

  const deleteFood = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/remove/${id}`
      );
      if (!response.data.success) {
        return toast.error("Error deleting food item");
      }
      toast.success("Food item deleted successfully");
      fetchFoods();
    } catch (err) {
      toast.error("Failed to delete food item");
      console.log("Error deleting food item:", err);
    }
  };

  useEffect(() => {
    // Initially setting the page and limit in the search params
    if (!searchParams.get("page") && !searchParams.get("limit")) {
      setSearchParams({ page: 1, limit: 5 }); // Default params
    }
    // Fetch with the default params
    fetchFoods();
  }, [searchParams]);

  return (
    <div>
      <div className="grid grid-cols-5 lg:grid-cols-7 lg:m-10 lg:gap-y-6 mx-5 lg:gap-x-6 gap-x-5 gap-y-5">
        <p className="lg:text-2xl text-sm font-bold">Image</p>
        <p className="lg:text-2xl text-sm font-bold">Name</p>
        <p className="lg:text-2xl text-sm font-bold">Category</p>
        <p className="lg:text-2xl hidden lg:block font-bold col-span-2">
          Description
        </p>
        <p className="lg:text-2xl text-sm font-bold">Price</p>
        <p className="lg:text-2xl text-sm font-bold">Delete</p>
        {foodList.map((item) => (
          <div
            key={item._id}
            className="col-span-5 lg:col-span-7 grid grid-cols-5 min-h-full lg:grid-cols-7 gap-x-5 gap-y-5"
          >
            <img
              className="lg:h-20 h-14 w-14 lg:w-20 rounded-lg"
              src={`${import.meta.env.VITE_BACKEND_URL}/images/${item.image}`}
              alt={`${item.name}`}
            />
            <p className="text-sm col-span-1 lg:col-span-1">{item.name}</p>
            <p className="text-sm col-span-1">{item.category}</p>
            <p className="text-sm col-span-2 hidden lg:block">
              {item.description}
            </p>
            <p className="text-sm col-span-1">₹{item.price}</p>
            <button
              className="flex items-start justify-start col-span-1"
              onClick={() => deleteFood(item._id)}
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between mx-7 my-5  lg:mx-12 ">
        {totalPages > 1 && (
          <>
            <button
              className={`${
                Number((searchParams.get("page") || 1) <= 1)
                  ? "opacity-0"
                  : "block"
              } bg-primary p-1 px-2 text-white rounded-lg `}
              onClick={prevPage}
            >
              Prev
            </button>

            <button
              className={`${
                Number((searchParams.get("page") || 1) >= totalPages)
                  ? "opacity-0"
                  : "block"
              }  bg-primary p-1 px-2 text-white rounded-lg `}
              onClick={nextPage}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ListItems;
