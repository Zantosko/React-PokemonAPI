import React, { Component } from 'react';
import "./cardContainer.css"

class Card extends Component {
	state = {
		flip: false
	}
	render() {
		const {  name, sprites, stats, hp, types, element } = this.props.pokemon
    const newStats = [...stats]
    const mappedStats = newStats.map((stat,idx) => <span key={idx}>{stat.base_stat}</span>)

    //* Changes card color based on type
    const poke_types = types.map(type => type.type.name);
    const type = mainTypes.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type] ? colors[type] : colors[element];

    const { flip } = this.state
		const uppercased = name.toUpperCase()
		return (
			<div className="pokemon-card" style={{backgroundColor: `${color}`}}>
				<img onMouseLeave={()=> this.setState({flip: !flip})} onMouseOver={()=> this.setState({flip: !flip})} src={flip ? sprites.back_shiny : sprites.front_shiny } alt="" />
				<h2>{uppercased}</h2>
				<p>HP: {mappedStats[0] ? mappedStats[0] : hp}</p>
        <p>Type: {type ? type : element}</p>
			</div>
		);
	}
}

//* Color canvas
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};
const mainTypes = Object.keys(colors)


export default Card;