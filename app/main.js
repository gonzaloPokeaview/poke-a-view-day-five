const css = (element, style) => {
  for (const property in style)
      element.style[property] = style[property];
}

const capitalizeFirstLetter = (name) => { // format tha name everytime we full the data from the api
  return name.charAt(0).toUpperCase() + name.slice(1);
}
const lowerFirstLetter = (name) => {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

const removeFromArray = (arr, target) => {
  const i = arr.indexOf(target);
  if(i !== -1){
    arr.splice(i, 1);
  }
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


let favoriteArray = []
const favoriteArrayJson = JSON.stringify(favoriteArray);
let favoriteAmount = 0;


window.addEventListener('beforeunload', (e) => {
  localStorage.setItem('favoriteArray', JSON.stringify(favoriteArray));
  console.log(favoriteArray);
});

window.addEventListener('load', (e) => {
  console.log(favoriteArray)
  const storedData = localStorage.getItem('favoriteArray');
  if (storedData) {
    favoriteArray = JSON.parse(storedData);

    //this is where I got stuck I was so close
    // favoriteArray.forEach((el)=>{
    //   const newName = lowerFirstLetter(el);
    //   const button = document.querySelector(`#${newName}favoriteButton`)
    //   button.value = `Remove from favorites`;
    //       css (favoriteButton, {
    //         'color': 'Black',
    //         'background-color': 'white'
            
    //       })
    // });
  }
});
const favoritePoke = document.createElement('input');
favoritePoke.value = `Favorite Pokémon ${favoriteAmount}`

favoritePoke.type = 'submit';

header.append(logo, siteInfo, favoritePoke);
body.append(header, main);

//This is the function that gets all of the Pokémon That will be invoked at the end of the file. 
const getAllPokemon = async () => {// This is an asynconus function. 
  try {
    const allResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');//
    const allData = await allResponse.json();
    
    //This will fetch the data from the indivdual pokémon and create the div that houses the main feature and modal for when the user clicks more Info.
    const fetchPokeData = async (item , i) => {
      //will format the index number to the pokénumber.
      const formattedNumber = i < 10 ? `000${i+1}` : i < 100 ? `00${i+1}` : i < 1000 ? `0${i+1}` : `${i+1}`;
      //This fetch will get the data from the api based on the data passed through when the user clicks on a spesific button.
      const pokeDataResponse = await fetch(item);
      const pokeData = await pokeDataResponse.json();
      
      const pokeBox = document.createElement('div');
      pokeBox.className = `eachPokeBox`
      
      const name = document.createElement('h3'); //pokemon name
      const sprite = document.createElement('img');// image 
      /**
       * the more info button will be an input:type=submit:
       * the text that will show up on the button
       * the input type:
       * a custom id
       */
      const moreInfoButton = document.createElement('input');
      moreInfoButton.value = `More info`;
      moreInfoButton.type = 'submit';
      moreInfoButton.id= `${pokeData.name}moreInfoButton`;
      /**
       * the add to favorite button will be an input:type=submit:
       * the text that will show up on the button
       * the input type:
       * a custom id
       */
      const favoriteButton = document.createElement('input');
      favoriteButton.value = `Add to favorites`;
      favoriteButton.type = 'submit';
      favoriteButton.className = 'heart';
      favoriteButton.id= `${pokeData.name}favoriteButton`;
      
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
      
      
      pokeBox.append(name, sprite, moreInfoButton, favoriteButton );
      gameInfo.id = `${pokeData.name}GameInfo`;
      gameInfo.className = `gameInfo`;
      card.className = `pokemonCard`;
      card.textContent = `${fixedName} is a pokemon that can be found in the following version(s) of the Pokemon games:`;
      card.style.display = 'none'; 
      card.append(gameInfo);
      main.append(card);
      
      moreInfoButton.addEventListener('click', e => {
        e.preventDefault();
        if(e.target.id === `${pokeData.name}moreInfoButton`){
         
          if (card.style.display === 'none') {

            card.style.display = 'block';
            const modalBg = document.createElement('div');
            modalBg.className = 'modal-bg';
            modalBg.style.display = 'flex';
            modalBg.appendChild(card);
  
            document.body.appendChild(modalBg);
            css (card, {
              'color': 'blue',
              'background-color': '#F0F8FF',
              'padding': '1em',
              'margin': '1em',
              'max-width': '50vw',
              'border-radius': '1em'
            })          

            moreInfoButton.value = `Close`;
          
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

            card.append(moreInfoButton,favoriteButton, name, sprite);
          
          } else {

            card.style.display = 'none';
            moreInfoButton.value = `More info`;
            pokeBox.append(name, sprite, moreInfoButton, favoriteButton );
            const modalBg = document.querySelector('.modal-bg');
            modalBg.style.display = 'none';
            modalBg.parentNode.removeChild(modalBg);

          };

        };
      });

      favoriteButton.addEventListener('click', e => {
        e.preventDefault();
        console.log(`favoriteAmount:${favoriteAmount}, favoriteArray.length: ${favoriteArray.length}, favoriteArray: ${favoriteArray}`);
        if (!favoriteArray.includes(fixedName)){
          favoriteArray.push(fixedName);
          favoritePoke.value = `Favorite Pokémon ${favoriteAmount}`;
          const update = JSON.stringify(favoriteArray);
          localStorage.setItem('favoriteArray', update);
          favoriteButton.value = `Remove from favorites`;
          css (favoriteButton, {
            'color': 'Black',
            'background-color': 'white'
            
          })
          favoriteAmount++;
        } else {
          removeFromArray(favoriteArray, fixedName);
          const update = JSON.stringify(favoriteArray);
          localStorage.setItem('favoriteArray', update);
          favoriteButton.value = `Add to favorites`;
          favoriteAmount--;
          css (favoriteButton, {
            'color': 'white',
            'background-color': '#1A1A1A'
          })
        }
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