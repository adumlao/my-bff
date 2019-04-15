import React from 'react'

const CommentsList = (props) => {
  return(
    <div>
    {props.comments.filter(x=>(x.post_id === props.posts)).map(x=>(
      <div key={x.id}>
        <div>{x.comment_by}</div>
        <div>{x.comment}</div>
      </div>
    ))}
    </div>
  )
}

export default CommentsList;
