import React, { useState, useEffect } from "react";
import database from "./database.json";
import "./styles/SearchSystem.css";
import MapComponent from "./map";

const SearchSystem = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    id: "",
    comment: "",
    latitude: "",
    longitude: "",
    telephoneNumber: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState({
    firstName: [],
    lastName: [],
    address: [],
  });
  const [latitude, setLatitude] = useState(searchTerm.latitude);
  const [longitude, setLongitude] = useState(searchTerm.longitude);
  useEffect(() => {
    setData(database);
  }, []);

  useEffect(() => {
    const results = data.filter((person) =>
      Object.keys(searchTerm).some((key) =>
        person[key]
          .toString()
          .toLowerCase()
          .includes(searchTerm[key].toLowerCase())
      )
    );
    setSearchResults(results);
  }, [searchTerm, data]);

  useEffect(() => {
    const firstNameSuggestions = data.map((person) => person.firstName);
    const lastNameSuggestions = data.map((person) => person.lastName);
    const addressSuggestions = data.map((person) => person.address);
    setSuggestions({
      firstName: [...new Set(firstNameSuggestions)],
      lastName: [...new Set(lastNameSuggestions)],
      address: [...new Set(addressSuggestions)],
    });
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchTerm((prevSearchTerm) => ({
      ...prevSearchTerm,
      [name]: value,
    }));
    if (name === "latitude" || name === "longitude") {
      setLatitude(name === "latitude" ? value : searchTerm.latitude);
      setLongitude(name === "longitude" ? value : searchTerm.longitude);
    }
    // Autofill logic

    if (name === "firstName" && value.trim() !== "") {
      const filteredLastNameSuggestions = data
        .filter(
          (person) => person.firstName.toLowerCase() === value.toLowerCase()
        )
        .map((person) => person.lastName);

      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        lastName: [...new Set(filteredLastNameSuggestions)],
      }));

      if (searchTerm.lastName) {
        const person = data.find(
          (person) =>
            person.firstName.toLowerCase() === value.toLowerCase() &&
            person.lastName.toLowerCase() === searchTerm.lastName.toLowerCase()
        );
        if (person) {
          setSearchTerm((prevSearchTerm) => ({
            ...prevSearchTerm,
            address: person.address,
            id: person.id.toString(),
            comment: person.comment,
            latitude: person.latitude,
            longitude: person.longitude,
            telephoneNumber: person.telephoneNumber,
          }));
        } else {
          setSearchTerm((prevSearchTerm) => ({
            ...prevSearchTerm,
            address: "",
            id: "",
            comment: "",
            latitude: "",
            longitude: "",
            telephoneNumber: "",
          }));
        }
      }
    } else if (name === "lastName" && value.trim() !== "") {
      const filteredFirstNameSuggestions = data
        .filter(
          (person) => person.lastName.toLowerCase() === value.toLowerCase()
        )
        .map((person) => person.firstName);

      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        firstName: [...new Set(filteredFirstNameSuggestions)],
      }));

      if (searchTerm.firstName) {
        const person = data.find(
          (person) =>
            person.firstName.toLowerCase() ===
              searchTerm.firstName.toLowerCase() &&
            person.lastName.toLowerCase() === value.toLowerCase()
        );
        if (person) {
          setSearchTerm((prevSearchTerm) => ({
            ...prevSearchTerm,
            address: person.address,
            id: person.id.toString(),
            comment: person.comment,
            latitude: person.latitude,
            longitude: person.longitude,
            telephoneNumber: person.telephoneNumber,
          }));
        } else {
          setSearchTerm((prevSearchTerm) => ({
            ...prevSearchTerm,
            address: "",
            id: "",
            comment: "",
            latitude: "",
            longitude: "",
            telephoneNumber: "",
          }));
        }
      }
    } else if (name === "firstName" && value.trim() === "") {
      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        lastName: [...new Set(data.map((person) => person.lastName))],
      }));

      setSearchTerm((prevSearchTerm) => ({
        ...prevSearchTerm,
        address: "",
        id: "",
        comment: "",
        latitude: "",
        longitude: "",
        telephoneNumber: "",
      }));
    } else if (name === "lastName" && value.trim() === "") {
      setSuggestions((prevSuggestions) => ({
        ...prevSuggestions,
        firstName: [...new Set(data.map((person) => person.firstName))],
      }));

      setSearchTerm((prevSearchTerm) => ({
        ...prevSearchTerm,
        address: "",
        id: "",
        comment: "",
        latitude: "",
        longitude: "",
        telephoneNumber: "",
      }));
    } else if (name === "id" && value.trim() !== "") {
      const person = data.find((person) => person.id.toString() === value);
      if (person) {
        setSearchTerm((prevSearchTerm) => ({
          ...prevSearchTerm,
          firstName: person.firstName,
          lastName: person.lastName,
          address: person.address,
          comment: person.comment,
          latitude: person.latitude,
          longitude: person.longitude,
          telephoneNumber: person.telephoneNumber,
        }));
      } else {
        setSearchTerm((prevSearchTerm) => ({
          ...prevSearchTerm,
          firstName: "",
          lastName: "",
          address: "",
          comment: "",
          latitude: "",
          longitude: "",
          telephoneNumber: "",
        }));
      }
    } else if (name === "address" && value.trim() !== "") {
      const person = data.find(
        (person) => person.address.toLowerCase() === value.toLowerCase()
      );
      if (person) {
        setSearchTerm((prevSearchTerm) => ({
          ...prevSearchTerm,
          firstName: person.firstName,
          lastName: person.lastName,
          id: person.id.toString(),
          comment: person.comment,
          latitude: person.latitude,
          longitude: person.longitude,
          telephoneNumber: person.telephoneNumber,
        }));
      }
    } else if (name === "latitude") {
      const person = data.find((person) => person.latitude === value);
      if (person) {
        setSearchTerm((prevSearchTerm) => ({
          ...prevSearchTerm,
          firstName: person.firstName,
          lastName: person.lastName,
          address: person.address,
          id: person.id.toString(),
          comment: person.comment,
          longitude: person.longitude,
          telephoneNumber: person.telephoneNumber,
        }));
      } else {
        setSearchTerm((prevSearchTerm) => ({
          ...prevSearchTerm,
          firstName: "",
          lastName: "",
          address: "",
          id: "",
          comment: "",
          longitude: "",
          telephoneNumber: "",
        }));
      }
    } else if (name === "longitude") {
      const person = data.find((person) => person.longitude === value);
      if (person) {
        setSearchTerm((prevSearchTerm) => ({
          ...prevSearchTerm,
          firstName: person.firstName,
          lastName: person.lastName,
          address: person.address,
          id: person.id.toString(),
          comment: person.comment,
          latitude: person.latitude,
          telephoneNumber: person.telephoneNumber,
        }));
      } else {
        setSearchTerm((prevSearchTerm) => ({
          ...prevSearchTerm,
          firstName: "",
          lastName: "",
          address: "",
          id: "",
          comment: "",
          latitude: "",
          telephoneNumber: "",
        }));
      }
    }
  };

  const handleReset = () => {
    window.location.reload(false);
  };

  const handleClearInput = (inputName) => {
    setSearchTerm((prevSearchTerm) => ({
      ...prevSearchTerm,
      [inputName]: "",
    }));
  };

  return (
    <div className="main-div">
      <div className="left-side">
        <h1>Flower Delivery</h1>
        <h3>First Name</h3>
        <input
          type="text"
          placeholder="Search First Name"
          name="firstName"
          value={searchTerm.firstName}
          onChange={handleChange}
          list="firstNameSuggestions"
          className="search-input"
        />
        <datalist id="firstNameSuggestions">
          {suggestions.firstName.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>

        <h3>Last Name</h3>
        <input
          type="text"
          placeholder="Search Last Name"
          name="lastName"
          value={searchTerm.lastName}
          onChange={handleChange}
          list="lastNameSuggestions"
          className="search-input"
        />
        <datalist id="lastNameSuggestions">
          {suggestions.lastName.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        <h3>Phone Number</h3>
        <input
          type="text"
          placeholder="Search Phone Number"
          name="telephoneNumber"
          value={searchTerm.telephoneNumber}
          onChange={handleChange}
          className="search-input"
        />
        <h3>ID</h3>
        <input
          type="text"
          placeholder="Search ID"
          name="id"
          value={searchTerm.id}
          onChange={handleChange}
          className="search-input"
        />
        <h3>Address</h3>
        <input
          type="text"
          placeholder="Search Address"
          name="address"
          value={searchTerm.address}
          onChange={handleChange}
          list="addressSuggestions"
          className="search-input"
        />
        <datalist id="addressSuggestions">
          {suggestions.address.map((address) => (
            <option key={address} value={address} />
          ))}
        </datalist>

        {/* <h3>Latitude</h3>
        <input
          type="text"
          placeholder="Search Latitude"
          name="latitude"
          value={searchTerm.latitude + searchTerm.longitude}
          onChange={handleChange}
          className="search-input"
        />

        <h3>Longitude</h3>
        <input
          type="text"
          placeholder="Search Longitude"
          name="longitude"
          value={searchTerm.longitude}
          onChange={handleChange}
          className="search-input"
        /> */}

        <h3>Comment</h3>
        <textarea
          type="text"
          placeholder="Search Comment"
          name="comment"
          value={searchTerm.comment}
          onChange={handleChange}
          className="search-input comment-input"
        />

        <button onClick={handleReset} className="slick-button">
          Reset
        </button>
      </div>
      <div className="right-side">
        <MapComponent
          longitude={searchTerm.longitude}
          latitude={searchTerm.latitude}
        />
      </div>
    </div>
  );
};

export default SearchSystem;
