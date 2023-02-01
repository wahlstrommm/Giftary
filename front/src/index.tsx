import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Toplist from "./Pages/Toplist";
import Generator from "./Pages/Generator";
import NotFound from "./Pages/NorFound";
import CreateProduct from "./Pages/CreateProduct";
import ProductOverview from "./Pages/ProductOverview";
import UserProductList from "./Pages/UserProductList;";
import Product from "./Pages/Product";
import SharedList from "./Pages/SharedList";
import Profile from "./Pages/Profile";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Toplist" element={<Toplist />}></Route>
        <Route path="/Generator" element={<Generator />}></Route>
        <Route path="/CreateProduct" element={<CreateProduct />}></Route>
        <Route path="/ProductOverview" element={<ProductOverview />}></Route>
        <Route path="/Product/:id" element={<Product />}></Route>
        <Route path="/UserProductList" element={<UserProductList />}></Route>
        <Route path="/api/:id" element={<SharedList />}></Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
