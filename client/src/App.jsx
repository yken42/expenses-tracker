import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Overview } from './components/overview/Overview';
import { Expenses } from './components/Expenses';
import { Settings } from './components/Settings';
import { LoginForm } from './components/login/LoginForm';

function App() {

  return (
    <>
      <Router>
        <div className='flex'>
        <Navbar />
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
