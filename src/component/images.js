import axios from 'axios';
// export default function images(count) {
//   this.state = {
//     contacts: [],
//     data:''
//   }


// //const get_list = () => {
//   const url = 'http://restapireact.sclmedia.ca/api/contacts.php'
//   axios.get(url).then(response => response.data)
//   .then((data) => {
//     console.log(data)
//     this.setState({ contacts: data })
    
//    })
// //}
// return this.state.contacts
// }

export default function images(count) {
  var strr = '';
     axios.get('http://restapireact.sclmedia.ca/api/contacts.php')
    .then(function(response){
      console.log('response '+response)
            strr.push(response);
            strr = response
            const result = Object.keys(strr).map((key) => map[key]);
            console.log('result '+result)
     })


     .catch(function(error){
            console.log('ERROR '+error);
        });
        console.log("strr "+ strr)

        const res = [
          {id:0, src: 'idImg_000', info:'front,asphalt'},
          {id:1, src: 'idImg_001', info:'back'},
          {id:2, src: 'idImg_002', info:'pave'},
          {id:3, src: 'idImg_003', info:'stair'},
          {id:4, src: 'idImg_004', info:'stair'},
          {id:5, src: 'idImg_005', info:'pool'},
          {id:6, src: 'idImg_006', info:'front'},
          {id:7, src: 'idImg_000', info:'back'},
          {id:8, src: 'idImg_001', info:'pool'},
          {id:9, src: 'idImg_002', info:'front'},
          {id:10, src: 'idImg_003', info:'stair'},
          //{id:12, src: 'idImg_000', info:'arrieve,pave,contour de piscine'},
          {id:11, src: 'idImg_004', info:'front'},
          {id:12, src: 'idImg_005', info:'stair'},
          {id:13, src: 'idImg_006', info:'pave'},
          // {id:3, src: './img/idImg_003.jpg', info:'arrieve,pave'},
          // {id:4, src: './img/idImg_004.jpg', info:'arrieve,contour de piscine'},
          // {id:5, src: './img/idImg_005.jpg', info:'avant,fleur,escalier'},
          // {id:6, src: './img/idImg_006.jpg', info:'avant,escalier'},
          // {id:7, src: './img/idImg_007.jpg', info:'avant,fleur'},
          // {id:9, src: './img/idImg_008.jpg', info:'avant,fleur'},
          // {id:10, src: './img/idImg_000.jpg', info:'avant,escalier'},
          // {id:11, src: './img/idImg_001.jpg', info:'arriere,escalier'},
          // {id:12, src: './img/idImg_002.jpg', info:'arrieve,pave,contour de piscine'},
          // {id:13, src: './img/idImg_003.jpg', info:'arrieve,pave'},
          // {id:14, src: './img/idImg_004.jpg', info:'arrieve,contour de piscine'},
          // {id:15, src: './img/idImg_005.jpg', info:'avant,fleur,escalier'},
          // {id:16, src: './img/idImg_006.jpg', info:'avant,escalier'},
          // {id:17, src: './img/idImg_007.jpg', info:'avant,fleur'},
          //{id:18, src: './img/idImg_008.jpg', info:'avant,fleur'},
      
      ]
     return res;
} 