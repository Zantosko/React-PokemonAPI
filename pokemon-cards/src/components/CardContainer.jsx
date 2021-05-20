import React, { Component } from 'react';
import Card from "./Card"
import "./cardContainer.css"

class CardContainer extends Component {
  //* Setting state
  state = {
    searchCriteria: "",
    pokemonList: [],
    pokemonStat: "",
    pokedexNum: "",
    pokemonBerries: []
  }

  //* Allows us to add props to the state of the CardContainer component. This allows us to make updates.
  componentDidMount() {
  //? May use this for reference later
  //   const berryUrl = "https://pokeapi.co/api/v2/berry/"
  //   const fetchData = await fetch(berryUrl,{ headers: {
  //   'Content-Type': 'application/json'
    
  // },})
  //   const json = await fetchData.json()
  //   this.setState({
  //     pokemonBerries:json.results
  //   })
    
    //! Easy Mode
    //* Sets state of pokemonList to to the data that was passed down from the App component.
    // this.setState({
    //   pokemonList: this.props.pokemonData[0].pokemon
    // })

    //! Hard Mode
    const pokemonArray = []
    const pokemonURL = `https://pokeapi.co/api/v2/pokemon?limit=151`
    fetch(pokemonURL)
      .then(res => res.json())
      .then((allpokemon) => {
        allpokemon.results.forEach(pokemon => fetchPokemonData(pokemon))
      })
    
      function fetchPokemonData(pokemon) {
        let url = pokemon.url
        fetch(url)
          .then(res => res.json())
          .then(pokeData => pokemonArray.push(pokeData))
      }

    this.setState({
      pokemonList: pokemonArray
    })
  }

  //* This method grabs the input value from the search bar and sets the state of searchCriteria to the value that was grabbed.
  searchCriteria = (e) => {
    const search = e.target.value.toLowerCase()
    
    this.setState({
      searchCriteria: search
    })
  }
  //* This method is used for handling multiple user inputs. It sets the state of the changed input to the value of that same input. This makes it a "controlled" input.
  sendPokemonToData = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    e.preventDefault();
  }


  //* This method handles form submission.
  onSubmit = async (e) => {
    e.preventDefault();

    const pokemonID = this.state.pokedexNum
    const pokemonFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    const specificPokemon = await pokemonFetch.json()

    //* Setting all the submitted input values as the key values in a newPokemon object.
    const newPokemon = {
      name: specificPokemon.name,
      stats: this.state.pokemonStat,
      types: specificPokemon.types,
      hp: specificPokemon.stats[0].base_stat,
      element: specificPokemon.types[0].type.name,
      sprites: {
        front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonID}.png`,
        back_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokemonID}.png`
      }
    }

    //* Creates a new array and assigns it to newPokemonList. Prepends the newPokemon object to the new array. Then "spreads" the old array that was passed down into the new array.
    const newPokemonList = [newPokemon, ...this.state.pokemonList]

    //* Sets state of pokemonList to the newly created array.
    this.setState({
      pokemonList: newPokemonList
    })
  }


  render() {
      
    const {searchCriteria, pokemonList} = this.state
    
    const filteredData = pokemonList.filter(pokemon => pokemon.name.includes(searchCriteria)) ? pokemonList.filter(pokemon => pokemon.name.includes(searchCriteria)) : pokemonList

    return (
      <div className="main-card-container">
        <div>
        <input className="search-field" onChange={(e)=>this.searchCriteria(e)} type="text" placeholder="Search for a pokemon"/>

        </div>

        <form onSubmit={(e) => this.onSubmit(e)}>
          {/* <input 
            name="pokemonName"
            className="create-field"
            type="text" 
            placeholder="Enter a Name"
            value={this.state.pokemonName}
            onChange={(e) => this.sendPokemonToData(e)}
          />
          <input 
            name="pokemonHP"
            className="create-field" 
            type="number" 
            placeholder="Enter a HP"
            value={this.state.pokemonHP}
            onChange={(e) => this.sendPokemonToData(e)}
          /> */}
          <input
            name="pokedexNum"
            className="create-field" 
            type="text" 
            placeholder="Enter Pokedex Number"
            value={this.state.pokedexNum}
            onChange={(e) => this.sendPokemonToData(e)}
          />
          <br/>
          <input className="create-field" type="submit" value="submit"/>
        </form>
        <div className="card-container">
          {filteredData.map((singlePokemon) => <Card key={singlePokemon.name}  pokemon={singlePokemon}  />
          )}
        </div>
        
      </div>
    );
  }
}


export default CardContainer;