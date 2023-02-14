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
  document.querySelector('.pokemon-list')
  createListItem.appendChild(button);
  pokemonListFolder.appendChild(createListItem);

  button.addEventListener('click', function(){
    showDetails(pokemon);
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
  }).then(function(details) {
      //add the details to the item
      pokemon.imageUrl= details.sprites.front_default;
      pokemon.height= details.height;
      pokemon.types= details.types;
  })
  .catch(function (e) {
      console.error(e);
  })
}

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
}

return {
  getAll: getAll,
  add: add,
  addListItem:addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
};

})();

/*updated forEach loop*/

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});

