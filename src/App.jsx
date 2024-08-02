import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AddItem from "./components/Pages/AddItem";
import ListItems from "./components/Pages/ListItems";
import Orders from "./components/Pages/Orders";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AddItem />}></Route>
        <Route path="/list" element={<ListItems />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default App;
