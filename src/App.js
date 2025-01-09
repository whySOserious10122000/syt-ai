import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/HomePage';
import Packages from './Pages/Packages';
import TravelPlan from './Pages/TravelPlan';
import TripDetailsForm from './Components/TripInsert';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TripDetailsForm />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
