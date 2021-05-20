import React, { createContext, useState } from 'react'

export const TagContext = createContext()

export const TagProvider = props => {
    const [tags, setTags] = useState([])
    const headers = {
        "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
        "Content-Type": "application/json"
    }

    const getTags = () => {
        return fetch(`http://localhost:8000/tags`, {
            headers: headers
        })
            .then(res => res.json())
            .then(setTags)
    }

    const addTag = tagObj => {
        return fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(tagObj)
        })
        .then(getTags)
    }

    
    const addPostTags = (tagObj) => {
        return fetch(`http://localhost:8000/posts/${tagObj.postId}/tags`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(tagObj)
        })      
    }

    const tagDelete = (tagId) => {
        return fetch(`http://localhost:8000/tags/${tagId}`, {
            method: "DELETE",
            headers: headers
        })
            .then(getTags)
    }

    const updateTag = tag => {
        return fetch(`http://localhost:8000/tags/${tag.id}`, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(tag)
        })
          .then(getTags)
      }

      const getTagById = (id) => {
        return fetch(`http://localhost:8000/tags/${id}`, {
            headers: headers
        })
            .then(res => res.json())
            
    }

    // const postTagDelete = (postTagId) => {
    //     return fetch(`http://localhost:8000/postTags/${postTagId}`, {
    //         method: "DELETE"
    //     })
    //         .then(getTags)
    // }


    return (
        <TagContext.Provider value={{
            tags, getTags, addTag, addPostTags, tagDelete, 
            updateTag, getTagById
        }}>
            {props.children}
        </TagContext.Provider>
    )
}