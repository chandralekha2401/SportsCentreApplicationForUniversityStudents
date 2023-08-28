
import './App.css';
import {Login,ForgotPassword} from './pages/login';
import { BrowserRouter, Route,Routes } from "react-router-dom";
import StuRegister from './pages/register';
import InsRegister from './pages/instructor-register';
import Dashboard from './pages/dashboard';
import PayPalCheckout from './components/PayPalCheckout';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<StuRegister />} />
      <Route path="/instructor-register" element={<InsRegister />} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/paypal' element={<PayPalCheckout/>}/>
      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
