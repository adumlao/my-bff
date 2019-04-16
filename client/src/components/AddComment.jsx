import React from 'react';

const AddComment = (props) => {
  return (
  <div>
  <form>
  <textarea
  name="comment"
  id="description"
  value={props.comment}
  onChange={props.handleCommentChange} />

  <button
  onClick={this.handleSubmitComment(id)}
  type="submit">Comment</button>
  </form>
  </div>
  )
}

export default AddComment;
