
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Layout from "./views/Layout";
import Home from './views/Home';
import Profile from "./views/Profile";
import Settings from "./views/Settings";
import Notification from "./views/Notifications";
import Products from './views/Products';
import NewProduct from './views/NewProduct';
import NotFound from './views/NotFound';
import Login from './views/Login';
import Register from './views/Register';
import Categories from './views/Categories';
import Users from "./views/Users";
import Order from "./views/Order";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='settings' element={<Settings />} />
          <Route path='notification' element={<Notification />} />
          <Route path='products' element={<Products />} />
          <Route path='products/new' element={<NewProduct />} />
          <Route path='categories' element={<Categories />} />
          <Route path='users' element={<Users />} />
          <Route path='orders' element={<Order />} />
        </Route>
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;