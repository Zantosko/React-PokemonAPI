import './App.css';
import CardContainer from "./components/CardContainer.jsx";
import { data } from "./data/data";

function App() {
  return (
    <div className="App">
      <h1>Shiny Pokemon Search Page</h1>
      <CardContainer pokemonData={data} />
    </div>
  );
}

export default App;
