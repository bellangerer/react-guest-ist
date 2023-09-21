import './App.css';
import './index.css';

export default function App() {
  return (
    <div className="App">
      <p>Guest List</p>
      <input type="firstName" onChange={(e) => console.log(e.target.value)} />
      <input type="lastName" onChange={(e) => console.log(e.target.value)} />
    </div>
  );
}
