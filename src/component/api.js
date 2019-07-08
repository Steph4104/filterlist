import carsGenerator from './carsGenerator';

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

const cars = carsGenerator();

export async function loadCars(params) {
  const page = params.page || 1;
  const perPage = 9;

  // const brand = (params.brand || '').toLowerCase();
  // const owner = (params.owner || '').toLowerCase();

  const sidewalk = Boolean(params.sidewalk);
  const pool = Boolean(params.pool);
  const back = Boolean(params.back);

  const { sort } = params.sort;
  const desc = sort && sort[0] === '-';
  const sortParam = sort && (desc ? sort.substring(1, sort.length) : sort);

  const sortedCars = sort ?
    cars.sort((car1, car2) => {

      return desc ? 1 : -1;
    }) :
    cars;

  const filteredCars = sortedCars.filter((car) => {
    if (!sidewalk && !pool && !back) {
      return true
    }
    // if (brand && !car.brand.toLowerCase().includes(brand)) {
    //   return false;
    // }

    // if (owner && !car.owner.toLowerCase().includes(owner)) {
    //   return false;
    // }

    var info_select = car.info.split(',');
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
 
  }

  return false
  });

  const offset = (page - 1) * perPage;

  return {
    cars: filteredCars.slice(offset, offset + perPage),
    count: filteredCars.length,
  };
}
