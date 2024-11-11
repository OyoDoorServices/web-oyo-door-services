import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate('/');
  };

  const onLoginClick = () => {
    navigate('/sign_in');
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="buttons">
        <button className="Homebutton" onClick={onHomeClick}>Home</button>
        <button className="Servicebutton">Services</button>
        <button className="Loginbutton" onClick={onLoginClick}>Login</button>
      </div>
    </div>
  );
};

export default Header;
