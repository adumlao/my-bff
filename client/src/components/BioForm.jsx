import React from 'react';
import { withRouter } from 'react-router';
import {
  updateUser } from '../services/user'

class BioForm extends React.Component {
    constructor(props) {
      super(props)

       this.state = {
         user: [],
         bioForm: {
           location: '',
           bio: '',
         }
       }
       this.handleBioFormChange = this.handleBioFormChange.bind(this);
       this.submitBio = this.submitBio.bind(this);
     }

     handleBioFormChange(e) {
      const { name, value } = e.target;
      this.setState(prevState => ({
        bioForm: {
          ...prevState.bioForm,
          [name]: value
        }
      }))
    }

     async submitBio(e){
       e.preventDefault();
       const id = await localStorage.getItem('id');
       await updateUser(id, this.state.bioForm);
       this.props.fetchUser();
       this.props.history.push('/feed')
      }

     render(){
     const {
      location,
      bio
    } = this.state.bioForm;

  return (
    <form className="bio-form"onSubmit={this.submitBio}>
      <input
      className="edit-location"
      placeholder="Location"
      type="text"
      name="location"
      value={location}
      id="location"
      onChange={this.handleBioFormChange} />
      <textarea
      className="edit-textbio"
      placeholder="Say Something About Yourself"
      name="bio"
      id="bio"
      value={bio}
      onChange={this.handleBioFormChange} />
      <button className='blog-button'>Post</button>
    </form>
  )
}
}

export default withRouter(BioForm);
