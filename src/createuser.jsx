import React, { useState } from 'react';
import axios from 'axios';
import './styles/adduser.css'
const AddUserForm = () => {
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

    if (user.id && user.firstName && user.lastName && user.address && user.latitude && user.longitude && user.telephoneNumber && user.comment) {
      axios.post('http://localhost:5000/register', user)
        .then((response) => {
          console.log(response.data);
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
        })
        .catch((error) => {
          console.error('Error registering user:', error);
        });
    } else {
      console.log('Please fill in all the fields');
    }
  };

  return (
    <div className=' '>
    <div class="form-container">
    <h2>Add User</h2>
    <form onSubmit={handleSubmit}>
      <label>
        ID:
        <input
          type="text"
          name="id"
          class="form-input"
          value={user.id}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          class="form-input"
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
          class="form-input"
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
          class="form-input"
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
          class="form-input"
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
          class="form-input"
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
          class="form-input"
          value={user.telephoneNumber}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Comment:
        <textarea
          name="comment"
          class="form-input"
          value={user.comment}
          onChange={handleChange}
          required
        ></textarea>
      </label>
      <button type="submit">Add User</button>
    </form>
  </div>
  </div>
  );
};

export default AddUserForm;
