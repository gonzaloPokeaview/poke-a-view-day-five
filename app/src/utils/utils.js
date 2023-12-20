export const getElement = (el) => document.querySelector(el);

export const fetchData = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const css = (element, style) => {
  for (const property in style)
      element.style[property] = style[property];
}

export const capitalizeFirstLetter = (name) => { // format tha name everytime we full the data from the api
  return name.charAt(0).toUpperCase() + name.slice(1);
}
const lowerFirstLetter = (name) => {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

export const removeFromArray = (arr, target) => {
  const i = arr.indexOf(target);
  if(i !== -1){
    arr.splice(i, 1);
  }
}