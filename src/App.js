import './App.module.scss';
import React, { useEffect, useState } from 'react';
import { createNewGuestInAPI, getAllGuestsFromAPI } from '../API.js'; // Import API functions

export default function GuestList() {
  // Initialize state variables
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAttending, setIsAttending] = useState(false);

  const baseUrl = 'http://localhost:4000';
  // Fetch guest data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${baseUrl}/guests`);
        const allGuests = await response.json();
        setGuests(allGuests);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function deleteGuestFromAPI(deletedGuestID) {
    const response = await fetch(`${baseUrl}/guests/${deletedGuestID}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    console.log(deletedGuest);
    setGuests(guests.filter((guest) => guest.id !== deletedGuest.id));
  }

  // Function to create a new guest
  async function createGuest() {
    console.log(firstName, lastName);
    if (!firstName || !lastName) {
      alert('Please enter both first and last names.');
      return;
    }

    try {
      const newGuest = {
        firstName,
        lastName,
        attending: isAttending, // set default values here
      };
      console.log(newGuest);
      // Sending the new guest data to the API
      const createdGuest = await createNewGuestInAPI(newGuest);

      // Updating the state with the newly created guest
      setGuests([...guests, createdGuest]);
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.error('Error creating guest:', error);
    }
  }

  return (
    <div>
      <h1>Guest List</h1>
      <div>
        <label htmlFor="firstName">First name:</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last name:</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button onClick={createGuest}>Add new guest</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {guests.map((guest) => (
            <li key={guest.id}>
              <input
                type="checkbox"
                checked={guest.attending}
                onChange={() => {
                  // Toggle the attending status
                  const updatedGuests = guests.map((g) => {
                    if (g.id === guest.id) {
                      return { ...g, attending: !g.attending };
                    }
                    return g;
                  });
                  setGuests(updatedGuests);
                }}
              />
              <button onClick={() => deleteGuestFromAPI(guest.id)}>
                Delete
              </button>
              <span>
                {guest.firstName} {guest.lastName}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
