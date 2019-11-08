import React, { Component } from 'react';
import axios from 'axios';

class Add extends Component {
  state = {
    titre: '',
    ingredients: '',
    etapes: '',
    link: '',
    tags: '',
  }

  handleFormSubmit( event ) {
    event.preventDefault();
    let formData = new FormData();
    formData.append('titre', this.state.titre)
    formData.append('ingredients', this.state.ingredients)
    formData.append('etapes', this.state.etapes)
    formData.append('link', this.state.link)
    formData.append('tags', this.state.tags)

    axios({
      method: 'post',
      url: 'http://restapireact.sclmedia.ca/api/contacts.php',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
      //handle success
      console.log(response)
    })
    .catch(function (response) {
      //handle error
      console.log(response)
    });
  }

  render(){
    return (
      <form>
        <label>titre</label>
        <input type="text" name="titre" value={this.state.titre} onChange={e => this.setState({ titre: e.target.value })}/>

        <label>ingredients</label>
        <input type="email" name="ingredients" value={this.state.ingredients} onChange={e => this.setState({ ingredients: e.target.value })}/>

        <label>link</label>
        <input type="text" name="link" value={this.state.link} onChange={e => this.setState({ link: e.target.value })}/>

        <label>etapes</label>
        <input type="text" name="etapes" value={this.state.etapes} onChange={e => this.setState({ etapes: e.target.value })}/>

        <label>tags</label>
        <input type="text" name="tags" value={this.state.tags} onChange={e => this.setState({ tags: e.target.value })}/>

        <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Create Contact" />
        </form>);
    }
}
export default Add;