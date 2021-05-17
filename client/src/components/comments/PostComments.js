import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { CommentCard } from './CommentCard'
import { CommentContext } from './CommentProvider'


export const PostComments = props => {
    const { getCommentsByPostId, postComments, setPostComments } = useContext(CommentContext)
    
    const { postId } = useParams()
    
    useEffect(() => {
        getCommentsByPostId(postId)
        // .then((comments)=> setPostComments(comments))
    }, [])

    return(
        <section className="postComments">
           { 
            postComments.map(comment => <CommentCard 
                                            key={comment.id}
                                            comment={comment} />)
           }
        </section>
    )
}