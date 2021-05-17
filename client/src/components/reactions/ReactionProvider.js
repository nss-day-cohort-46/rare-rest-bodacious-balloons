import React, { createContext, useState } from 'react'

export const ReactionContext = createContext();

export const ReactionProvider = props => {
    const [reactions, setReactions] = useState([])
    const [postReact, setPostReact] = useState([])

    const getReactions = () => {
        return fetch(`http://localhost:8088/reactions`)
            .then(res => res.json())
            .then(setReactions)
    }

    const addReaction = tagObj => {
        return fetch("http://localhost:8088/reactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagObj)
        })
        .then(getReactions)
    }


    const getPostReactions = () => {
        return fetch(`http://localhost:8088/postReactions`)
            .then(res => res.json())
            .then(setPostReact)
    }
    
    const addPostReaction = (reactObj) => {
        return fetch(`http://localhost:8088/postReaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reactObj)
        })
        .then(getPostReactions)
                
    }

    // const getReactionsByReactionId = (reactionId) =>{
    //     return fetch(`http://localhost:8088/postReaction?reaction=${rectionId}`)
    //     .then(res => res.json())
    //     .then(setPostComments)
    // }


    return (
        <ReactionContext.Provider value={{
            reactions, getReactions, addReaction, getPostReactions, postReact, addPostReaction
        }}>
            {props.children}
        </ReactionContext.Provider>
    )
}