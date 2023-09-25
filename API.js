import GuestList from './src/App';

const baseUrl = 'http://localhost:4000';

// API GET method to fetch all guests
export async function getAllGuestsFromAPI() {
  const response = await fetch(`${baseUrl}/guests`);
  const allGuests = await response.json();
  return allGuests;
}

// creating async function for API POST method
export async function createNewGuestInAPI(newGuest) {
  const response = await fetch(`${baseUrl}/guests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: newGuest.firstName,
      lastName: newGuest.lastName,
    }),
  });
  const createdGuest = await response.json();
  return createdGuest;
}

// creating async function for API DELETE method
export async function deleteGuestFromAPI(deletedGuestID) {
  const response = await fetch(`${baseUrl}/guests/${deletedGuestID}`, {
    method: 'DELETE',
  });
  const deletedGuest = await response.json();
  console.log(deletedGuest);
  guests.filter((guest) => guest.id !== deletedGuest.id);
}

// creating async function for API PATCH method
export async function updateGuestFromAPI(updatedGuestID, attending) {
  const response = await fetch(`${guestApiUrl}/${updatedGuestID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ attending: attending }),
  });
  const updatedGuest = await response.json();
  return updatedGuest;
}
