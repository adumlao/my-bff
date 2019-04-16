import React from 'react'
import {
  verifyToken,
} from '../services/user';
import {
  getAllUsers,
  getUser,
   } from '../services/user';
import {  Link } from 'react-router-dom';



class RandomUser extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      currentUser: [],
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
    const { user } = await verifyToken();
     const allUsers = await getAllUsers();
     this.setState({
       allUsers: allUsers.users,
       currentUser: user
     })
this.showRandom();
  }

  render(props){
    return(
      <div className="bio">
        <div className="cutie" style={{ backgroundImage: 'url(/media/cutie.gif)' }}></div>
        <div className='rando-top'>
        <Link className="rando-name" to={`/user/${this.state.user.id}`}>Meet {this.state.user.name}</Link>
        <div className="rando-location">From {this.state.user.location}:</div>
        <div className="rando-Img" style={{backgroundImage: `url(${this.state.user.profile_pic})`}}></div>
        </div>
        <div className="rando-bio">{this.state.user.bio}</div>
      </div>
    )
  }
}




export default RandomUser;
