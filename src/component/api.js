import Images from './images';

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

const images = Images();

export async function loadImages(params) {
  const page = params.page || 1;
  const perPage = 9;

  // const brand = (params.brand || '').toLowerCase();
  // const owner = (params.owner || '').toLowerCase();

  const sidewalk = Boolean(params.sidewalk);
  const pool = Boolean(params.pool);
  const back = Boolean(params.back);
  const front = Boolean(params.front);
  const wall = Boolean(params.wall);
  const stair = Boolean(params.stair);
  const flower = Boolean(params.flower);
  const edging = Boolean(params.edging);
  const retainingwall = Boolean(params.retainingwall);
  const asphalt = Boolean(params.asphalt);
  const pave = Boolean(params.pave);
  

  const { sort } = params.sort;
  const desc = sort && sort[0] === '-';
  const sortParam = sort && (desc ? sort.substring(1, sort.length) : sort);

  const sortedImages = sort ?
    images.sort((image1, image2) => {

      return desc ? 1 : -1;
    }) :
    images;

  const filteredImages = sortedImages.filter((image) => {
    if (!sidewalk && !pool && !back && !front && !wall && !stair && !flower && !edging && !retainingwall && !asphalt && !pave) {
      return true
    }
    // if (brand && !car.brand.toLowerCase().includes(brand)) {
    //   return false;
    // }

    // if (owner && !car.owner.toLowerCase().includes(owner)) {
    //   return false;
    // }

    var info_select = image.info.split(',');
    for (var i=0; i < info_select.length; i++){
      if(sidewalk && info_select[i]=== 'sidewalk'){
        return true
      }
      if(pool && info_select[i]=== 'pool'){
        return true
      }
      if(back && info_select[i]=== 'back'){
        return true
      }
      if(front && info_select[i]=== 'front'){
        return true
      }
      if(wall && info_select[i]=== 'wall'){
        return true
      }
      if(stair && info_select[i]=== 'stair'){
        return true
      }
      if(flower && info_select[i]=== 'flower'){
        return true
      }
      if(edging && info_select[i]=== 'edging'){
        return true
      }
      if(pave && info_select[i]=== 'pave'){
        return true
      }
      if(retainingwall && info_select[i]=== 'retainingwall'){
        return true
      }
      if(asphalt && info_select[i]=== 'asphalt'){
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
