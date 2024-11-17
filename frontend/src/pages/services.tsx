import { useState } from "react";
import delivery from "../assets/delivery.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addService } from "../redux/reducer/orderReducer";
import { Service } from "../types/types";

const Services = () => {
  const [search, setSearch] = useState("");
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const servicesList: Service[] = [
    {
      serviceId: "1",
      photo: delivery,
      name: "Delivery Service",
      description: "Delivery services for your convenience.",
      ratings: 4.5,
      numOfReviews: 200,
    },
    {
      serviceId: "2",
      photo: "path/to/mechanic.jpg",
      name: "Mechanic Service",
      description: "Expert mechanical services for your vehicle.",
      ratings: 4.2,
      numOfReviews: 150,
    },
    {
      serviceId: "3",
      photo: "path/to/physiotherapy.jpg",
      name: "Physiotherapy",
      description: "Physiotherapy for pain relief and recovery.",
      ratings: 4.8,
      numOfReviews: 120,
    },
    {
      serviceId: "4",
      photo: "path/to/cleaning.jpg",
      name: "Cleaning Service",
      description: "Cleaning services for your home and office.",
      ratings: 4.3,
      numOfReviews: 180,
    },
    {
      serviceId: "5",
      photo: "path/to/painting.jpg",
      name: "Gardening",
      description: "Gardening services to beautify your outdoor space.",
      ratings: 4.7,
      numOfReviews: 90,
    },
    {
      serviceId: "6",
      photo: "path/to/ac.jpg",
      name: "Painting Service",
      description: "Interior and exterior painting services.",
      ratings: 4.4,
      numOfReviews: 110,
    },
  ];

  // Filter services based on the search input
  const displayedServices = search
    ? servicesList.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase())
      )
    : servicesList;

  // Toggle selection for a service
  const toggleSelection = (service: Service) => {
    setSelectedServices((prevSelected) =>
      prevSelected.find((s) => s.serviceId === service.serviceId)
        ? prevSelected.filter((s) => s.serviceId !== service.serviceId) // Remove if already selected
        : [...prevSelected, service] // Add if not selected
    );
  };

  // Checkout action: Update Redux state and navigate
  const checkoutHandler = () => {
    if (selectedServices.length === 0) {
      toast.error("No services selected!");
      return;
    }

    // Dispatch selected services to the global store
    selectedServices.forEach((service) => dispatch(addService(service)));

    toast.success("Services added to the cart!");
    navigate("/address");
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
        <button className="bookbutton" onClick={checkoutHandler}>
          Checkout
        </button>
      </div>
      <div className="services">
        <ul className="services-list">
          {displayedServices.map((service) => (
            <li key={service.serviceId} className="service-item">
              <div
                className={`service ${
                  selectedServices.some((s) => s.serviceId === service.serviceId)
                    ? "selected"
                    : ""
                }`}
              >
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={selectedServices.some(
                      (s) => s.serviceId === service.serviceId
                    )}
                    onChange={() => toggleSelection(service)}
                  />
                </div>
                <img
                  src={service.photo}
                  alt={service.name}
                  className="service-img"
                />
                <div className="service-content">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
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
