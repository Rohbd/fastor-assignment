import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Login from "./components/Login.tsx";
import OTPVerification from "./components/OTPVerification.tsx";
import Restaurant from "./components/Restaurant.tsx";
import Cartproduct from "./components/Cartproduct.tsx";

function App() {
    return (
        <div className="h-screen">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/otp-form" element={<OTPVerification/>}/>
                    <Route path="/restaurant" element={<Restaurant/>}/>
                    <Route path="/cart" element={<Cartproduct/>}/>
                </Routes>
                <Toaster position="bottom-center" reverseOrder={false}/>
            </BrowserRouter>
        </div>
    );

}

export default App
