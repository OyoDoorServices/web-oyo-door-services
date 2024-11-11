import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Create a separate component to hold the main app logic
const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_in" element={<Login />} />
      </Routes>
      {location.pathname === '/' && <Footer />}
    </>
  );
};

// Wrap the AppContent component inside Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
