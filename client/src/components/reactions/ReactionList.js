import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ReactionContext } from './ReactionProvider'

export const ReactionList =() => {
    const {reactions, getReactions, addPostReaction, getPostReactions, postReact} = useContext(ReactionContext)
    const {postId} = useParams()
    const userId = parseInt(localStorage.getItem(`rare_user_id`))

    

    useEffect(()=>{
        getReactions()
        .then(()=> getPostReactions())
    }, [])

    const [reaction, setReaction]= useState({
        userId: parseInt(userId),
        postId: parseInt(postId),
        reactionId: 0
    })

    const handleReactionClick = (event) => {
        const newReaction = {...reaction}
        newReaction[event.target.id] = parseInt(event.target.value)
        // setReaction(newReaction)
        addPostReaction(newReaction)     
      }
    

    
    return(
        <>
            <h2>Reactions</h2>
            <div>{reactions.map(react => <button onClick={handleReactionClick} id="reactionId" value={react.id} key={react.id}><img key={react.id} src={react?.imageUrl} width="10%"/></button>)}</div>
        </>
    )
}

