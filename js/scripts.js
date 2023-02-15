/* List with pokemon API, pokemonRepository
*/
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    modalIIFE.showModal(pokemon);
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

/*modal repository IIFE*/
let modalIIFE = (function () {
  function showModal (pokemon) {
    let modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.add('is-visible');
    modalContainer.innerHTML = `
    <div class="modal">
      <div class="modal-dialog modal-custom" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title">Name: ${pokemon.name}</h1>
           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
           </button>
      </div>
      <div class="modal-body">
          <img src="${pokemon.imageUrl}" alt="${pokemon.name}" class="pokemon-image">
          <p>Height: ${pokemon.height}</p>
          <p>Types: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
      </div>
      </div>
    </div>
    `;
    let closeButton =modalContainer.querySelector('.close');
    closeButton.addEventListener('click', hideModal);
    }

    function hideModal (){
      let modalContainer = document.querySelector('.modal-container');
      modalContainer.classList.remove('is-visible');
    }

    return {
      showModal: showModal,
      hideModal: hideModal
    }

})();

pokemonRepository.loadList()