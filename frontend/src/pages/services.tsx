import { useState } from "react";
import "../styles/Services.scss"; // Adjust the path as needed
import delivery from "../assets/delivery.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [search, setSearch] = useState("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]); // Tracks selected services by their IDs
  const navigate=useNavigate();

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

  // Toggles the selected state of a service
  const toggleSelection = (id: number) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((serviceId) => serviceId !== id) // Unselect if already selected
        : [...prevSelected, id] // Select if not selected
    );
  };

  // Confirm booking action
  const confirmBooking = () => {
    const selectedTitles = servicesList
      .filter((service) => selectedServices.includes(service.id))
      .map((service) => service.title)
      .join(", ");
    toast.success(`Services booked: ${selectedTitles}`);
    navigate("/address");
  };

  // Cancel booking action
  const cancelBooking = () => {
    toast.error("Booking canceled.");
  };

  // Show toast with options
  const bookServices = () => {
    if (selectedServices.length === 0) {
      toast.error("No services selected!");
    } else {
      const selectedTitles = servicesList
        .filter((service) => selectedServices.includes(service.id))
        .map((service) => service.title)
        .join(", ");

      toast(
        <div>
          <p>You selected: <b>{selectedTitles}</b></p>
          <p>Are you sure you want to book?</p>
          <div>
            <button
              style={{
                marginRight: "10px",
                padding: "5px 10px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
              onClick={confirmBooking}
            >
              Yes
            </button>
            <button
              style={{
                padding: "5px 10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
              onClick={cancelBooking}
            >
              No
            </button>
          </div>
        </div>,
        {
          autoClose: false, // Keep the toast open until user interacts
          closeOnClick: false,
          draggable: false,
        }
      );
    }
  };

  return (
    <div className="wholepage">
      <ToastContainer />
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search for a service"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bookbutton" onClick={bookServices}>
          Book services
        </button>
      </div>
      <div className="services">
        <ul className="services-list">
          {displayedServices.map((service) => (
            <li key={service.id} className="service-item">
              <div
                className={`service ${
                  selectedServices.includes(service.id) ? "selected" : ""
                }`}
              >
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.id)}
                    onChange={() => toggleSelection(service.id)}
                  />
                </div>
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
