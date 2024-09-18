import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Karthik from "./Pages/karthik";
//import Sidebar from "./Components/Sidebar";
import Summary from "./Pages/Summary";

function App() {
 

  return (
   <div>
    
   
    <Routes>
      <Route path="/" exact element={<Karthik />} />
      <Route path="/summary" exact element={<Summary />} />
      </Routes>
    </div>
     
  )
}

export default App
