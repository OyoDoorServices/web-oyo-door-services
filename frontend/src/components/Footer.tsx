import { useState } from 'react';

const Footer = () => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
    setShowServices(false); // hide services when showing contact info
  };

  const toggleServices = () => {
    setShowServices(!showServices);
    setShowContactInfo(false); // hide contact info when showing services
  };

  return (
    <div className="footer">
      <div className="footer-buttons">
        <button onClick={toggleContactInfo}>Contact Info</button>
        <button onClick={toggleServices}>Services</button>
      </div>

      {showContactInfo && (
        <div className="contactinfo">
          <h3>Contact Information</h3>
          <p>Email: info@oyoservices.com</p>
          <p>Phone: +91 12345 67890</p>
          <p>Address: 123, Main Street, Your City, Your State</p>
        </div>
      )}

      {showServices && (
        <div className="about-us">
          <h3>Services Provided</h3>
          <ul className="services-list">
            <li>Plumber</li>
            <li>Carpenter</li>
            <li>Beautician</li>
            <li>Electrician</li>
            <li>AC Service</li>
            <li>Masonry Work</li>
            <li>Toilet Cleaning</li>
            <li>Homemaker</li>
            <li>Laundry</li>
            <li>Salon</li>
            <li>RMP (Registered Medical Practitioner)</li>
            <li>Rental House</li>
            <li>Puncture Repair</li>
            <li>Bike Mechanic</li>
            <li>Home Plans</li>
            <li>Vastu Consultant</li>
            <li>Engineer</li>
            <li>Home Loans</li>
            <li>Bike Finance</li>
            <li>Flat Mediator</li>
            <li>Priest</li>
            <li>Washer (Laundry Worker)</li>
            <li>Domestic Worker</li>
            <li>Marriage Mediator</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Footer;
