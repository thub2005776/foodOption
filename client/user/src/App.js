import { Routes, Route } from "react-router-dom"
import { AccInfo, FoodDetail, Home, Login, SignUp, Play, Trend, Menu } from "./pages"
import { Footer, Navbar } from "./components";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { useEffect } from "react";
import axios from "axios";


function App() {

  const dispatch = useDispatch();
  useEffect(() => {

    axios.get(process.env.REACT_APP_SERVER_URL + '/verify/user')
      .then(res => {
        if (res.data !== "Not found token") {
          dispatch(login(res.data))
        }
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
        <Route path="/foodopt" element={<Play />} />
        <Route path="/trend" element={<Trend />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/food/:id" element={<FoodDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
