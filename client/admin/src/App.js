import { Routes, Route } from "react-router-dom"
import { AccForm, AccInfo, FoodForm, FoodStataticsDetail, FoodType, Home, ImportCoupon, Login, OrderDetail, Role, TopicStataticsDetail } from "./pages"
import { FoodGroupItems, Navbar } from "./components";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { useEffect } from "react";
import axios from "axios";


function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    
    axios.get(process.env.REACT_APP_SERVER_URL + '/verify/admin')
      .then(res => {
        if(res.data !== "Not found token"){
          dispatch(login(res.data))
        }
      })
      .catch(err => console.log(err))
  }, [])
  
  
  return (
    <div className="dark:bg-gray-900 pt-[6rem]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/:id" element={<Home />} />
        <Route path="/topic/:id" element={<FoodGroupItems />} />
        <Route path="/topic/statatics/:id" element={<TopicStataticsDetail />} />

        <Route path="/food/:id/add" element={<FoodForm />} />
        <Route path="/food/detail/:id" element={<FoodForm />} />
        <Route path="/food/statatics/:id" element={<FoodStataticsDetail />} />

        <Route path="/acc/user/:id" element={<AccInfo />} />
        <Route path="/acc/user/add" element={<AccForm />} />
        <Route path="/acc/supplier/:id" element={<AccInfo />} />
        <Route path="/acc/supplier/add" element={<AccForm />} />
        <Route path="/acc/staff/add" element={<AccForm />} />
        <Route path="/acc/staff/:id" element={<AccInfo />} />
        <Route path="/acc/deliveryman/add" element={<AccForm />} />
        <Route path="/acc/deliveryman/:id" element={<AccInfo />} />
        <Route path="/acc/admin/add" element={<AccForm />} />
        <Route path="/acc/admin/:id" element={<AccInfo />} />
        <Route path="/acc/role" element={<Role />} />
        
        <Route path="/order/:id" element={<OrderDetail />} />

        <Route path="/foodtype" element={<FoodType />} />
        <Route path="/importcoupon/add" element={<ImportCoupon />}/>
        <Route path="/importcoupon/:id" element={<ImportCoupon />}/>
      </Routes>
    </div>
  );
}

export default App;
