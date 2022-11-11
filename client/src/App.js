import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Tripple from "./components/binance/tripple/Tripple";
import Double from "./components/binance/double/Double";
import Navbar from "./components/navbar/Navbar";
import Auth from "./components/auth/Auth";

function App() {
  return (
    <div className='App'>
        <Router>
            <Routes>
                <Route path="/" element={<Auth/>} />
                <Route path="/home" element={<Navbar/>} />
                <Route path="/binance/tripple" element={<Tripple/>} />
                <Route path="/binance/double" element={<Double/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
