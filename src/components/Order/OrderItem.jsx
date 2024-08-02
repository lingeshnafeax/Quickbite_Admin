import PropTypes from "prop-types";
import OrderBoxIcon from "../ui/OrderBoxIcon";
import axios from "axios";

import toast from "react-hot-toast";
const OrderItem = ({ order }) => {
  const changeOrderStatus = async (status, orderId) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/changeOrderStatus`,
        {
          orderId: orderId,
          status: status,
        }
      );
      if (response.data.success) {
        toast.success("Status changes successfully");
      } else {
        toast.error("Failed to change order status");
      }
    } catch (err) {
      toast.error("Failed to change order status");
      console.log("Failed to change order status", err);
    }
  };
  return (
    <div className="grid grid-cols-5  items-center gap-3 rounded-md border border-primary p-3 text-[12px] lg:grid-cols-7 lg:p-5 lg:text-sm">
      <div className="col-span-2 flex flex-col items-start  gap-y-2  gap-x-2 lg:col-span-4">
        <div className="w-full flex gap-x-2 items-center ">
          <OrderBoxIcon />
          {order.items.map((item, index) => {
            return (
              <p className="font-bold" key={index}>
                {` ${item.name} - ${item.quantity} x ${item.price} `}
              </p>
            );
          })}
        </div>
        <div className="flex lg:flex-col gap-y-1">
          <h1 className="font-bold ">Delivery info</h1>
          <p className="">{order.address.street}</p>
          <p className="">{order.address.zipCode}</p>
          <p className="">{order.address.city}</p>
          <p className="">{order.address.phone}</p>
        </div>
      </div>
      <div>
        Items :{" "}
        {order.items.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0)}
      </div>
      <div>₹{order.amount}</div>

      <div>
        <select
          onChange={(e) => {
            changeOrderStatus(e.target.value, order._id);
          }}
          defaultValue={order.status}
          className="p-1 border border-primary rounded-md"
        >
          <option value="Food Processing">Food Processing</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object,
};

export default OrderItem;
