document.addEventListener("DOMContentLoaded", function() {
    const pokedexDiv = document.getElementById('pokedex');
    let offset = 0; // Offset for fetching next batch of Pokemon
    let fetchedPokemonNames = []; // Array to store fetched Pokémon names

    // Function to fetch Pokémon data from PokéAPI
    function fetchPokemonData() {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=500&offset=${offset}`)
            .then(response => response.json())
            .then(data => {
                // Once data is fetched,  it is handeled here
                data.results.forEach(pokemon => {
                    if (!fetchedPokemonNames.includes(pokemon.name)) {
                        fetchPokemonDetails(pokemon.url);
                        fetchedPokemonNames.push(pokemon.name);
                    }
                });
                offset += 20; // Increment offset for next batch
            })
            .catch(error => {
                console.error('Error fetching Pokemon data:', error);
            });
    }

    // Function to fetch details of a specific Pokemon
    function fetchPokemonDetails(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Once data is fetched,the Pokemon is displayed
                displayPokemon(data);
            })
            .catch(error => {
                console.error('Error fetching Pokemon details:', error);
            });
    }

    // Function to display Pokémon data
    function displayPokemon(data) {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon');
        
        // Event listener to display details on click
        pokemonDiv.addEventListener('click', function() {
            window.location.href = `pokemon-details.html?id=${data.id}`; // Pass ID instead of name
        });

        const pokemonName = document.createElement('h2');
        pokemonName.textContent = data.name;

        const pokemonImage = document.createElement('img');
        pokemonImage.src = data.sprites.front_default;
        pokemonImage.alt = data.name;

        // Append elements to Pokémon card
        pokemonDiv.appendChild(pokemonName);
        pokemonDiv.appendChild(pokemonImage);

        // Append Pokémon card to Pokédex container
        pokedexDiv.appendChild(pokemonDiv);
    }

    // Function to handle search button click
    document.getElementById('searchButton').addEventListener('click', search);

    function search() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const pokemonElements = document.querySelectorAll('.pokemon');

        pokemonElements.forEach(pokemon => {
            const pokemonName = pokemon.querySelector('h2').textContent.toLowerCase();
            if (pokemonName.includes(searchTerm)) {
                pokemon.style.display = 'flex'; 
            } else {
                pokemon.style.display = 'none'; 
            }
        });
    }

    // Fetching initial batch of Pokémon
    fetchPokemonData();

    // Loading more Pokémon as we scrolls down
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            fetchPokemonData();
        }
    });

});
