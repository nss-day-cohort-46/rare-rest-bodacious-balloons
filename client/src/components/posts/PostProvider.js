import React, { createContext, useState } from 'react'

export const PostContext = createContext()

export const PostProvider = props => {
    const [posts, setPosts] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getPosts = () => {
        return fetch(`http://localhost:8000/posts`), {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
            }
        }
            .then(res => res.json())
            .then(setPosts)
    }
    const getPostById = (id) => {
        return fetch(`http://localhost:8000/posts/${id}`), {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
            }
        }
            .then(res => res.json())
            
    }

    const addPost = postObj => {
        // debugger
        return fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObj)
        })
        .then(getPosts)
    }

    const updatePost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    const deletePost = postId => {
        debugger
        return fetch(`http://localhost:8000/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
            }
        })
            .then(getPosts)
    }

    const postTagDelete = (postTagId) => {
        return fetch(`http://localhost:8000/postTags/${postTagId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
            }
        })
    }
    

    return (
        <PostContext.Provider value={{
            posts, getPosts, getPostById, addPost, updatePost, deletePost, postTagDelete, searchTerms, setSearchTerms
        }}>
            {props.children}
        </PostContext.Provider>
    )
}