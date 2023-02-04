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

/*for loop with integrated condition regarding hight, message, paragraphs for display
*/

for (let i = 0; i < pokemonList.length; i++) {        
    if (pokemonList[i].height >= 5) {
      document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + 'm) - Wow, that\'s a big pokemon! \;' + '<br>');
    } else if (pokemonList[i].height < 5) {
      document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + 'm)  \;' + '<br>')
    } 
  }
  

 

