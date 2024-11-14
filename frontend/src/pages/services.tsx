import { useState } from "react";
import "../styles/Services.scss"; // Adjust the path as needed
import delivery from "../assets/delivery.jpeg";

const Services = () => {
  const [search, setSearch] = useState("");

  const servicesList = [
    { id: 1, imgSrc: delivery, title: "Delivery Service", text: "Delivery services for your convenience." },
    { id: 2, imgSrc: "path/to/mechanic.jpg", title: "Mechanic Service", text: "Expert mechanical services for your vehicle." },
    { id: 3, imgSrc: "path/to/physiotherapy.jpg", title: "Physiotherapy", text: "Physiotherapy for pain relief and recovery." },
    { id: 4, imgSrc: "path/to/cleaning.jpg", title: "Cleaning Service", text: "Cleaning services for your home and office." },
    { id: 5, imgSrc: "path/to/painting.jpg", title: "Gardening", text: "Gardening services to beautify your outdoor space." },
    { id: 6, imgSrc: "path/to/ac.jpg", title: "Painting Service", text: "Interior and exterior painting services." },
  ];

  // Display filtered services if a search term exists; otherwise, display all services
  const displayedServices = search
    ? servicesList.filter((service) =>
        service.text.toLowerCase().includes(search.toLowerCase())
      )
    : servicesList;

  return (
    <div className="wholepage">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search for a service"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="services">
        <ul className="services-list">
          {displayedServices.map((service) => (
            <li key={service.id} className="service-item">
              <div className="service">
                <img src={service.imgSrc} alt={service.title} className="service-img" />
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Services;
