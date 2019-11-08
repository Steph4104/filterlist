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
            
  const poulet = Boolean(params.poulet);
  const diana = Boolean(params.diana);
  const dejeuner = Boolean(params.dejeuner);
  const bbq = Boolean(params.bbq);
  const steak = Boolean(params.steak);
  const oeuf = Boolean(params.oeuf);

  const { sort } = params.sort;
  const desc = sort && sort[0] === '-';
  const sortParam = sort && (desc ? sort.substring(1, sort.length) : sort);

  const sortedImages = sort ?
    images.sort((image1, image2) => {

      return desc ? 1 : -1;
    }) :
    images;

  const filteredImages = sortedImages.filter((image) => {
    if (!poulet && !diana && !dejeuner && !bbq && !steak && !oeuf) {
      return true
    }

    var tags_select = image.tags.split(',');
    for (var i=0; i < tags_select.length; i++){
      if(poulet && tags_select[i]=== 'poulet'){
        return true
      }
      if(diana && tags_select[i]=== 'diana'){
        return true
      }
      if(dejeuner && tags_select[i]=== 'dejeuner'){
        return true
      }
      if(bbq && tags_select[i]=== 'bbq'){
        return true
      }
      if(steak && tags_select[i]=== 'steak'){
        return true
      }
      if(oeuf && tags_select[i]=== 'oeuf'){
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
