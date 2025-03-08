import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';

function App() {

  return (
    <>
      <Router>
        <div className='flex'>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
