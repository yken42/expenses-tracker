import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Overview } from './components/overview/Overview';
import { LoginForm } from './components/login/LoginForm';

function App() {
  return (
    <>
      <Router>
        <div className='flex'>
          <Routes>
            <Route path='/login' element={<LoginForm />} />
            <Route path="/overview" element={<Overview />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
