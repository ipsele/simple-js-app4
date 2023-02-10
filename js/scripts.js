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

function getAll(){
  return pokemonList;
}

function add (pokemon) {
    pokemonList.push(pokemon) 
}

return {
  getAll: getAll,
  add: add
};

})();

/*forEach loop with document.write and paragraphs*/

pokemonRepository.getAll().forEach(function(pokemon) {
  console.log(pokemon.name + ' - Height: ' + pokemon.height + ' - Type: ' + pokemon.type.join(', '));
});

function myLoopFunction(pokemon) {
  document.write(pokemon.name + ' - Height: ' + pokemon.height + ' - Type: ' + pokemon.type.join(', ') + ' <br>');
}

pokemonRepository.getAll().forEach(myLoopFunction);

