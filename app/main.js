const css = (element, style) => {
  for (const property in style)
      element.style[property] = style[property];
}
const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const body = document.body;
const header = document.createElement('header');
const main = document.createElement('section');
main.id = 'main';
const logo = document.createElement('img');
logo.src = `logo.png`
logo.className = 'logoImage'
const siteInfo = document.createElement('article');
siteInfo.id = `siteInfo`;
const siteInfoText = document.createElement('h2');
siteInfoText.textContent = 'Come and find out which of the Nintendo Pokémon games your favorite Pokémon was featured in!'
siteInfo.append(siteInfoText);
header.append(logo, siteInfo);
body.append(header, main);
const getAllPokemon = async () => {
  try {
    const allResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const allData = await allResponse.json();
    

    const fetchPokeData = async (item , i) => {

      const formattedNumber = i < 10 ? `000${i+1}` : i < 100 ? `00${i+1}` : i < 1000 ? `0${i+1}` : `${i+1}`;
      const pokeDataResponse = await fetch(item);
      const pokeData = await pokeDataResponse.json();
      const pokeBox = document.createElement('div');
      const name = document.createElement('h3');
      const sprite = document.createElement('img');
      const button = document.createElement('input');
      const card = document.createElement('div');
      const gameInfo = document.createElement('div');
      const fixedName = capitalizeFirstLetter(pokeData.name);
      name.textContent =`${fixedName} #${formattedNumber}`;

      if (!pokeData.sprites.other['official-artwork']['front_default']){
        sprite.src = `https://t4.ftcdn.net/jpg/00/89/55/15/240_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg`;
        sprite.alt = `Sorry no image available at this time of ${pokeData.name}`;
      } else {
        sprite.src = `${pokeData.sprites.other['official-artwork']['front_default']}`;
        sprite.alt = `picture of ${pokeData.name}`;
      }
      
      button.value = `More info`;
      button.type = 'submit'
      button.id= `${pokeData.name}Button`
      pokeBox.append(name, sprite, button );
      gameInfo.id = `${pokeData.name}GameInfo`;
      gameInfo.className = `gameInfo`;
      card.className = `pokemonCard`;
      card.textContent = `${fixedName} is a pokemon that can be found in the following version(s) of the Pokemon games:`;
      card.style.display = 'none'; 
      card.append(gameInfo);
      main.append(card);
      
      button.addEventListener('click', e => {
        e.preventDefault();
        if(e.target.id === `${pokeData.name}Button`){
         
          if (card.style.display === 'none') {

            card.style.display = 'block';
            const modalBg = document.createElement('div');
            modalBg.className = 'modal-bg';
            modalBg.style.display = 'flex';
            modalBg.appendChild(card);
    
    // Append the modal background to the body
            document.body.appendChild(modalBg);
            css (card, {
              'color': 'blue',
              'background-color': '#F0F8FF',
              'padding': '1em',
              'margin': '1em',
              'max-width': '50vw',
              'border-radius': '1em'
            })          

            button.value = `Close`;
          
            if (!e.target.checked){

              pokeData.game_indices.forEach(async (item) => {
                const game = document.createElement('p')
                game.className = `gameText`;
                const gameFixedText= capitalizeFirstLetter(item.version.name);
                game.textContent = `${gameFixedText}`;
                gameInfo.append(game);
              })

              e.target.checked = true;

            }

            card.append(button, name, sprite);
          
          } else {

            card.style.display = 'none';
            button.value = `More info`;
            pokeBox.append(name, sprite, button );
            const modalBg = document.querySelector('.modal-bg');
            modalBg.style.display = 'none';
            modalBg.parentNode.removeChild(modalBg);

          };

        };
      });
      main.appendChild(pokeBox);

      css (pokeBox, {
        'font-size': '0.85em',
        'color': 'blue',
        'background-color': 'coral',
        'padding': '10px',
        'margin': '1em',
        'width': '20%',
        'border-radius': '1em'
      })

      css(sprite,{
        'width':'75%',
        'max-width': '300px'
      })

    }

    allData.results.forEach(async (item, i) => {
      await fetchPokeData(item.url, i);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}




getAllPokemon();