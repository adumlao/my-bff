import React from 'react'
import {  Link } from 'react-router-dom';

const CommentsList = (props) => {
  return(
    <div>
    {props.comments.filter(x=>(x.post_id ===   props.posts)).map(x=>(
      <div key={x.id}>
      <Link className='post-by' to={`/user/${x.user_id}`}>{x.comment_by}</Link>
      <div>{x.comment}</div>
      </div>
    ))}
    </div>
  )
}

export default CommentsList;
