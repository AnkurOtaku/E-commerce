import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Policy from "./pages/Policy.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import PrivateRoute from "./components/routes/PrivateRoute.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import AdminRoute from "./components/routes/AdminRoute.jsx";
import UserDashboard from './pages/user/UserDashboard.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import CreateProduct from './pages/Admin/CreateProduct.jsx';
import CreateCategory from './pages/Admin/CreateCategory.jsx';
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
import Products from './pages/Admin/Products.jsx';
import Users from './pages/Admin/Users.jsx';
import Profile from "./pages/user/Profile.jsx";
import Orders from "./pages/user/Orders.jsx";
import Search from "./pages/Search.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Categories from "./pages/Categories.jsx";
import CategoryProduct from './pages/CategoryProduct.jsx';
import Cart from "./pages/Cart.jsx";
import AdminOrders from "./pages/Admin/AdminOrders.jsx";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>

      {/* navbar links */}
      <Route path="search" element={<Search/>}/>
      <Route path="product/:slug" element={<ProductDetails/>}/>
      <Route path="categories" element={<Categories/>}/>
      <Route path="category/:slug" element={<CategoryProduct/>}/>
      <Route path="cart" element={<Cart/>}/>
      <Route path="forgot-password" element={<ForgotPassword/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="login" element={<Login/>}/>
      
      {/* user links */}
      <Route path="dashboard" element={<PrivateRoute/>}>
        <Route path="user" element={<UserDashboard/>}/>
        <Route path="user/profile" element={<Profile/>}/>
        <Route path="user/orders" element={<Orders/>}/>
      </Route>

      {/* admin links */}
      <Route path="dashboard" element={<AdminRoute/>}>
        <Route path="admin" element={<AdminDashboard/>}/>
        <Route path="admin/create-category" element={<CreateCategory/>}/>
        <Route path="admin/create-product" element={<CreateProduct/>}/>
        <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
        <Route path="admin/products" element={<Products/>}/>
        <Route path="admin/users" element={<Users/>}/>
        <Route path="admin/orders" element={<AdminOrders/>}/>
      </Route>

      {/* footer links */}
      <Route path="about" element={<About/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="policy" element={<Policy/>}/>

      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
