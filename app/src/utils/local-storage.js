const PALETTE = 'palettes';

const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getPalettes = () => getLocalStorageKey(PALETTE) || [];

export const setPalettes = (palette) => {
  setLocalStorageKey(PALETTE, palette);
}

export const initPalettesIfEmpty = () => {
  if (!getPalettes().length) setLocalStorageKey(PALETTE, paletteData);
}

export const removePalette = (uuid) => {
  const newPalettes = getPalettes().filter(palette => palette.uuid !== uuid);
  setPalettes(newPalettes);
}

export const addPalette = ({ uuid, title, colors, temperature }) => {
  const newPalette =  {
    uuid,
    title,
    colors,
    temperature,
  };
  setPalettes([newPalette, ...getPalettes() ]);
}