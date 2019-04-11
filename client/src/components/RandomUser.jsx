import React from 'react'
import {
  getAllUsers,
  getUser,
   } from '../services/user';

class RandomUser extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      allUsers : [],
      user: [],
    }
  }

  async showRandom(){
    const num = this.state.allUsers.length
    const randomNum = Math.random(num) * num
    const index = Math.floor(randomNum)
    const id = this.state.allUsers[index].id
    const user = await getUser(id)
    this.setState({
      user: user.user
    })
  }

  async componentDidMount() {
     const allUsers = await getAllUsers();
     this.setState({
       allUsers: allUsers.users
     })
this.showRandom();
  }

  render(props){
    return(
      <div className="bio">
        <div className="cutie" style={{ backgroundImage: 'url(/media/cutie.gif)' }}></div>
        <div className='rando-top'>
        <div className='rando-name'>Meet {this.state.user.name}</div>
        <div className="rando-name">From {this.state.user.location}:</div>
        <div className="rando-Img" style={{backgroundImage: `url(${this.state.user.profile_pic})`}}></div>
        </div>
        <div className="rando-bio">{this.state.user.bio}</div>
      </div>
    )
  }
}




export default RandomUser;
