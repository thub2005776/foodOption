import { Routes, Route } from "react-router-dom"
import { Footer, Navbar } from "./components";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { useEffect } from "react";
import axios from "axios";

import { 
  AccInfo, 
  FoodDetail, 
  Home, 
  Login, 
  SignUp, 
  Play, 
  Trend, 
  Notify, 
  Topic, 
  Cart, 
  Order, 
  Ordered, 
  OrderList,
  Review, 
  Favorited} from "./pages"

import { SuccessMesage } from './components'

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + '/verify/user')
      .then(res => {
        if (res.data !== "Not found token") {
          dispatch(login(res.data))
        }
      })
      .catch(err => {
        console.log(err);
      })
  }, [])


  return (
    <div className="dark:bg-gray-900 pt-[6rem]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/acc/:id" element={<AccInfo />} />
        <Route path="acc/:id/ordered" element={<OrderList />} />
        <Route path="acc/:id/favorited" element={<Favorited />} />

        <Route path="/foodopt" element={<Play />} />
        <Route path="/trend" element={<Trend />} />
        <Route path="/notify" element={<Notify />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/topic/:id" element={<Topic />} />
        <Route path="/cart/:id" element={<Cart />} />

        <Route path="/order/:id" element={<Order />} />
        <Route path="/ordered/:id" element={<Ordered />} />
        <Route path="/payment/successfull/:id" element={<SuccessMesage />} />

        <Route path="/review/:id" element={<Review />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
