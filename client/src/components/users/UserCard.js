import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { SubscriptionContext } from '../subscriptions/SubscriptionProvider'
import './UserCard.css'

export const UserCard = ({ user, subscription, isSelf }) => {
    const history = useHistory()
    const { addSubscription, deleteSubscription } = useContext(SubscriptionContext)
    const [cardSubscription, setCardSubscription] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const userId = parseInt(localStorage.getItem(`rare_user_id`))

    const handleSubscribe = e => {
        setIsLoading(true)
        const authorId = parseInt(e.target.id.split("--")[1])
        const subscription = {
            followerId: userId,
            authorId: authorId
        }
        addSubscription(subscription)
            .then(setCardSubscription)
    }

    const handleUnsubscribe = e => {
        setIsLoading(true)
        deleteSubscription(cardSubscription.id)
            .then(() => {
                setCardSubscription({})
            })
    }

    useEffect(() => {
        if (subscription) setCardSubscription(subscription)
    }, [])

    useEffect(() => {
        setIsLoading(false)
    }, [cardSubscription])



    return (
        <article className="userCard">
            <h2 className="userNameLink" onClick={() => history.push(`/users/${user.id}`)}>{user.userName}</h2>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>Everyone is an admin!</p>
            {/* ternary - if the user card belongs to the current user, return "this is you", if not, show buttons */}
            {/* ternary - if not subscrubed, show subscribe button, else show unsub button */}
            {isSelf ?
                <p className="thisIsYou">it's you!</p>
                :
                Object.keys(cardSubscription).length ?
                    <button onClick={handleUnsubscribe} disabled={isLoading} className="unsubscribeButton" id={"unsubscribeButton--" + user.id}>Unsubscibe</button>
                    :
                    <button onClick={handleSubscribe} disabled={isLoading} className="subscribeButton" id={"subscribeButton--" + user.id}>Subscribe</button>
            }
        </article>
    )
}