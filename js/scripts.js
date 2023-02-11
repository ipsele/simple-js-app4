/* List with pokemon values, new pokemonRepository
*/
let pokemonRepository = (function () {

let pokemonList = [
    {name: 'Charmander', 
    height: 4, 
    type: 'fire'},
    {name: 'Nidorina', 
    height: 3, 
    type: 'poison'},
    {name: 'Dewgong', 
    height: 7, 
    type:['water','ice']},
    {name: 'Minun', 
    height: 2, 
    type: 'electric'},
    {name: 'Jigglypuff', 
    height: 2, 
    type:['fairy','normal']}
];

/* Functions, implementation of addListItem () in IIFE
*/

function getAll(){
  return pokemonList;
}

function add (pokemon) {
    pokemonList.push(pokemon) 
}

function addListItem(pokemon) {
  let pokemonList = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classicList.add('pokemon-button');
  listItem.appendChild(button);
  pokemonList.appendChild(listItem);
  button.addEventListener('click', function() {
    showDetails(pokemon);
  });
}

function showDetails(pokemon) {
  console.log(pokemon);
}

return {
  getAll: getAll,
  add: add,
  addListItem:addListItem
};

})();

/*updated forEach loop*/

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

