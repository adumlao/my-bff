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


class SpecificUser extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      posts: [],
      user: [],
      userPosts: [],
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
  }

  async componentDidMount() {
     const id = this.props.match.params.id
     const user = await getUser(id);
     const posts = await getPosts();
     this.setState({
       user: user.user,
       posts
     })
    await this.fetchUserPosts();
  }

  async fetchUserPosts() {
    const id = this.props.match.params.id
    const userPosts = await getUserPosts(id)
    this.setState({
      userPosts: userPosts
    })
  }

  render(props){
    console.log(this.state.userPosts);
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
        <PostsList{...props}
        posts={this.state.userPosts}
        user={this.state.userPosts.user_id}
        deleteThisPost={this.deleteThisPost}
        />
        </div>
      </div>

      </div>


    )
  }
}




export default SpecificUser;
