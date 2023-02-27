/* pokemonRepository IIFE - API
*/
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';

/* Functions, implementation of addListItem () in IIFE
*/

function add (pokemon) {
    pokemonList.push(pokemon) 
}

function getAll(){
  return pokemonList;
}

function addListItem(pokemon) {
  let pokemonListFolder = document.querySelector('.pokemon-list');
  let createListItem = document.createElement('li');
  let button = document.createElement('button');
  
  button.innerText = pokemon.name;
  createListItem.classList.add('group-list-item');
  pokemonListFolder.appendChild(createListItem);
  createListItem.appendChild(button);
  button.classList.add('btn', 'btn-primary', 'pokemon-button');
  
  button.addEventListener('click', function () {
    showDetails(pokemon);
  });
}

function showDetails(pokemon) {
  loadDetails(pokemon).then(function(){
    modalRepository.showModal(pokemon);
  });
}


function loadList() {
  return fetch(apiUrl)
  .then(function (response) {
      return response.json();
  })
  .then(function (json) {
      json.results.forEach(function (item) {
          let pokemon= {
              name: item.name,
              detailsUrl: item.url
          };
          add(pokemon);
      });
    })
  .catch(function (e) {
      console.error(e)
  });
}

function loadDetails(pokemon) {
  let url= pokemon.detailsUrl;
  return fetch(url)
    .then(function (response) {
      return response.json();
  })
  .then(function(details) {
      //add the details to the item
      pokemon.imageUrl= details.sprites.front_default;
      pokemon.height= details.height;
      pokemon.types= details.types;
  })
  .catch(function (e) {
      console.error(e);
  })
}

function searchPokemon(query) {
  let filteredList = pokemonList.filter(function(pokemon) {
    return pokemon.name.toLowerCase().indexOf(query.toLowerCase())> -1;
  });
  return filteredList;
}

return {
  getAll: getAll,
  add: add,
  addListItem:addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  searchPokemon: searchPokemon
};

})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

/*modal */
(function() {

  let modalContainer = document.querySelector('#modal-container');
  let pokemonList;

  function fetchPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        pokemonList = data.results.map((pokemon, index) => ({
          name: pokemon.name,
          imageUrl: `https://pokeapi.co/api/v2/pokemon?limit=151`,
          height: null,
          types: []
        }));
      })
      .catch(error => console.error(error));
  }

  function showModal(title, imageUrl, height, types) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', imageUrl);

    let heightElement = document.createElement('p');
    heightElement.innerText = height ? `Height: ${height / 10} m` : '';

    let typesElement = document.createElement('p');
    typesElement.innerText = types.length ? `Type(s): ${types.join(', ')}` : '';

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(typesElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  fetchPokemon();

  document.querySelector('#show-modal').addEventListener('click', () => {
    if (!pokemonList) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    const randomPokemon = pokemonList[randomIndex];

    fetch(randomPokemon.url)
      .then(response => response.json())
      .then(data => {
        randomPokemon.height = data.height;
        randomPokemon.types = data.types.map(type => type.type.name);
        showModal(randomPokemon.name, randomPokemon.imageUrl, randomPokemon.height, randomPokemon.types);
      })
      .catch(error => console.error(error));
  });

})();