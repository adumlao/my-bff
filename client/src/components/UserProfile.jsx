import React from 'react'
import {
  getUser,
   } from '../services/user';
import {
  deletePost,
  getPosts,
   getUserPosts,
 } from '../services/post';

import PostsList from './PostsList'


class UserProfile extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      posts: [],
      user: [],
      userPosts: [],
      rando:[]
    }
    this.deleteThisPost = this.deleteThisPost.bind(this);
  }

  async deleteThisPost(id){
    const userId = await localStorage.getItem('id');
    await deletePost(userId, id);
    const posts = await getPosts();
    this.setState({
      posts
    });
    await this.fetchUserPosts();
  }

  async componentDidMount() {
     const id = await localStorage.getItem('id');
     const user = await getUser(id);
     const posts = await getPosts();
     this.setState({
       user: user.user,
       posts
     })
    await this.fetchUserPosts();
  }

  async fetchUserPosts() {
    const userPosts = await getUserPosts(this.state.user.id)
    this.setState({
      userPosts: userPosts
    })
  }

  render(props){
    return(
      <div className='user-page'>

      <header>
        <div className="profile-banner" style={{backgroundImage: `url(${this.state.user.banner})`}}></div>

        <div className='user'>
          <div className="profileImg" style={{backgroundImage: `url(${this.state.user.profile_pic})`}}></div>
          <div className='username'>Hi! I'm {this.state.user.name}.</div>
        </div>
      </header>

      <div className="body">
        <div className="bio">
          <div className="location">Lives in: {this.state.user.location}</div>
          <div className="user-blurb">{this.state.user.bio}</div>
        </div>
        <div className="user-posts">
        <PostsList
        posts={this.state.userPosts}
        user={this.state.user.id}
        deleteThisPost={this.deleteThisPost}
        />
        </div>
      </div>

      </div>


    )
  }
}




export default UserProfile;
