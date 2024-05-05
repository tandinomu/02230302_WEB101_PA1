document.addEventListener("DOMContentLoaded", function() {
    const pokemonDetailsDiv = document.getElementById('pokemon-details');

    // Fetching the Pokémon ID from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');

    // Fetching Pokémon details based on the ID
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(data => {
            // Once data is fetched, the details are displayed
            displayPokemonDetails(data);
        })
        .catch(error => {
            console.error('Error fetching Pokémon details:', error);
        });

    // Function to display Pokémon details
    function displayPokemonDetails(data) {
        const pokemonImage = document.createElement('img');
        pokemonImage.src = data.sprites.front_default;
        pokemonImage.alt = data.name;
        pokemonDetailsDiv.appendChild(pokemonImage);

        const pokemonName = document.createElement('h2');
        pokemonName.textContent = data.name;
        pokemonDetailsDiv.appendChild(pokemonName);

        const types = document.createElement('p');
        types.textContent = 'Types: ';
        data.types.forEach(type => {
            types.textContent += `${type.type.name} `;
        });
        pokemonDetailsDiv.appendChild(types);

        const abilities = document.createElement('p');
        abilities.textContent = 'Abilities: ';
        data.abilities.forEach(ability => {
            abilities.textContent += `${ability.ability.name} `;
        });
        pokemonDetailsDiv.appendChild(abilities);

        const stats = document.createElement('ul');
        stats.textContent = 'Stats: ';
        data.stats.forEach(stat => {
            const statItem = document.createElement('li');
            statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            stats.appendChild(statItem);
        });
        pokemonDetailsDiv.appendChild(stats);
    }
});
