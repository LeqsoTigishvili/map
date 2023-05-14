import React, { useState } from 'react';
import database from './database.json';

const AddUser = () => {
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    latitude: '',
    longitude: '',
    telephoneNumber: '',
    comment: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user.firstName && user.lastName && user.address && user.latitude && user.longitude && user.telephoneNumber && user.comment) {
      const newUser = {
        id: database.length + 1,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        latitude: user.latitude,
        longitude: user.longitude,
        telephoneNumber: user.telephoneNumber,
        comment: user.comment
      };

      const updatedDatabase = [...database, newUser];
      // You can save the updatedDatabase to the database file or send it to an API for storage

      console.log('User added:', newUser);
      console.log('Updated database:', updatedDatabase);
      database.push(newUser);

      setUser({
        id: '',
        firstName: '',
        lastName: '',
        address: '',
        latitude: '',
        longitude: '',
        telephoneNumber: '',
        comment: ''
      });
    } else {
      console.log('Please fill in all the fields');
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Latitude:
          <input
            type="text"
            name="latitude"
            value={user.latitude}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Longitude:
          <input
            type="text"
            name="longitude"
            value={user.longitude}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Telephone Number:
          <input
            type="text"
            name="telephoneNumber"
            value={user.telephoneNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Comment:
          <textarea
            name="comment"
            value={user.comment}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
