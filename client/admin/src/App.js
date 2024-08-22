import { Routes, Route } from "react-router-dom"
import { AccInfo, FoodForm, Home, Login } from "./pages"
import { FoodGroupItems, Navbar } from "./components";
// import { useMutation } from "react-query";
// import { verifyApi } from "./api/authActions";
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
        <Route path="/food/add/:id" element={<FoodForm />} />
        <Route path="/food/detail/:id" element={<FoodForm />} />
        <Route path="/acc/:id" element={<AccInfo />} />
      </Routes>
    </div>
  );
}

export default App;
