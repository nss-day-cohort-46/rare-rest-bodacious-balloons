import React, { useContext } from 'react'  
import { useHistory } from 'react-router'
import { Link, useParams } from 'react-router-dom'
import { CommentContext } from './CommentProvider'
import '../posts/PostCard.css'
export const CommentCard = ({ comment }) => {
    const history = useHistory()
    const { deleteComment } = useContext(CommentContext)
    const currentUser = parseInt(localStorage.getItem('rare_user_id'))
    const { postId } = useParams()
    
    const handleDelete = () => {
        deleteComment(comment.id, postId)
        .then(() => { history.push(`/posts/detail/${postId}`)})
    }
    return(
        <section className="comment">
            <p>{comment.content}</p>
            <p>-  {comment.username}</p>

            {currentUser === comment.authorId ?  <button className="editButton" onClick={() => {
                history.push(`/posts/detail/editcomment/${comment.id}`)
            }}>Edit</button> : <div></div>}
            
            
            {currentUser === comment.authorId ?  <button className="deleteButton" onClick={handleDelete}
                >X</button> : <div></div>}
            
        </section>
    )
}