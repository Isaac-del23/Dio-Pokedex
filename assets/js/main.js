const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonModal = new bootstrap.Modal(document.getElementById('pokemonModal'));

const maxRecords = 151;
const limit = 8;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-bs-toggle="modal" data-bs-target="#pokemonModal" data-bs-name="${pokemon.name}" data-bs-number="${pokemon.number}" data-bs-types="${pokemon.types.join(',')}" data-bs-photo="${pokemon.photo}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

// Event listener para tratar a abertura do modal
pokemonList.addEventListener('click', (event) => {
    const targetPokemon = event.target.closest('.pokemon');
    if (targetPokemon) {
        const name = targetPokemon.getAttribute('data-bs-name');
        const number = targetPokemon.getAttribute('data-bs-number');
        const types = targetPokemon.getAttribute('data-bs-types').split(',');
        const photo = targetPokemon.getAttribute('data-bs-photo');

        // Atualizar os elementos no modal
        document.getElementById('pokemonModalLabel').textContent = name;
        document.getElementById('pokemonModalNumber').textContent = `#${number}`;
        document.getElementById('pokemonModalTypes').innerHTML = types.map((type) => `<li class="type ${type}">${type}</li>`).join('');
        document.getElementById('pokemonModalImage').src = photo;

        // Exibir o modal
        pokemonModal.show();
    }
});





