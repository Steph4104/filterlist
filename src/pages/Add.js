import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

class Add extends Component {
  state = {
    titre: '',
    ingredients: '',
    etapes: '',
    link: '',
    tags: '',
    formtype:'',
    id:''
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
   this.setState({titre:'', ingredients:'', etapes:'', link:'', tags:''})
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
    if(this.state.formtype = 'edit'){
      delete_button = <button  onClick={e => this.delete(e)} value='delete'>Delete</button>
    }
    
    return (
      <div>
        
         <Link to="/">Home</Link>
         {this.state.formtype}
      <form>
        <label>titre</label>
        <input type="text" name="titre" value={this.state.titre} onChange={e => this.setState({ titre: e.target.value })}/>

        <label>ingredients</label>
        <input type="text" name="ingredients" value={this.state.ingredients} onChange={e => this.setState({ ingredients: e.target.value })}/>

        <label>link</label>
        <input type="text" name="link" value={this.state.link} onChange={e => this.setState({ link: e.target.value })}/>

        <label>etapes</label>
        <input type="text" name="etapes" value={this.state.etapes} onChange={e => this.setState({ etapes: e.target.value })}/>

        <label>tags</label>
        <input type="text" name="tags" value={this.state.tags} onChange={e => this.setState({ tags: e.target.value })}/>

        <input type="submit" onClick={e => this.handleFormSubmit(e)} value={this.state.formtype} />
        {delete_button}
        </form>
        </div>
        );
    }
}
export default Add;