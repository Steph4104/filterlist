import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import '../styles/Add.scss';

class Add extends Component {
  state = {
    titre: '',
    ingredients: '',
    etapes: '',
    link: '',
    tags: '',
    formtype:'',
    id:'',
    image:''
  }

  async componentDidMount() {
    var data_id = this.props.location.query
    var titre, ingredients, etapes, link, tags, id =''
    if(data_id)
    {
      id = Object.values(data_id)
      
      await axios({
        method: 'get',
        url: 'http://restapireact.sclmedia.ca/api/contacts.php?id='+id,
        
      })
      .then(function (response) {
        //handle success
        titre = response.data[0]['titre']
        ingredients = response.data[0]['ingredients']
        etapes = response.data[0]['etapes']
        link = response.data[0]['link']
        tags = response.data[0]['tags']
        id = response.data[0]['id']        
         
      })
      .catch(function (response) {
        //handle error
        console.log(response)
      });
      this.setState({titre:titre, ingredients:ingredients, etapes:etapes, link:link, tags:tags, id:id,formtype:'edit'})
    }else{
      
      this.setState({formtype:'add'})
    }
}

  handleFormSubmit( event ) {
    event.preventDefault();
    let formData = new FormData();
    formData.append('titre', this.state.titre)
    formData.append('ingredients', this.state.ingredients)
    formData.append('etapes', this.state.etapes)
    formData.append('link', this.state.link)
    formData.append('tags', this.state.tags)
    formData.append('image', this.state.image)
    
    if(this.state.formtype == 'edit'){
      formData.append('id', this.state.id)
      axios({
        method: 'post',
        url: 'http://restapireact.sclmedia.ca/api/contacts.php',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then(function (response) {
        //handle success
        console.log(response)
        alert('Success')
         
      })
      .catch(function (response) {
        //handle error
        console.log(response)
      });
    
  }else{
  
    axios({
      method: 'post',
      url: 'http://restapireact.sclmedia.ca/api/contacts.php',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
      //handle success
      console.log(response)
      alert('Success')
       
    })
    .catch(function (response) {
      //handle error
      console.log(response)
    });
    
    }
   this.setState({titre:'', ingredients:'', etapes:'', link:'', tags:'', image:''})
    alert('Clean')
  }

  delete(event){
    let formData = new FormData();
    formData.append('delete', this.state.id)
     axios({
       method: 'post',
       url: 'http://restapireact.sclmedia.ca/api/contacts.php',
       data: formData,
       config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
     .then(function (response) {
      //handle success
     console.log(response)
       alert('Success')
       
     })
     .catch(function (response) {
       //handle error
       console.log(response)
     });
  }

  render(){
    let delete_button;
    if(this.state.formtype == 'edit'){
      delete_button = <button  onClick={e => this.delete(e)} value='delete'>Delete</button>
    }
    
    return (
      <div>
        
         <Link to="/">Home</Link>
         {this.state.formtype}
      
        <form class="form-style-9">
          <ul>
          <li>
              <input type="text" name="titre" value={this.state.titre} onChange={e => this.setState({ titre: e.target.value })}class="field-style field-split align-left" placeholder="Titre" />
              <input type="text" name="link" value={this.state.link} onChange={e => this.setState({ link: e.target.value })} class="field-style field-split align-right" placeholder="Link" />

          </li>
          <li>
          <input className="fileInput" type="file" name="image" onChange={e => this.setState({ image: e.target.value })}/>
              <input type="text" name="field3" class="field-style field-split align-left" placeholder="Phone" />
              <input type="url" name="field4" class="field-style field-split align-right" placeholder="Website" />
          </li>
          <li>
          <input type="text" name="tags" value={this.state.tags} onChange={e => this.setState({ tags: e.target.value })} class="field-style field-full align-none" placeholder="Tags" />
          </li>
          <li>
          <textarea name="ingredients" value={this.state.ingredients} onChange={e => this.setState({ ingredients: e.target.value })} class="field-style" placeholder="Ingredients"></textarea>
          </li>
          <li>
          <textarea name="etapes" value={this.state.etapes} onChange={e => this.setState({ etapes: e.target.value })} class="field-style" placeholder="Etapes"></textarea>
          </li>
          <li>
          <button onClick={e => this.handleFormSubmit(e)} class="btn btn-success btn-flat">{this.state.formtype}</button>
          </li>
          <li> {delete_button}</li>
          </ul>
          </form>
        </div>
        );
    }
}
export default Add;