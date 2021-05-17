import React, { useContext, useEffect, useState } from "react"
import { CommentContext } from './CommentProvider'
import { useHistory, useParams } from 'react-router-dom'
import '../posts/PostCard.css'
export const CommentForm = () => {
    const { addComment, getComments, getCommentById, updateComment, comments, getCommentsByPostId, PostComments, setPostComments } = useContext(CommentContext)
    const { postId, commentId } = useParams()
    const history = useHistory();
    // const edit = history.location.pathname.includes("/editcomment")
    const user = localStorage.getItem('rare_user_id')
    const [comment, setComment] = useState({
        id: 0,
        postId: parseInt(postId),
        authorId: parseInt(user),
        content: ""
    });
    // const [isLoading, setIsLoading] = useState(true);

     // check and see if this is "my posts" or just all posts
    //  if (history.location.pathname.includes("/my")) {
    //     const thisUsersPosts = sortedPosts.filter(post => post.userId === userId)
    //     setUserPosts(thisUsersPosts)
    // } else {
    //     setUserPosts(sortedPosts)
    // }
    // }, [posts])
    useEffect(()=> {
        if (commentId){
            getCommentById(commentId)
            .then(comment => {
                setComment(comment)
                // setIsLoading(false)
            })
        }
    }, [])

    const handleControlledInputChange = (event) => {
        const newComment = { ...comment}
        newComment[event.target.id] = event.target.value
        // update state
        setComment(newComment)
        
      }

    const handleSaveComment = () => {
        console.log(comment)
        const pId = parseInt(postId)
        if (commentId){
            updateComment({
                id: comment.id,
                postId: comment.postId,
                authorId: comment.authorId,
                content: comment.content
            })
            // .then(()=> getCommentsByPostId(pId))
            .then(() => history.push(`/posts/detail/${comment.postId}`))
        }else{
            addComment({
                postId: parseInt(postId),
                authorId: parseInt(user),
                content: comment.content
                })
                .then(()=> getCommentsByPostId(pId))
                .then(()=> setComment({
                    postId: parseInt(postId),
                    authorId: parseInt(user),
                    content: ""
                }))
                .then(() => history.push(`/posts/detail/${pId}`))
        }
        }   
        

    return(
        <form className="commentForm">
            <h2 className="commentForm__title">{commentId ? "Edit Comment" : "Add Comment"}</h2>
            <fieldset>
              <div className="form-group">
                  <label htmlFor="content">Comment</label>
                  <input type="text" id="content" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder=""  value={comment.content}/>
              </div>
          </fieldset>
          <button className="btn btn-primary"
            // disabled={isLoading}
            onClick={event => {  
              event.preventDefault()
              handleSaveComment()
            }}>
            {commentId ? "Save Edit" : "Add Comment"}
          </button>
        </form>
    )

}