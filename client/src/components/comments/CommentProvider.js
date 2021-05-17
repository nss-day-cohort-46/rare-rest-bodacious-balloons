import React, { useState, createContext } from "react"
import { useParams } from 'react-router-dom'
export const CommentContext = createContext()

// This component establishes what data can be used.
export const CommentProvider = (props) => {
    const { postId, commentId } = useParams()
    const [comments, setComments] = useState([])
    const [postComments, setPostComments] = useState([])

    const getComments = () => {
        return fetch("http://localhost:8088/comments")
        .then(res => res.json())
        .then(setComments)
    }

    const addComment = commentObj => {
        return fetch("http://localhost:8088/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentObj)
        })
        .then(getComments)
    }

    const getCommentsByPostId = (postId) =>{
        return fetch(`http://localhost:8088/comments?postId=${postId}`)
        .then(res => res.json())
        .then(setPostComments)
    }
    
    const getCommentById = (id) => {
        return fetch(`http://localhost:8088/comments/${id}`)
            .then(res => res.json())
    }

    const deleteComment = (commentId, postId) => {
        return fetch(`http://localhost:8088/comments/${commentId}`, {
            method: "DELETE"
        })
          .then(() => getCommentsByPostId(postId))  
    }

    const updateComment = comment => {
        return fetch(`http://localhost:8088/comments/${comment.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(comment)
        })
          .then(getComments)
      }

    /*
        You return a context provider which has the
        `animals` state, `getAnimals` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.
    */
    return (
        <CommentContext.Provider value={{
            comments, getComments, addComment, getCommentById, updateComment, deleteComment, getCommentsByPostId, postComments, setPostComments
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}