import { useState } from "react";
import axios from "axios";
import DeleteIcon from "../ui/DeleteIcon";
import toast from "react-hot-toast";
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const ListItems = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const queryClient = useQueryClient();

  const fetchFoods = async ({ queryKey }) => {
    // Getting the page and limit from query key values
    // eslint-disable-next-line no-unused-vars
    const [_key, { page, limit }] = queryKey;

    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/food/list`,
      { params: { page, limit } }
    );
    return data;
  };
  const {
    data: foodData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["foods", { page, limit }],
    queryFn: fetchFoods,
    placeholderData: keepPreviousData,
  });

  const nextPage = () => {
    if (page < foodData.totalPages) {
      // Go to next page only if there is a next page 6->7 ✔️ (Can go to next page) 7->7 ❌ (Can't go to next page)
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    if (page > 1) {
      // Only go to previous page if the page is greater than 1
      setPage(page - 1);
    }
  };

  const deleteFood = useMutation({
    mutationFn: async (id) => {
      const {
        data: { success },
      } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/remove/${id}`
      );
      if (success) {
        toast.success("Food deleted sucessfully");
        queryClient.invalidateQueries({ queryKey: ["foods"] });
      } else {
        toast.error("Food deletion failed");
      }
    },
  });
  let output;
  if (error) {
    output = (
      <div className="flex justify-center items-center h-full">
        Error occurred
      </div>
    );
  }
  if (isLoading) {
    output = (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }
  if (foodData) {
    output = (
      <>
        <div className="grid grid-cols-5 lg:grid-cols-7 lg:m-10 lg:gap-y-6 mx-5 lg:gap-x-6 gap-x-5 gap-y-5">
          <p className="lg:text-2xl text-sm font-bold">Image</p>
          <p className="lg:text-2xl text-sm font-bold">Name</p>
          <p className="lg:text-2xl text-sm font-bold">Category</p>
          <p className="lg:text-2xl hidden lg:block font-bold col-span-2">
            Description
          </p>
          <p className="lg:text-2xl text-sm font-bold">Price</p>
          <p className="lg:text-2xl text-sm font-bold">Delete</p>
          {foodData.data.map((item) => (
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
                onClick={() => deleteFood.mutate(item._id)}
              >
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between mx-7 my-5  lg:mx-12 ">
          {foodData.totalPages > 1 && (
            <>
              <button
                className={`${
                  Number(page <= 1) ? "opacity-0" : "block"
                } bg-primary p-1 px-2 text-white rounded-lg `}
                onClick={prevPage}
              >
                Prev
              </button>

              <button
                className={`${
                  Number(page >= foodData.totalPages) ? "opacity-0" : "block"
                }  bg-primary p-1 px-2 text-white rounded-lg `}
                onClick={nextPage}
              >
                Next
              </button>
            </>
          )}
        </div>
      </>
    );
  }

  return output;
};

export default ListItems;
