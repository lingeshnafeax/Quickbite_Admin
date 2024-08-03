import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AddItem from "./components/Pages/AddItem";
import ListItems from "./components/Pages/ListItems";
import Orders from "./components/Pages/Orders";
import LoginModel from "./components/Login/LoginModel";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginModel />} />
      <Route path="/" element={<PrivateRoute element={Layout} />}>
        <Route index element={<AddItem />} />
        <Route path="/list" element={<ListItems />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default App;
