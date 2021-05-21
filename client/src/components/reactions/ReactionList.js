import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ReactionContext } from './ReactionProvider'

export const ReactionList =() => {
    const {reactions, getReactions, addPostReaction, getPostReactions, postReact} = useContext(ReactionContext)
    const {postId} = useParams()
    const userId = parseInt(localStorage.getItem(`rare_user_id`))

    

    useEffect(()=>{
        getReactions()
        // .then(()=> getPostReactions(postId))
    }, [])

    const [reaction, setReaction]= useState({
        userId: parseInt(userId),
        postId: parseInt(postId),
        reactionId: 0
    })

    const handleReactionClick = (event) => {
        event.preventDefault()
        // const newReaction = {...reaction}
        console.log(event)
        const reactionId = parseInt(event.target.value)
        console.log(reactionId)
        addPostReaction({reactionId: reactionId}, parseInt(postId))     
      }
    

    
    return(
        <>
            <h2>Reactions</h2>
            {console.log(reactions)}
            <div>{reactions.map(react => <button onClick={handleReactionClick} id="reactionId" value={react.id} key={react.id}><img key={react.id} value={react.id} src={react?.image_url} width="10%"/></button>)}</div>
        </>
    )
}

