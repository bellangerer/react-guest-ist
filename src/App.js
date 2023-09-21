import './App.css';
import './index.css';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    async function firstRenderFetch() {
      const response = await fetch('http://localhost:4000/guests/');

      const data = await response.json();
      console.log(data);
    }

    firstRenderFetch().catch((error) => {
      console.log(error);
    });
  }, []); // triggers only on first render
  // creating a new guest (from the backend)
  const response = await fetch(`${baseUrl}/guests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...}),
  });
  const createdGuest = await response.json();

  return (
    <div className="App">
      <p>Guest List</p>
      <input type="firstName" onChange={(e) => console.log(e.target.value)} />
      <input type="lastName" onChange={(e) => console.log(e.target.value)} />
      <input type="first name" placeholder="Return" />
    </div>
  );
}
