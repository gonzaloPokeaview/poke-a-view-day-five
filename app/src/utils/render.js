import { css, getElement } from "./utils.js";

export const LOAD_MAIN = () => {
  getElement('#app').innerHTML = `
  <header><img src="../public/logo.png" class="logoImage"><article id="siteInfo"><h2>Come and find out which of the Nintendo Pokémon games your favorite Pokémon was featured in!</h2></article></header>
  `
}