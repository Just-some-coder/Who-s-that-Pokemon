import {useState, useEffect, Fragment} from 'react'

import './App.css'

const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

function WinStatus({win}){
    if(win===1){
        return (
            <div className={"valid"}>
                <h1>Correct</h1>
            </div>

        );
    }else if(win===-1){
        return (
            <div className={"invalid"}>
                <h1>Incorrect</h1>
            </div>
        );
    }else{
        return(<div className={"justis"}><h1>test</h1></div>);
    }
}

function Card({pokemonID, choices, handleOptionSelect, win, score}) {
    const [pokeData, setPokeData] = useState({
        name: "",
        types: [{type: {name: ""}}],
        id: "",
        sprites: {
            front_default: "",
            other: {
                dream_world: {
                    front_default: ""
                },
                "official-artwork": {
                    front_default: ""
                }
            },
            back_default: "",
            back_shiny: "",
            front_shiny: ""
        },
        height: "",
        weight: ""
    })

    const [colorEffect, setColorEffect] = useState({
        border: `solid 3px ${colours[pokeData.types[0].type.name]}`,
        boxShadow: `10px 7px 10px ${colours[pokeData.types[0].type.name]}`
    });

    const api = "https://pokeapi.co/api/v2/pokemon/";

    const [Api, setApi] = useState(api + 1);

    useEffect(() => {
        setApi(api + pokemonID);
        setColorEffect({
            border: `solid 3px ${colours[pokeData.types[0].type.name]}`,
            boxShadow: `0px 5px 10px ${colours[pokeData.types[0].type.name]}`
        })
    }, [pokemonID, pokeData.types]);

    const [cardFlip, setCardFlip] = useState(false);

    const handleCardFlip = () => {
        setCardFlip(!cardFlip);
    }


    useEffect(() => {
        fetch(Api)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setPokeData(data);
            })
    }, [Api])


    if (cardFlip) {
        return (
            <div className={'pokemon-card-reverse'} style={colorEffect} onClick={() => {
                handleCardFlip()
            }}>

            </div>
        );
    } else {
        return (
            <Fragment>
                <div className={`pokemon-card`} style={colorEffect} onClick={() => {
                    handleCardFlip()
                }}>
                    <div className={"image-bg"}>
                        <img src={pokeData.sprites.other["official-artwork"].front_default} alt="Pokemon Image"
                             className={"pokemon-image"+(!win?" pokemon-hidden":"")}/>
                    </div>
                </div>

                <WinStatus win={win}/>

                <div className={"score"}>
                    <h2>Score: {score}</h2>
                </div>
                <div className={"options"}>
                    <button className={"option1"} style={colorEffect} onClick={()=>(handleOptionSelect(0))}>{choices[0]} </button>
                    <button className={"option2"} style={colorEffect} onClick={()=>(handleOptionSelect(1))}>{choices[1]}</button>
                    <button className={"option3"} style={colorEffect} onClick={()=>(handleOptionSelect(2))}>{choices[2]}</button>
                    <button className={"option4"} style={colorEffect} onClick={()=>(handleOptionSelect(3))}>{choices[3]}</button>
                </div>
            </Fragment>

        );
    }
}


function App() {
    const selectFourNumbers = () => {
        let numbers = [];
        while (numbers.length < 4) {
            let randomNum = Math.floor(Math.random() * 151) + 1;
            if (!numbers.includes(randomNum)) {
                numbers.push(randomNum);
            }
        }
        return numbers;
    }

    const pokemonList = [
        "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie",
        "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate",
        "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina",
        "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff",
        "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett",
        "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag",
        "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell",
        "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro",
        "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder",
        "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb",
        "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing",
        "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu",
        "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados",
        "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto",
        "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo",
        "Mew"
    ];

    const giveNames = ()=> {
        const temp = [];
        for (let i = 0; i < 4; i++) {
            temp.push(pokemonList[options[i]-1]);
        }
        return temp;
    }

    const selectNumberBetween0And3 = () => Math.floor(Math.random() * 4);

    const [rightOption, setRightOption] = useState(selectNumberBetween0And3);

    const [options, setOptions] = useState(selectFourNumbers);

    const [win, setWin] = useState(0);

    const [pokemonNames, setPokemonNames] = useState(giveNames);

    const [score, setScore] = useState(0);

    const handleOptionSelect = (num) =>{
        // Timer logic
        setTimeout(() => {
            if (num === rightOption) {
                setWin(1);
                setScore(score+1);
            } else {
                setWin(-1);
            }
        }, 0);

        setTimeout(() => {
            setOptions(selectFourNumbers());
            setRightOption(selectNumberBetween0And3());
            setWin(0);

        }, 2000);



    }

    useEffect(()=>{
        setTimeout(()=>{
            setPokemonNames(giveNames);
        },0);
    },[rightOption,giveNames])

    console.log(pokemonNames);

    return(
        <Card pokemonID={options[rightOption]} choices={pokemonNames} handleOptionSelect={handleOptionSelect} win={win} score={score}/>
    );
}
export default App
