import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "../ui/DeleteIcon";
import toast from "react-hot-toast";

const ListItems = () => {
  const [foodList, setFoodList] = useState([]);

  const fetchFoods = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/list`
      );
      if (response.data.success) {
        setFoodList(response.data.data);
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
    fetchFoods();
  }, []);

  return (
    <div className="grid grid-cols-5 lg:grid-cols-7 lg:m-10 lg:gap-y-6 mx-5 lg:gap-x-6 gap-x-5 gap-y-5">
      <p className="lg:text-2xl font-bold">Image</p>
      <p className="lg:text-2xl font-bold">Name</p>
      <p className="lg:text-2xl font-bold">Category</p>
      <p className="lg:text-2xl hidden lg:block font-bold col-span-2">
        Description
      </p>
      <p className="lg:text-2xl font-bold">Price</p>
      <p className="lg:text-2xl font-bold">Delete</p>
      {foodList.map((item) => (
        <div
          key={item._id}
          className="col-span-5 lg:col-span-7 grid grid-cols-5 lg:grid-cols-7 gap-x-5 gap-y-5"
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
  );
};

export default ListItems;
