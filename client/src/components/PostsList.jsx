import React from 'react';
import {  Link } from 'react-router-dom';
import CommentsList from './CommentsList'

import {
  verifyToken,
} from '../services/user';

import {
    getPosts,
     } from '../services/post';

import {
  postComments,
  getComments
} from '../services/comments'

class PostsList extends React.Component {

  constructor(props) {
     super(props)

     this.state = {

       currentUser: [],
      comments: [],
      posts: [],
    }
  }


  async componentDidMount(){

    const { user } = await verifyToken();
    const posts = await getPosts();
    const comments = await getComments();
    this.setState({
      posts,
      comments,
      currentUser: user
    })
  }

    render() {
    return(
    <div className="feed">
    {this.props.posts.map(x => (
      <div
      className="post-block"
      key={x.id}>

        <Link className='post-by' to={`/user/${x.user_id}`}>{x.posted_by}</Link>

        <div className="post-date">On: {(x.created_at).split("T")[0]} </div>

        <div className="post-caption">{x.description}</div>

        {x.body === null ? null :
        <div className="post-image" style={{backgroundImage: `url(${x.body})`}}></div>}

        {this.props.user === x.user_id ?
        <div className="edits">
        <Link className="edit-buttons" to={`/post/${x.id}/edit`}>Edit</Link>
        <div className="edit-buttons" onClick={() => this.props.deleteThisPost(x.id)}>Delete</div>
        </div>
        : null
        }

        <form>
        <textarea
        name="comment"
        id="description"
        value={this.props.comment}
        onChange={this.props.handleCommentChange} />

        <button
        onClick={() => this.props.handleSubmitComment(x.id)}>Comment</button>
        </form>

        <CommentsList
        comments={this.state.comments}
        posts={x.id}
        />

      </div>
    ))}
    </div>
  )
}
};

export default PostsList
