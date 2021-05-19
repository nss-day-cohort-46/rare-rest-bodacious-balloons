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
            <p>-  {comment.author.user.username}</p>

            {currentUser === comment.author.user.id ?  <button className="editButton" onClick={() => {
                history.push(`/posts/detail/editcomment/${comment.id}`)
            }}>E</button> : <div></div>}
            
            
            {currentUser === comment.author.user.id ?  <button className="deleteButton" onClick={handleDelete}
                >X</button> : <div></div>}
            
        </section>
    )
}