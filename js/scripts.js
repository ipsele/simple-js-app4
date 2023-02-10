/* List with pokemon values
*/

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

/*forEach loop with document.write and paragraphs*/

pokemonList.forEach(function(pokemon) {
  console.log(pokemon.name + ' - ' + pokemon.height);
});

function myLoopFunction(pokemon) {
  document.write(pokemon.name + ' - ' + pokemon.height + ' <br>');
}

pokemonList.forEach(myLoopFunction);

/*Object.keys for pokemonList console*/

Object.keys(pokemonList).forEach(function(property) {
  console.log(pokemonList[property]);
});

/*function getPokemonDescription with document.write and paragraphs
*/

function getHeightDescription(height) {
  return height + ' m ';
}

function getTypeDescription(type) {
  if (Array.isArray(type)) {
    return type.join(', ');
  }
  return type;
}

function getPokemonDescription(pokemon) {
  let heightDescription = getHeightDescription(pokemon.height);
  let typeDescription = getTypeDescription(pokemon.type);

  return pokemon.name + '; ' + heightDescription + '; ' + typeDescription;
}

pokemonList.forEach(function(pokemon) {
  document.write(getPokemonDescription(pokemon) + '<br>'); 
});



 

