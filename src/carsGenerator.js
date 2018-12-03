const brands = ['Acura','Alfa Romeo','Aston Martin','Audi','Bentley','BMW','Bugatti','Buick','Cadillac','Chevrolet','Chrysler','Citroen','Dodge','Ferrari','Fiat','Ford','Geely','General Motors','GMC','Honda','Hyundai','Infiniti','Jaguar','Jeep','Kia','Koenigsegg','Lamborghini','Land Rover','Lexus','Maserati','Mazda','McLaren','Mercedes-Benz','Mini2','Mitsubishi','Nissan','Pagani','Peugeot','Porsche','Ram','Renault','Rolls Royce','Saab','Subaru','Suzuki','Tata Motors','Tesla','Toyota','Volkswagen']
const names = ['Jack', 'Thomas', 'Joshua', 'William', 'Daniel', 'Matthew', 'James', 'Joseph', 'Harry', 'Samuel']
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'purple']

export default function carsGenerator(count) {
  const res = [
  {id:0, brand: 'Jaguar', owner:'Bob', color:'yellow', info:'front,back,sidewalk'},
  {id:1, brand: 'Jaguar', owner:'Bob', color:'blue', info:'back,pool'},
  {id:2, brand: 'Jaguar', owner:'Bob', color:'yellow', info:'sidewalk,back'},
  {id:3, brand: 'Jaguar', owner:'Bob', color:'blue', info:'pool,garden'},
  {id:4, brand: 'Jaguar', owner:'Bob', color:'red', info:'garden,front'},
  {id:5, brand: 'Jaguar', owner:'Bob', color:'yellow', info:'front,back,sidewalk'},
  {id:6, brand: 'Jaguar', owner:'Bob', color:'blue', info:'back,pool'},
  {id:7, brand: 'Jaguar', owner:'Bob', color:'yellow', info:'sidewalk,back'},
  {id:8, brand: 'Jaguar', owner:'Bob', color:'blue', info:'pool,garden'},
  {id:9, brand: 'Jaguar', owner:'Bob', color:'red', info:'garden,front'},
  {id:10, brand: 'Jaguar', owner:'Bob', color:'yellow', info:'front,back,sidewalk'},
  {id:11, brand: 'Jaguar', owner:'Bob', color:'blue', info:'back,pool'},
  {id:12, brand: 'Jaguar', owner:'Bob', color:'yellow', info:'sidewalk,back'},
  {id:13, brand: 'Jaguar', owner:'Bob', color:'blue', info:'pool,garden'},
  {id:14, brand: 'Jaguar', owner:'Bob', color:'red', info:'garden,front'},
  {id:15, brand: 'Jaguar', owner:'Bob', color:'yellow', info:'front,back,sidewalk'},
  {id:16, brand: 'Jaguar', owner:'Bob', color:'blue', info:'back,pool'},
  {id:17, brand: 'Jaguar', owner:'Bob', color:'yellow', info:'sidewalk,back'},
  {id:18, brand: 'Jaguar', owner:'Bob', color:'blue', info:'pool,garden'},
  {id:19, brand: 'Jaguar', owner:'Bob', color:'red', info:'garden,front'},
  {id:20, brand: 'Jaguar', owner:'Bob', color:'yellow', info:'front,back,sidewalk'},
  {id:21, brand: 'Jaguar', owner:'Bob', color:'blue', info:'back,pool'},
  {id:22, brand: 'Jaguar', owner:'Bob', color:'yellow', info:'sidewalk,back'},
  {id:23, brand: 'Jaguar', owner:'Bob', color:'blue', info:'pool,garden'},
  {id:24, brand: 'Jaguar', owner:'Bob', color:'red', info:'garden,front'},
  {id:25, brand: 'Jaguar', owner:'Bob', color:'yellow', info:'front,back,sidewalk'},
  {id:26, brand: 'Jaguar', owner:'Bob', color:'blue', info:'back,pool'},
  {id:27, brand: 'Jaguar', owner:'Bob', color:'yellow', info:'sidewalk,back'},
  {id:28, brand: 'Jaguar', owner:'Bob', color:'blue', info:'pool,garden'},
  {id:29, brand: 'Jaguar', owner:'Bob', color:'red', info:'garden,front'}
]
// const res =[]
//   for (let i = 0; i < count; ++i) {
//     res.push({
//       id: i + 1,
//       brand: brands[Math.floor(Math.random() * brands.length)],
//       owner: names[Math.floor(Math.random() * names.length)],
//       color: colors[Math.floor(Math.random() * colors.length)],
//     })
//   }
console.log(res);
  return res
}