import React, { createContext, useState } from 'react'

export const ReactionContext = createContext();

export const ReactionProvider = props => {
    const [reactions, setReactions] = useState([])
    const [postReact, setPostReact] = useState([])

    const getReactions = () => {
        return fetch(`http://localhost:8000/reactions`,{
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
            }
        })
            .then(res => res.json())
            .then(setReactions)
    }

    const addReaction = tagObj => {
        return fetch("http://localhost:8000/reactions", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagObj)
        })
        .then(getReactions)
    }


    // const getPostReactions = (post) => {
    //     return fetch(`http://localhost:8000/posts/${post}/reaction`,{
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("rare_user_token")}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(setPostReact)
    // }
    
    const addPostReaction = (reactObj, post) => {
        return fetch(`http://localhost:8000/posts/${post}/reaction`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reactObj)
        })
        // .then(getPostReactions)
                
    }

    // const getReactionsByReactionId = (reactionId) =>{
    //     return fetch(`http://localhost:8000/postReaction?reaction=${rectionId}`)
    //     .then(res => res.json())
    //     .then(setPostComments)
    // }


    return (
        <ReactionContext.Provider value={{
            reactions, getReactions, addReaction, postReact, addPostReaction
        }}>
            {props.children}
        </ReactionContext.Provider>
    )
}