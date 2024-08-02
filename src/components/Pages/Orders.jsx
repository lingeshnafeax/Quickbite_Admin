import { useEffect, useState } from "react";
import axios from "axios";

import toast from "react-hot-toast";
import OrderItem from "../Order/OrderItem";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/allOrders`
      );
      if (response.data.success) {
        setOrders(response.data.data);
      } else if (response.status === 404) {
        toast.error(response.data.message || "No orders found");
      } else {
        toast.error(response.data.message || "Error fetching the orders");
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(orders);
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="mx-4 flex min-h-screen flex-col lg:mx-[120px] lg:mt-6">
      <h1 className="text-xl font-bold lg:text-3xl">All Orders</h1>
      <div className="mt-4 flex flex-grow flex-col gap-y-4 lg:mt-8 lg:gap-y-8">
        {orders.length > 0 ? (
          orders.map((order) => <OrderItem key={order._id} order={order} />)
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
