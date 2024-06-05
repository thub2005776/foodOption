import { Routes, Route } from "react-router-dom"
import { AccInfo, FoodDetail, FoodForm, Home, Login, RecipeForm } from "./pages"
import { FoodGroupItems, Navbar } from "./components";
function App() {
  return (
    <div className="dark:bg-gray-900 pt-[6rem]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/:id" element={<Home />} />
        <Route path="/foodgroup/:id" element={<FoodGroupItems />} />
        <Route path="/food/add" element={<FoodForm />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/recipe/add" element={<RecipeForm />} />
        <Route path="/acc/:id" element={<AccInfo />} />
      </Routes>
    </div>
  );
}

export default App;
