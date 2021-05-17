import React, { createContext, useState } from 'react'

export const TagContext = createContext()

export const TagProvider = props => {
    const [tags, setTags] = useState([])


    
    
    const getTags = () => {
        return fetch(`http://localhost:8088/tags`)
            .then(res => res.json())
            .then(setTags)
    }

    const addTag = tagObj => {
        return fetch("http://localhost:8088/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagObj)
        })
        .then(getTags)
    }


    const getPostTags = () => {
        return fetch(`http://localhost:8088/postTags`)
            .then(res => res.j)
    }
    
    const addPostTags = (tagObj) => {
        return fetch(`http://localhost:8088/postTags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagObj)
        })
        .then(getPostTags)
                
    }

    const tagDelete = (tagId) => {
        return fetch(`http://localhost:8088/tags/${tagId}`, {
            method: "DELETE"
        })
            .then(getTags)
    }

    const updateTag = tag => {
        return fetch(`http://localhost:8088/tags/${tag.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(tag)
        })
          .then(getTags)
      }

      const getTagById = (id) => {
        return fetch(`http://localhost:8088/tags/${id}`)
            .then(res => res.json())
            
    }

    // const postTagDelete = (postTagId) => {
    //     return fetch(`http://localhost:8088/postTags/${postTagId}`, {
    //         method: "DELETE"
    //     })
    //         .then(getTags)
    // }


    return (
        <TagContext.Provider value={{
            tags, getTags, getPostTags, addTag, addPostTags, tagDelete, 
            updateTag, getTagById
        }}>
            {props.children}
        </TagContext.Provider>
    )
}