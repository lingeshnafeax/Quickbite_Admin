import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";

import toast from "react-hot-toast";

const AddItem = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const categories = [
    "Salad",
    "Rolls",
    "Deserts",
    "Sandwich",
    "Cake",
    "Pure Veg",
    "Pasta",
    "Noodles",
  ];
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const submitHandler = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Food item added successfully");
        setImage(null);
        setImagePreview(null);
        reset();
      } else {
        console.log("Error posting data");
        toast.error("Error adding food item");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding food item");
    }
  };

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url); // Cleanup
    }
  }, [image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="flex flex-col mt-3 lg:m-8 lg:gap-y-3 mx-5">
      <h1 className="lg:text-3xltext-2xl mb-5 lg:mb-0 font-bold">Add food</h1>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col lg:gap-y-5 gap-y-4"
      >
        <div className="flex flex-col gap-y-2 lg:gap-y-3">
          <p className="font-semibold">Product image</p>
          <label htmlFor="image">
            <img
              src={imagePreview || assets.upload_area}
              className="h-16 w-16 lg:h-24 rounded-lg lg:w-24 "
              alt="Preview"
              style={{ objectFit: "cover" }}
            />
          </label>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            id="image"
            onChange={handleFileChange}
            hidden
          />
          {errors.image && (
            <p className="text-red-500 text-sm py-1">{errors.image.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name" className="font-semibold">
            Product name
          </label>
          <input
            className="border rounded-lg p-1"
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm py-1">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="description">
            Product description
          </label>
          <textarea
            className="border rounded-lg p-1 lg:min-h-20"
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm py-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="category">
            Product category
          </label>
          <select
            className="border rounded-lg p-1"
            id="category"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm py-1">
              {errors.category.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="price">
            Product price
          </label>
          <input
            className="border rounded-lg p-1"
            type="number"
            id="price"
            {...register("price", { required: "Price is required", min: 0 })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm py-1">{errors.price.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary text-background lg:w-1/12 p-1 rounded-lg"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddItem;
