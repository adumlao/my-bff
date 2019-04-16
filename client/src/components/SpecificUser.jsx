import React from 'react'
import {
    verifyToken,
  getUser,
   } from '../services/user';
import {
  deletePost,
  getPosts,
   getUserPosts,
 } from '../services/post';
 import {
   postComments,
   getComments
 } from '../services/comments'

import PostsList from './PostsList'


class SpecificUser extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      comment_by:'',
      comment: '',
      comments: [],
      posts: [],
      user: [],
      userPosts: [],
    }
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.deleteThisPost = this.deleteThisPost.bind(this);
  }

  handleCommentChange(e) {
   const { name, value } = e.target;
   this.setState(prevState => ({
       ...prevState.comment,
       [name]: value
   }))
  }

  async handleSubmitComment(id){
   const name = await localStorage.getItem('name');
   const data = {
    comment: this.state.comment,
    comment_by: name
   }
   await postComments(id, data);
   const posts = await getPosts();
   const comments = await getComments();
   this.setState({
     posts,
     comments
   })
  }

  async deleteThisPost(id){
    const userId = await localStorage.getItem('id');
    await deletePost(userId, id);
    const posts = await getPosts();
    this.setState({
      posts,
    });
  }

  async componentDidMount() {
    const { user } = await verifyToken();
     const id = this.props.match.params.id
     const thisUser = await getUser(id);
     const posts = await getPosts();
     const comments = await getComments();
     this.setState({
       user: thisUser.user,
       posts,
       comments,
       currentUser: user
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
        comments={this.state.comments}
        handleCommentChange={this.handleCommentChange}
        handleSubmitComment={this.handleSubmitComment}
        />
        </div>
      </div>

      </div>


    )
  }
}




export default SpecificUser;
