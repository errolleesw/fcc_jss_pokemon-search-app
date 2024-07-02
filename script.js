const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const nameElem = document.getElementById("pokemon-name");
const idElem = document.getElementById("pokemon-id");
const hpElem = document.getElementById("hp");
const attackElem = document.getElementById("attack");
const defenseElem = document.getElementById("defense");
const specialAttackElem = document.getElementById("special-attack");
const specialDefenseElem = document.getElementById("special-defense");
const speedElem = document.getElementById("speed");
const weightElem = document.getElementById("weight");
const heightElem = document.getElementById("height");
const typesElem = document.getElementById("types");
const allPokemon = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const checkInput = () => {
    const inputValue = searchInput.value.trim();
    if (inputValue === "") {
        alert("Please enter a Pokemon Name or Pokemon ID");
        return;
    }
    fetchData(inputValue);
}

const fetchData = async (query) => {
    try {
        let url = `${allPokemon}/${query.toLowerCase()}`;
        const res = await fetch(url);
        if (!res.ok) {
            alert('Pokémon not found');
            return;
        }
        const data = await res.json();
        console.log(data);
        console.log(attackElem.value);
        showPokemonDetails(data);
    } catch (err) {
        console.log(err);
    }
}

const showPokemonDetails = (pokemon) => {
    const { id, name, height, weight, stats, sprites, types } = pokemon;
    const hpStat = stats.find(stat => stat.stat.name === 'hp');
    const attackStat = stats.find(stat => stat.stat.name === 'attack');
    const defenseStat = stats.find(stat => stat.stat.name === 'defense');
    const specialAttackStat = stats.find(stat => stat.stat.name === 'special-attack');
    const specialDefenseStat = stats.find(stat => stat.stat.name === 'special-defense');
    const speedStat = stats.find(stat => stat.stat.name === 'speed');

    idElem.textContent = `ID: #${id}`;
    nameElem.textContent = `Name: ${name.toUpperCase()}`; // Convert name to uppercase
    heightElem.textContent = `Height: ${height}`;
    weightElem.textContent = `Weight: ${weight}`;
    hpElem.textContent = `${hpStat.base_stat}`;
    attackElem.textContent = `${attackStat.base_stat}`;
    defenseElem.textContent = `${defenseStat.base_stat}`;
    specialAttackElem.textContent = `${specialAttackStat.base_stat}`;
    specialDefenseElem.textContent = `${specialDefenseStat.base_stat}`;
    speedElem.textContent = `${speedStat.base_stat}`;

    // Clear previous types
    typesElem.innerHTML = '';

    // Add Pokémon types
    types.forEach(typeInfo => {
        const type = typeInfo.type.name;
        const typeElement = document.createElement('p');
        typeElement.textContent = `${type.toUpperCase()}`;
        typesElem.appendChild(typeElement);
    });
}

searchBtn.addEventListener("click", checkInput);