import React from 'react';
import Dropzone from 'react-dropzone';
import FilesBase64 from 'react-file-base64';
import { withRouter } from 'react-router';

import {
  verifyToken,
} from '../services/user';

import {
    deletePost,
    getPosts,
    createPost } from '../services/post';

import {
  postComments,
  getComments
} from '../services/comments'

import PostsList from './PostsList'

class PostForm extends React.Component {
  constructor(props) {
     super(props)

     this.state = {
       currentUser: [],
      comment_by:'',
      comment: '',
      comments: [],
      posts: [],
      body: '',
      description: '',
      posted_by: '',
      filepath: '',
      uploadedFile: null,
     };
     this.onImageDrop = this.onImageDrop.bind(this)
     this.handlePostFormChange = this.handlePostFormChange.bind(this);
     this.handleSubmitPost = this.handleSubmitPost.bind(this);
     this.deleteThisPost = this.deleteThisPost.bind(this);
     this.handleSubmitComment = this.handleSubmitComment.bind(this);
     this.handleCommentChange = this.handleCommentChange.bind(this);
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
       posts
     });
   }

   async componentDidMount(){
     const { user } = await verifyToken();
     const posts = await getPosts();
     this.setState({
       posts,
       currentUser: user
     })
   }

   getFiles(filepath) {
   this.setState({
     filepath: filepath
   });
 }

  getBase64(item, cb) {
     let reader = new FileReader();
     reader.readAsDataURL(item);
     reader.onload = () => cb(reader.result);
     reader.onerror = function(e) {console.log("error", e)}
   }
   onImageDrop(files) {
     this.getBase64(files[0], (result) => {
       this.setState({
         uploadedFile: result
       })
     })
   }


      async handleSubmitPost(e){
        e.preventDefault();
        const id = await localStorage.getItem('id');
        const name = await localStorage.getItem('name');
        const data = {
          body: this.state.uploadedFile,
          description: this.state.description,
          posted_by: name
        }
        await createPost(id, data);
        const posts = await getPosts();
        this.setState({
          posts
        });

      }

      handlePostFormChange(e) {
       const { name, value } = e.target;
       this.setState(prevState => ({
           ...prevState.description,
           [name]: value
       }))
     }

  render(props){
    const {
      description,
    } = this.state
  return (
    <div className="user-posts">

    <form className='update-form'>
    <div className="update-img" style={{backgroundImage: `url(${this.state.uploadedFile}`}}>

    <Dropzone
    onDrop={acceptedFiles => {
    this.onImageDrop(acceptedFiles);
      }}
    multiple={false}>
    {({getRootProps, getInputProps, isDragActive}) => {
    return (
      <div className="drop" {...getRootProps()} >
      <input {...getInputProps()} />
      { isDragActive ?
      <div className="drop-cross"> + </div> :
      <div className="drop-text"> Drag or Upload Photo </div>
      }
      </div>
      )
    }}
    </Dropzone>
    </div>

    <div className="update-text">
    <textarea
    className="update-blog"
    name="description"
    id="description"
    placeholder="Meow, Woof, Oink, Neigh, Chirp Away!"
    value={description}
    onChange={this.handlePostFormChange} />

    <button
    className="blog-button"
    onClick={this.handleSubmitPost}
    type="submit">Post</button>
    </div>
    </form>

    <PostsList{...props}
    posts={this.state.posts}
    user={this.props.currentUser}
    deleteThisPost={this.deleteThisPost}
    comment={this.state.comment}
    handleCommentChange={this.handleCommentChange}
    handleSubmitComment={this.handleSubmitComment}
    />
    </div>
  )
}
}

export default withRouter(PostForm);
