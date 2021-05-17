import React, { createContext, useState } from 'react'

export const PostContext = createContext()

export const PostProvider = props => {
    const [posts, setPosts] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getPosts = () => {
        return fetch(`http://localhost:8088/posts`)
            .then(res => res.json())
            .then(setPosts)
    }
    const getPostById = (id) => {
        return fetch(`http://localhost:8088/posts/${id}`)
            .then(res => res.json())
            
    }

    const addPost = postObj => {
        // debugger
        return fetch("http://localhost:8088/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObj)
        })
        .then(getPosts)
    }

    const updatePost = post => {
        return fetch(`http://localhost:8088/posts/${post.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    const deletePost = postId => {
        debugger
        return fetch(`http://localhost:8088/posts/${postId}`, {
            method: "DELETE"
        })
            .then(getPosts)
    }

    const postTagDelete = (postTagId) => {
        return fetch(`http://localhost:8088/postTags/${postTagId}`, {
            method: "DELETE"
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