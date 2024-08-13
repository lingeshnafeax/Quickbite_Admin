import axios from "axios";

import toast from "react-hot-toast";
import OrderItem from "../Order/OrderItem";
import { useQuery } from "@tanstack/react-query";
const Orders = () => {
  let output;
  const fetchAllOrders = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/order/allOrders`
    );
    return data.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["orders"], 
    queryFn: fetchAllOrders,
  });
  if (isLoading) {
    output = <p>Loading...</p>;
  }
  if (error) {
    toast.error("Error fetching orders");
    output = <p>Error occurred</p>;
  }
  if (data) {
    output =
      data.length > 0 ? (
        data.map((order) => <OrderItem key={order._id} order={order} />)
      ) : (
        <p>No orders found</p>
      );
  }

  return (
    <div className="mx-4 flex min-h-screen flex-col lg:mx-[120px] lg:mt-6">
      <h1 className="text-xl font-bold lg:text-3xl">All Orders</h1>
      <div className="mt-4 flex flex-grow flex-col gap-y-4 lg:mt-8 lg:gap-y-8">
        {output}
      </div>
    </div>
  );
};

export default Orders;
