//import Images from './images';
import axios from 'axios';

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export async function loadImages(params) {
  const page = params.page || 1;
  const perPage = 9;
  const images =
            await axios.get('http://restapireact.sclmedia.ca/api/contacts.php')
             .then(function(response){  
                     return response.data
              })
            
              .catch(function(error){
                     console.log(error);
                 });
            
  const dejeuner = Boolean(params.dejeuner);
  const diner = Boolean(params.diner);
  const souper = Boolean(params.souper);
  const entree = Boolean(params.entree);
  const dessert = Boolean(params.dessert);
  const side = Boolean(params.side);
  

  const { sort } = params.sort;
  const desc = sort && sort[0] === '-';
  const sortParam = sort && (desc ? sort.substring(1, sort.length) : sort);

  const sortedImages = sort ?
    images.sort((image1, image2) => {

      return desc ? 1 : -1;
    }) :
    images;

  const filteredImages = sortedImages.filter((image) => {
    if (!diner && !souper && !dejeuner && !entree && !dessert && !side ) {
      return true
    }

    var tags_select = image.tags.split(',');
    for (var i=0; i < tags_select.length; i++){
      if(souper && tags_select[i]=== 'souper'){
        return true
      }
      if(diner && tags_select[i]=== 'diner'){
        return true
      }
      if(dejeuner && tags_select[i]=== 'dejeuner'){
        return true
      }
      if(entree && tags_select[i]=== 'entree'){
        return true
      }
      if(dessert && tags_select[i]=== 'dessert'){
        return true
      }
      if(side && tags_select[i]=== 'side'){
        return true
      }
  }

  return false
  });

  const offset = (page - 1) * perPage;

  return {
    images: filteredImages.slice(offset, offset + perPage),
    count: filteredImages.length,
  };
}
