
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Layout from "./views/Layout";
import Home from './views/Home';
import Products from './views/Products';
import NewProduct from './views/NewProduct';
import NotFound from './views/NotFound';
import Login from './views/Login';
import Register from './views/Register';
import Categories from './views/Categories';
import NewCategory from './views/NewCategory';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path='products/new' element={<NewProduct />} />
          <Route path='categories' element={<Categories />} />
          <Route path='categories/new' element={<NewCategory />} />
        </Route>
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;